const { db } = require('../config/database');
const logger = require('../config/logger');
const dataStore = require('../database/dataStore');

class MessageRepository {
  async findMessagesByChannel(channelId, limit = 50) {
    try {
      return await db('messages')
        .where({ channel_id: channelId })
        .orderBy('created_at', 'asc')
        .limit(limit);
    } catch (err) {
      const msgs = dataStore.filter('messages', m => String(m.channel_id) === String(channelId) || String(m.conversation_id) === String(channelId));
      return msgs.slice(-limit);
    }
  }

  async createMessage(messageData) {
    try {
      const [msg] = await db('messages').insert(messageData).returning('*');
      return msg;
    } catch (err) {
      return dataStore.insert('messages', {
        ...messageData,
        is_flagged: messageData.is_flagged || false,
        created_at: new Date().toISOString()
      });
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
      dataStore.insert('message_flags', {
        message_id: messageId,
        reason,
        severity: 'medium',
        status: 'pending'
      });
      return dataStore.update('messages', messageId, {
        is_flagged: true,
        flag_reason: reason,
        flagged_by: flaggedBy
      });
    }
  }
}

module.exports = new MessageRepository();
