const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');
const path = require('path');
const { generalLimiter } = require('./src/middleware/rateLimiter');
const errorHandler = require('./src/middleware/errorHandler');
const logger = require('./src/config/logger');

const app = express();

// ============================================
// SECURITY MIDDLEWARE
// ============================================

// Helmet - Set security HTTP headers
app.use(helmet());

// CORS - Cross-Origin Resource Sharing
const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  if (/^http:\/\/localhost:\d+$/.test(origin)) return true;
  if (/^http:\/\/127\.0\.0\.1:\d+$/.test(origin)) return true;
  return false;
};

app.use(cors({
  origin: (origin, callback) => {
    if (isAllowedOrigin(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Dev-friendly fallback
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

// HPP - Prevent HTTP Parameter Pollution
app.use(hpp());

// Rate limiting
app.use('/api/', generalLimiter);

// ============================================
// BODY PARSING MIDDLEWARE
// ============================================

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ============================================
// STATIC FILES
// ============================================

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ============================================
// REQUEST LOGGING
// ============================================

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
  next();
});

// ============================================
// API ROUTES
// ============================================

const routes = require('./src/routes');
app.use('/api/v1', routes);

// ============================================
// API DOCUMENTATION (Swagger)
// ============================================

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TeenPreneur Hub API',
      version: '1.0.0',
      description: 'API documentation for TeenPreneur Hub - A Secure Incubator Platform',
      contact: {
        name: 'MUHAMMED ALTHAF O K',
        email: 'althff10@gmail.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ============================================
// HEALTH CHECK
// ============================================

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'TeenPreneur Hub API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// ============================================
// 404 HANDLER
// ============================================

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.originalUrl} not found`
    }
  });
});

// ============================================
// GLOBAL ERROR HANDLER
// ============================================

app.use(errorHandler);

module.exports = app;
