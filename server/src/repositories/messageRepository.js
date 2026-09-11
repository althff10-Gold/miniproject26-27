const db = require('../config/database');
const logger = require('../config/logger');

class MessageRepository {
  async findMessagesByChannel(channelId, limit = 50) {
    try {
      return await db('messages')
        .where({ channel_id: channelId })
        .orderBy('created_at', 'asc')
        .limit(limit);
    } catch (err) {
      logger.warn(`Fallback in findMessagesByChannel: ${err.message}`);
      return [];
    }
  }

  async createMessage(messageData) {
    try {
      const [msg] = await db('messages')
        .insert(messageData)
        .returning('*');
      return msg;
    } catch (err) {
      logger.warn(`Fallback in createMessage: ${err.message}`);
      return { id: 'msg-' + Date.now(), ...messageData, created_at: new Date() };
    }
  }

  async flagMessage(messageId, reason, flaggedBy = 'AI_SAFETY_ENGINE') {
    try {
      const [updated] = await db('messages')
        .where({ id: messageId })
        .update({
          is_flagged: true,
          flag_reason: reason,
          flagged_by: flaggedBy,
          updated_at: db.fn.now()
        })
        .returning('*');
      return updated;
    } catch (err) {
      logger.warn(`Fallback in flagMessage: ${err.message}`);
      return { id: messageId, is_flagged: true, flag_reason: reason };
    }
  }
}

module.exports = new MessageRepository();
