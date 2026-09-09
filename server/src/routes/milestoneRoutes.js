const express = require('express');
const router = express.Router();
const milestoneController = require('../controllers/milestoneController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

// Fetch milestones for a startup
router.get('/startup/:startupId', milestoneController.getStartupMilestones);

// Submit evidence (student founder)
router.post('/:id/submit-evidence', authenticate, milestoneController.submitEvidence);

// Verify milestone (mentor or admin)
router.put('/:id/verify', authenticate, authorize('mentor', 'admin'), milestoneController.verifyMilestone);

module.exports = router;
