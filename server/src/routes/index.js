const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./authRoutes');
// const studentRoutes = require('./studentRoutes');
const guardianRoutes = require('./guardianRoutes');
const mentorRoutes = require('./mentorRoutes');
// const adminRoutes = require('./adminRoutes');
const learningRoutes = require('./learningRoutes');
const startupRoutes = require('./startupRoutes');
const milestoneRoutes = require('./milestoneRoutes');
// const messageRoutes = require('./messageRoutes');
// const eventRoutes = require('./eventRoutes');
// const notificationRoutes = require('./notificationRoutes');

// Mount routes
router.use('/auth', authRoutes);
// router.use('/students', studentRoutes);
router.use('/guardians', guardianRoutes);
router.use('/mentors', mentorRoutes);
// router.use('/admin', adminRoutes);
router.use('/learning', learningRoutes);
router.use('/startups', startupRoutes);
router.use('/milestones', milestoneRoutes);
// router.use('/messages', messageRoutes);
// router.use('/events', eventRoutes);
// router.use('/notifications', notificationRoutes);

// Temporary route for Sprint 0 verification
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'TeenPreneur Hub API v1',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      docs: '/api-docs',
      auth: '/api/v1/auth (Sprint 1)',
      students: '/api/v1/students (Sprint 3)',
      guardians: '/api/v1/guardians (Sprint 2)',
      mentors: '/api/v1/mentors (Sprint 4)',
      admin: '/api/v1/admin (Sprint 9)',
      learning: '/api/v1/learning (Sprint 5)',
      startups: '/api/v1/startups (Sprint 3)',
      messages: '/api/v1/messages (Sprint 7)',
      events: '/api/v1/events (Sprint 8)',
      notifications: '/api/v1/notifications (Sprint 9)'
    }
  });
});

module.exports = router;
