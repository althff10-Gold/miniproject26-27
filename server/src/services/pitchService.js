const pitchRepository = require('../repositories/pitchRepository');
const logger = require('../config/logger');

class PitchService {
  async getUpcomingEvents() {
    const events = await pitchRepository.findAllEvents();
    if (events && events.length > 0) return events;

    return [
      {
        id: 'event-q3-2026',
        title: 'TeenPreneur Q3 Virtual Pitch Demo Day',
        description: 'Live virtual pitch showcase where top 10 teen startup founders pitch to angel mentors and youth seed funds.',
        event_date: '2026-09-28T14:00:00+05:30',
        prize_pool: '$10,000 in Non-Dilutive Educational Grants',
        status: 'OPEN_FOR_SUBMISSIONS',
        tracks: ['CleanTech / Sustainability', 'EdTech & Future of Learning', 'Health & Wellness']
      },
      {
        id: 'event-fall-2026',
        title: 'Middle School STEM Innovation Fair',
        description: 'Junior incubator showcase for founders aged 13-15 presenting hardware and social impact experiments.',
        event_date: '2026-10-15T15:30:00+05:30',
        prize_pool: 'Maker Lab Hardware Kits & Mentorship',
        status: 'UPCOMING',
        tracks: ['Robotics & IoT', 'Community Impact']
      }
    ];
  }

  async getLeaderboard(eventId) {
    const submissions = await pitchRepository.findSubmissionsByEvent(eventId);
    if (submissions && submissions.length > 0) return submissions;

    return [
      {
        id: 'sub-001',
        startup_name: 'EcoTrack AI',
        founder_name: 'Aarav Patel (Age 16)',
        pitch_title: 'Automated Cafeteria Waste Segregation with Edge Vision',
        deck_url: 'https://cdn.teenpreneur.org/decks/ecotrack-q3.pdf',
        video_url: 'https://cdn.teenpreneur.org/pitches/ecotrack-pitch.mp4',
        total_score: 92.5,
        status: 'EVALUATED',
        rank: 1
      },
      {
        id: 'sub-002',
        startup_name: 'PeerStudy Hub',
        founder_name: 'Diya Sharma (Age 15)',
        pitch_title: 'Gamified Collaborative Study Networks for High Schoolers',
        deck_url: 'https://cdn.teenpreneur.org/decks/peerstudy-q3.pdf',
        video_url: 'https://cdn.teenpreneur.org/pitches/peerstudy-pitch.mp4',
        total_score: 88.0,
        status: 'EVALUATED',
        rank: 2
      }
    ];
  }

  async scoreSubmission(submissionId, scoreData) {
    return await pitchRepository.submitScorecard(submissionId, scoreData);
  }
}

module.exports = new PitchService();
