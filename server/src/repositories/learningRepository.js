const db = require('../config/database');
const logger = require('../config/logger');

class LearningRepository {
  async findAllTracks() {
    try {
      return await db('courses')
        .select('*')
        .orderBy('created_at', 'asc');
    } catch (err) {
      logger.warn(`Fallback in findAllTracks: ${err.message}`);
      return null;
    }
  }

  async findTrackById(trackId) {
    try {
      return await db('courses')
        .where({ id: trackId })
        .first();
    } catch (err) {
      logger.warn(`Fallback in findTrackById: ${err.message}`);
      return null;
    }
  }

  async findLessonsByTrackId(trackId) {
    try {
      return await db('lessons')
        .where({ course_id: trackId })
        .orderBy('order_index', 'asc');
    } catch (err) {
      logger.warn(`Fallback in findLessonsByTrackId: ${err.message}`);
      return [];
    }
  }

  async getStudentProgress(studentId) {
    try {
      return await db('student_progress')
        .where({ student_id: studentId });
    } catch (err) {
      logger.warn(`Fallback in getStudentProgress: ${err.message}`);
      return [];
    }
  }

  async updateStudentLessonProgress(studentId, lessonId, completed = true, score = null) {
    try {
      const existing = await db('student_progress')
        .where({ student_id: studentId, lesson_id: lessonId })
        .first();

      if (existing) {
        return await db('student_progress')
          .where({ id: existing.id })
          .update({
            is_completed: completed,
            quiz_score: score,
            completed_at: completed ? db.fn.now() : null,
            updated_at: db.fn.now()
          })
          .returning('*');
      } else {
        return await db('student_progress')
          .insert({
            student_id: studentId,
            lesson_id: lessonId,
            is_completed: completed,
            quiz_score: score,
            completed_at: completed ? db.fn.now() : null
          })
          .returning('*');
      }
    } catch (err) {
      logger.warn(`Fallback in updateStudentLessonProgress: ${err.message}`);
      return { student_id: studentId, lesson_id: lessonId, is_completed: completed, score };
    }
  }
}

module.exports = new LearningRepository();
