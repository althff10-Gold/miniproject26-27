const { db } = require('../config/database');
const logger = require('../config/logger');
const dataStore = require('../database/dataStore');

class LearningRepository {
  async findAllTracks() {
    try {
      const courses = await db('courses').select('*').orderBy('created_at', 'asc');
      if (courses && courses.length > 0) return courses;
      return null;
    } catch (err) {
      return null; // Signals learningService to use curriculum data
    }
  }

  async findTrackById(trackId) {
    try {
      return await db('courses').where({ id: trackId }).first();
    } catch (err) {
      return dataStore.find('courses', c => String(c.id) === String(trackId));
    }
  }

  async findLessonsByTrackId(trackId) {
    try {
      return await db('lessons').where({ course_id: trackId }).orderBy('order_index', 'asc');
    } catch (err) {
      return dataStore.filter('lessons', l => String(l.course_id) === String(trackId));
    }
  }

  async getStudentProgress(studentId) {
    try {
      return await db('learning_progress').where({ student_id: studentId });
    } catch (err) {
      return dataStore.filter('learning_progress', lp => String(lp.student_id) === String(studentId));
    }
  }

  async updateStudentLessonProgress(studentId, lessonId, completed = true, score = null) {
    try {
      const existing = await db('learning_progress')
        .where({ student_id: studentId, lesson_id: lessonId })
        .first();

      if (existing) {
        return await db('learning_progress')
          .where({ id: existing.id })
          .update({
            completed,
            progress_percentage: completed ? 100 : 50,
            completed_at: completed ? db.fn.now() : null,
            updated_at: db.fn.now()
          })
          .returning('*');
      } else {
        return await db('learning_progress')
          .insert({
            student_id: studentId,
            lesson_id: lessonId,
            completed,
            progress_percentage: completed ? 100 : 50,
            completed_at: completed ? db.fn.now() : null
          })
          .returning('*');
      }
    } catch (err) {
      const existing = dataStore.find('learning_progress', lp => String(lp.student_id) === String(studentId) && String(lp.lesson_id) === String(lessonId));
      if (existing) {
        return dataStore.update('learning_progress', existing.id, {
          completed,
          progress_percentage: completed ? 100 : 50,
          completed_at: completed ? new Date().toISOString() : null
        });
      }
      return dataStore.insert('learning_progress', {
        student_id: studentId,
        lesson_id: lessonId,
        completed,
        progress_percentage: completed ? 100 : 50,
        completed_at: completed ? new Date().toISOString() : null
      });
    }
  }
}

module.exports = new LearningRepository();
