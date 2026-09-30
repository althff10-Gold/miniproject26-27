require('dotenv').config({ path: '../.env' });
const app = require('./app');
const { initializeDatabase } = require('./src/config/database');
const logger = require('./src/config/logger');
const http = require('http');
const { Server } = require('socket.io');

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: (origin, callback) => callback(null, true),
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Make io accessible to routes
app.set('io', io);

// Socket.io connection handling
io.on('connection', (socket) => {
  logger.info(`Socket connected: ${socket.id}`);

  socket.on('join', (userId) => {
    socket.join(`user_${userId}`);
    logger.info(`User ${userId} joined their notification room`);
  });

  socket.on('disconnect', () => {
    logger.info(`Socket disconnected: ${socket.id}`);
  });
});

// Start server
async function startServer() {
  try {
    const dbConnected = await initializeDatabase();
    if (dbConnected) {
      logger.info('Database connected successfully');
    } else {
      logger.warn('Database offline: server operating in resilient mode');
    }

    server.listen(PORT, () => {
      logger.info(`TeenPreneur Hub API Server running on port ${PORT}`);
      logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
      logger.info(`API Docs: http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

module.exports = server;
