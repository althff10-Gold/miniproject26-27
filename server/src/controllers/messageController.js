const messageService = require('../services/messageService');
const logger = require('../config/logger');

class MessageController {
  async getMessages(req, res, next) {
    try {
      const { channelId } = req.params;
      const messages = await messageService.getChannelMessages(channelId);
      res.json({
        success: true,
        data: messages
      });
    } catch (err) {
      next(err);
    }
  }

  async sendMessage(req, res, next) {
    try {
      const { channelId } = req.params;
      const { content } = req.body;
      const user = req.user || { id: 'demo-user', role: 'student', first_name: 'Student', last_name: 'Founder' };

      const message = await messageService.sendMessage({
        channelId,
        senderId: user.id,
        senderName: `${user.first_name || user.firstName || 'User'} ${user.last_name || user.lastName || ''}`.trim(),
        senderRole: user.role,
        content
      });

      res.status(201).json({
        success: true,
        data: message
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new MessageController();
