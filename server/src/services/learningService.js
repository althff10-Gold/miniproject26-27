const learningRepository = require('../repositories/learningRepository');
const logger = require('../config/logger');

class LearningService {
  getCurriculumData() {
    return [
      {
        id: 'track-ideation',
        title: 'Teen Ideation & Problem Discovery',
        description: 'Learn how to identify genuine pain points in your school or community and formulate viable solution hypotheses.',
        level: 'BEGINNER',
        duration_minutes: 120,
        badge: '💡 Idea Spark',
        lessons: [
          {
            id: 'les-1',
            title: '1. Finding Problems Worth Solving',
            duration: '15 mins',
            type: 'VIDEO_ARTICLE',
            summary: 'The difference between mild inconveniences and urgent problems worth paying for.',
            quiz: [
              {
                question: 'Which problem represents a strong business opportunity for student founders?',
                options: [
                  'A minor annoyance people rarely think about',
                  'A recurring pain point users actively spend time or money trying to work around',
                  'A problem only you have experienced once'
                ],
                correctAnswer: 1
              }
            ]
          },
          {
            id: 'les-2',
            title: '2. Customer Discovery for Teens',
            duration: '20 mins',
            type: 'INTERACTIVE_CANVAS',
            summary: 'How to safely interview 10 potential users without leading questions or safety violations.',
            quiz: [
              {
                question: 'When doing customer discovery under COPPA, what is critical?',
                options: [
                  'Collecting names, phone numbers and personal home addresses',
                  'Keeping surveys anonymous and never soliciting sensitive personal data',
                  'Selling your prototype immediately'
                ],
                correctAnswer: 1
              }
            ]
          }
        ]
      },
      {
        id: 'track-business-model',
        title: 'Lean Business Canvas & Unit Economics',
        description: 'Understand revenue streams, cost structures, and how to price your first offering.',
        level: 'INTERMEDIATE',
        duration_minutes: 180,
        badge: '📊 Business Architect',
        lessons: [
          {
            id: 'les-3',
            title: '3. Pricing Your First Product or Service',
            duration: '25 mins',
            type: 'VIDEO_ARTICLE',
            summary: 'Cost-plus vs value-based pricing: how to calculate your gross margin.',
            quiz: [
              {
                question: 'If a school tech toolkit costs $15 to assemble and you sell it for $30, what is the gross margin?',
                options: ['30%', '50%', '100%'],
                correctAnswer: 1
              }
            ]
          }
        ]
      },
      {
        id: 'track-pitching',
        title: 'Pitch Deck Creation & Live Storytelling',
        description: 'Design a 10-slide venture deck and master pitching to seed mentors and angel investors.',
        level: 'ADVANCED',
        duration_minutes: 150,
        badge: '🎤 Pitch Champion',
        lessons: [
          {
            id: 'les-4',
            title: '4. The 3-Minute Hook & Story Arc',
            duration: '30 mins',
            type: 'CASE_STUDY',
            summary: 'Structuring the problem, secret sauce, traction, and the ask.',
            quiz: [
              {
                question: 'What is the primary goal of the first 30 seconds of a startup pitch?',
                options: [
                  'List all features of your software',
                  'Hook the judges with a relatable, vivid problem statement',
                  'Discuss your 5-year financial projections'
                ],
                correctAnswer: 1
              }
            ]
          }
        ]
      }
    ];
  }

  async getAllTracks() {
    const dbTracks = await learningRepository.findAllTracks();
    if (dbTracks && dbTracks.length > 0) return dbTracks;
    return this.getCurriculumData();
  }

  async submitQuiz(studentId, lessonId, selectedAnswer) {
    const curriculum = this.getCurriculumData();
    let targetLesson = null;
    for (const track of curriculum) {
      const found = track.lessons.find(l => l.id === lessonId);
      if (found) {
        targetLesson = found;
        break;
      }
    }

    if (!targetLesson || !targetLesson.quiz || targetLesson.quiz.length === 0) {
      return { passed: true, score: 100, message: 'Lesson completed!' };
    }

    const quizItem = targetLesson.quiz[0];
    const isCorrect = quizItem.correctAnswer === selectedAnswer;
    const score = isCorrect ? 100 : 0;

    await learningRepository.updateStudentLessonProgress(studentId, lessonId, isCorrect, score);

    return {
      passed: isCorrect,
      score,
      message: isCorrect ? 'Great job! You answered correctly and earned XP.' : 'Incorrect. Review the lesson and try again.'
    };
  }
}

module.exports = new LearningService();
