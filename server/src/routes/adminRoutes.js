const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

// All admin routes require authentication and admin role
router.use(authenticate);
router.use(authorize('admin'));

router.get('/dashboard', adminController.getDashboard);
router.get('/users', adminController.getUsers);
router.put('/users/:id/status', adminController.updateUserStatus);
router.post('/mentors/:id/approve', adminController.approveMentor);
router.get('/moderation/flags', adminController.getModerationFlags);
router.post('/moderation/action', adminController.takeModerationAction);

module.exports = router;
