const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const DB_FILE = path.join(__dirname, '..', '..', 'database', 'local-db.json');

// Default initial state representing all 27 tables in the TeenPreneur Hub schema
function getInitialSeedData() {
  const salt = bcrypt.genSaltSync(10);
  const defaultPasswordHash = bcrypt.hashSync('Demo1234!', salt);

  return {
    users: [
      {
        id: 'usr-student-001',
        email: 'aarav.student@teenpreneur.edu',
        password_hash: defaultPasswordHash,
        role: 'student',
        status: 'active',
        first_name: 'Aarav',
        last_name: 'Patel',
        phone: '+91 98765 43210',
        avatar_url: null,
        created_at: new Date('2026-08-18T10:00:00Z').toISOString()
      },
      {
        id: 'usr-student-002',
        email: 'diya.student@teenpreneur.edu',
        password_hash: defaultPasswordHash,
        role: 'student',
        status: 'pending',
        first_name: 'Diya',
        last_name: 'Sharma',
        phone: '+91 98765 43211',
        avatar_url: null,
        created_at: new Date('2026-08-19T11:00:00Z').toISOString()
      },
      {
        id: 'usr-guardian-001',
        email: 'sunita.guardian@teenpreneur.edu',
        password_hash: defaultPasswordHash,
        role: 'guardian',
        status: 'active',
        first_name: 'Sunita',
        last_name: 'Sharma',
        phone: '+91 98765 43212',
        avatar_url: null,
        created_at: new Date('2026-08-18T12:00:00Z').toISOString()
      },
      {
        id: 'usr-mentor-001',
        email: 'sarah.mentor@teenpreneur.edu',
        password_hash: defaultPasswordHash,
        role: 'mentor',
        status: 'active',
        first_name: 'Dr. Sarah',
        last_name: 'Chen',
        phone: '+91 98765 43213',
        avatar_url: null,
        created_at: new Date('2026-08-18T14:00:00Z').toISOString()
      },
      {
        id: 'usr-mentor-002',
        email: 'rajesh.mentor@teenpreneur.edu',
        password_hash: defaultPasswordHash,
        role: 'mentor',
        status: 'pending',
        first_name: 'Dr. Rajesh',
        last_name: 'Verma',
        phone: '+91 98765 43214',
        avatar_url: null,
        created_at: new Date('2026-08-20T09:30:00Z').toISOString()
      },
      {
        id: 'usr-admin-001',
        email: 'admin@teenpreneur.edu',
        password_hash: defaultPasswordHash,
        role: 'admin',
        status: 'active',
        first_name: 'System',
        last_name: 'Administrator',
        phone: '+91 98765 43215',
        avatar_url: null,
        created_at: new Date('2026-08-14T08:00:00Z').toISOString()
      }
    ],

    students: [
      {
        id: 1,
        user_id: 'usr-student-001',
        date_of_birth: '2008-04-12',
        school_name: 'Greenwood High International',
        grade_level: '10th Grade',
        interests: 'CleanTech, IoT, AI, Robotics',
        bio: 'Aspiring teen environmental engineer building IoT energy solutions for public schools.',
        guardian_approved: true,
        created_at: new Date('2026-08-18T10:05:00Z').toISOString()
      },
      {
        id: 2,
        user_id: 'usr-student-002',
        date_of_birth: '2010-09-25',
        school_name: 'Delhi Public School',
        grade_level: '8th Grade',
        interests: 'EdTech, Gamified Learning, Social Impact',
        bio: 'Passionate about connecting students across regional schools for peer mentorship.',
        guardian_approved: false,
        created_at: new Date('2026-08-19T11:05:00Z').toISOString()
      }
    ],

    guardians: [
      {
        id: 1,
        user_id: 'usr-guardian-001',
        relationship: 'Parent',
        occupation: 'Software Engineer & STEM Advocate',
        address: 'Bangalore, Karnataka, India',
        created_at: new Date('2026-08-18T12:05:00Z').toISOString()
      }
    ],

    guardian_student_links: [
      {
        id: 1,
        guardian_id: 1,
        student_id: 1,
        status: 'approved',
        guardian_code: 'PAR-8821',
        approval_token: 'coppa_approved_aarav_token',
        approved_at: new Date('2026-08-18T12:30:00Z').toISOString(),
        rejection_reason: null,
        created_at: new Date('2026-08-18T12:05:00Z').toISOString()
      },
      {
        id: 2,
        guardian_id: 1,
        student_id: 2,
        status: 'pending',
        guardian_code: 'PAR-9932',
        approval_token: 'coppa_demo_token_123456',
        approved_at: null,
        rejection_reason: null,
        created_at: new Date('2026-08-19T11:05:00Z').toISOString()
      }
    ],

    mentors: [
      {
        id: 1,
        user_id: 'usr-mentor-001',
        expertise: 'CleanTech, IoT, Hardware Prototyping, Startup Strategy',
        organization: 'NextGen Innovators Fund',
        bio: '12+ years in climate tech entrepreneurship and seed venture advisory.',
        years_of_experience: 12,
        linkedin_url: 'https://linkedin.com/in/drsarahchen',
        verification_status: 'APPROVED',
        rating: 4.95,
        total_reviews: 32,
        created_at: new Date('2026-08-18T14:05:00Z').toISOString()
      },
      {
        id: 2,
        user_id: 'usr-mentor-002',
        expertise: 'Deep Learning, Robotics, Computer Vision',
        organization: 'Neuromorph Labs',
        bio: 'AI Research Director guiding teen innovators in applied deep learning.',
        years_of_experience: 14,
        linkedin_url: 'https://linkedin.com/in/drrajeshverma',
        verification_status: 'PENDING',
        rating: 4.8,
        total_reviews: 14,
        created_at: new Date('2026-08-20T09:35:00Z').toISOString()
      }
    ],

    mentor_verifications: [
      {
        id: 1,
        mentor_id: 1,
        document_type: 'degree',
        document_url: 'https://storage.teenpreneur.edu/docs/sarah_chen_phd.pdf',
        qualification: 'Ph.D. in Electrical & Environmental Engineering',
        institution: 'Stanford University',
        status: 'approved',
        reviewed_by: 'usr-admin-001',
        review_notes: 'Academic and identity credentials verified.',
        reviewed_at: new Date('2026-08-19T09:00:00Z').toISOString(),
        created_at: new Date('2026-08-18T14:10:00Z').toISOString()
      },
      {
        id: 2,
        mentor_id: 2,
        document_type: 'certification',
        document_url: 'https://storage.teenpreneur.edu/docs/rajesh_verma_creds.pdf',
        qualification: 'Director of Applied AI & Robotics',
        institution: 'Indian Institute of Science (IISc)',
        status: 'pending',
        reviewed_by: null,
        review_notes: null,
        reviewed_at: null,
        created_at: new Date('2026-08-20T09:40:00Z').toISOString()
      }
    ],

    mentor_assignments: [
      {
        id: 1,
        mentor_id: 1,
        student_id: 1,
        assigned_by: 'usr-admin-001',
        status: 'active',
        notes: 'Paired for CleanTech IoT incubation and MVP testing.',
        created_at: new Date('2026-08-20T10:00:00Z').toISOString()
      }
    ],

    startups: [
      {
        id: 1,
        student_id: 1,
        user_id: 'usr-student-001',
        mentor_id: 1,
        name: 'EcoTrack Smart Campus',
        tagline: 'Automated energy auditing and recycling rewards for schools.',
        description: 'An integrated IoT sensor kit and student mobile app that helps middle and high schools reduce electricity waste by 30% while rewarding student eco-actions.',
        industry: 'CleanTech & IoT',
        stage: 'prototype',
        status: 'active',
        readiness_score: 84,
        problem_statement: 'Empty classrooms keep lights and AC units on during sports periods, wasting thousands of kilowatt-hours.',
        solution: 'Smart PIR motion and ambient light sensors connected via LoRaWAN with real-time classroom power kill switches.',
        target_audience: 'K-12 schools, school districts, and university campus facilities.',
        created_at: new Date('2026-08-20T11:00:00Z').toISOString()
      },
      {
        id: 2,
        student_id: 2,
        user_id: 'usr-student-002',
        mentor_id: null,
        name: 'PeerStudy Hub',
        tagline: 'Collaborative gamified peer tutoring and problem sharing network.',
        description: 'Micro-learning network allowing high school students to earn study credits by explaining math and coding concepts to peers in moderated virtual study rooms.',
        industry: 'EdTech & Social Impact',
        stage: 'validation',
        status: 'active',
        readiness_score: 72,
        problem_statement: 'Quality 1-on-1 tutoring is unaffordable for 80% of families, while students learn best from near-peer explanations.',
        solution: 'Gamified peer review and study challenge platform with teacher-verified badges and safe chat.',
        target_audience: 'High school students preparing for STEM entrance examinations.',
        created_at: new Date('2026-08-22T14:00:00Z').toISOString()
      }
    ],

    business_ideas: [
      {
        id: 1,
        startup_id: 1,
        title: 'Smart Classroom Light Sensor',
        description: 'Energy harvesting wireless sensor node reporting classroom occupancy status.',
        value_proposition: 'Cuts school facility electrical utility costs by up to 32% with zero wiring disruption.',
        target_market: 'Public and private school administrative boards.',
        revenue_model: 'Hardware kit sale + Annual energy intelligence SaaS subscription ($199/yr/school).',
        validation_status: 'validated',
        feedback: 'Excellent problem articulation and initial hardware trial results.',
        created_at: new Date('2026-08-21T09:00:00Z').toISOString()
      },
      {
        id: 2,
        startup_id: 1,
        title: 'Cafeteria Composting Gamification',
        description: 'Scale-weighed organic waste drop-off bin giving student meal plan discounts for food waste reduction.',
        value_proposition: 'Diverts 4 tons of organic food scraps from school dumpsters annually.',
        target_market: 'School cafeteria concessionaires.',
        revenue_model: 'Smart bin leasing.',
        validation_status: 'testing',
        feedback: 'Test student incentives with smaller pilot before ordering bin fabrication.',
        created_at: new Date('2026-08-22T10:00:00Z').toISOString()
      }
    ],

    milestones: [
      {
        id: 1,
        startup_id: 1,
        title: 'Interview 20 School Teachers & Principals',
        description: 'Conduct structured customer discovery interviews regarding cafeteria and classroom power waste.',
        due_date: '2026-08-25',
        order_index: 1,
        status: 'completed',
        evidence_text: 'Completed 22 interviews across 4 partner campuses. 18 confirmed lighting waste is a top operational expenditure issue.',
        evidence_url: 'https://docs.google.com/spreadsheets/d/mock-interview-data',
        mentor_feedback: 'Clear problem-validation data. Approved to move onto prototyping.',
        created_at: new Date('2026-08-21T10:00:00Z').toISOString()
      },
      {
        id: 2,
        startup_id: 1,
        title: 'Build Arduino Microcontroller Prototype',
        description: 'Assemble breadboard IoT sensor node with ambient photoresistor and relay switch.',
        due_date: '2026-09-08',
        order_index: 2,
        status: 'completed',
        evidence_text: 'Firmware flashed on ESP32; sends occupancy alerts via MQTT broker with 98% uptime.',
        evidence_url: 'https://github.com/aarav-patel/ecotrack-firmware-v1',
        mentor_feedback: 'Solid hardware architecture. Please test under artificial vs daylight conditions.',
        created_at: new Date('2026-08-21T10:05:00Z').toISOString()
      },
      {
        id: 3,
        startup_id: 1,
        title: 'Submit Entry to Q3 Virtual Pitch Demo Day',
        description: 'Record 3-minute executive video pitch and upload slide deck for verified mentor judging.',
        due_date: '2026-09-26',
        order_index: 3,
        status: 'in_progress',
        evidence_text: 'Drafted 10-slide deck covering problem, TAM/SAM, prototype metrics, and unit economics.',
        evidence_url: 'https://slides.com/aarav-ecotrack-q3',
        mentor_feedback: null,
        created_at: new Date('2026-08-21T10:10:00Z').toISOString()
      },
      {
        id: 4,
        startup_id: 2,
        title: 'Conduct Student Survey on Math Peer Tutoring',
        description: 'Survey 50 target students on pain points with homework help.',
        due_date: '2026-09-15',
        order_index: 1,
        status: 'in_progress',
        evidence_text: 'Collected 38 responses so far. 82% want anonymous quick math doubts solved.',
        evidence_url: 'https://forms.google.com/mock-peer-survey',
        mentor_feedback: null,
        created_at: new Date('2026-08-23T10:00:00Z').toISOString()
      }
    ],

    milestone_progress: [
      {
        id: 1,
        milestone_id: 1,
        description: 'Interviewed first 10 teachers at Greenwood High.',
        percentage: 50,
        updated_by: 'usr-student-001',
        created_at: new Date('2026-08-23T15:00:00Z').toISOString()
      },
      {
        id: 2,
        milestone_id: 1,
        description: 'Completed remaining 12 interviews and compiled spreadsheet summary.',
        percentage: 100,
        updated_by: 'usr-student-001',
        created_at: new Date('2026-08-25T17:00:00Z').toISOString()
      }
    ],

    courses: [
      {
        id: 1,
        title: 'Startup Ideation & Customer Validation',
        description: 'Learn how to identify genuine customer pain points, conduct non-leading user interviews, and validate business hypotheses before writing code.',
        category: 'Foundations',
        difficulty: 'beginner',
        duration_minutes: 90,
        thumbnail_url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop&q=80',
        status: 'published',
        created_by: 'usr-admin-001',
        order_index: 1,
        created_at: new Date('2026-08-15T10:00:00Z').toISOString()
      },
      {
        id: 2,
        title: 'Rapid Prototyping & MVP Architecture',
        description: 'Build your first Minimum Viable Product using no-code tools, microcontrollers, and modern web frameworks without spending large capital.',
        category: 'Product Engineering',
        difficulty: 'intermediate',
        duration_minutes: 120,
        thumbnail_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&auto=format&fit=crop&q=80',
        status: 'published',
        created_by: 'usr-admin-001',
        order_index: 2,
        created_at: new Date('2026-08-15T11:00:00Z').toISOString()
      },
      {
        id: 3,
        title: 'Startup Economics & Investor Pitching',
        description: 'Master unit economics, cost of goods sold, profit margins, and the art of delivering a captivating 3-minute pitch deck.',
        category: 'Finance & Storytelling',
        difficulty: 'intermediate',
        duration_minutes: 105,
        thumbnail_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
        status: 'published',
        created_by: 'usr-admin-001',
        order_index: 3,
        created_at: new Date('2026-08-15T12:00:00Z').toISOString()
      }
    ],

    lessons: [
      {
        id: 1,
        course_id: 1,
        title: 'The Mom Test: Finding Customer Truth',
        content: 'Why you should never ask your mom if your startup idea is good. How to ask about customer behavior in the past rather than hypothetical promises in the future.',
        video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration_minutes: 20,
        order_index: 1,
        created_at: new Date('2026-08-15T10:15:00Z').toISOString()
      },
      {
        id: 2,
        course_id: 1,
        title: 'Formulating Lean Canvas Hypotheses',
        content: 'Step-by-step breakdown of the 9 Lean Canvas building blocks: Problem, Customer Segments, Unique Value Proposition, Solution, Channels, Revenue, Cost, Metrics, Unfair Advantage.',
        video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration_minutes: 30,
        order_index: 2,
        created_at: new Date('2026-08-15T10:45:00Z').toISOString()
      },
      {
        id: 3,
        course_id: 2,
        title: 'Scrappy MVP Construction',
        content: 'Distinguishing between a prototype, a proof of concept, and a Minimum Viable Product. How teen founders can test market demand with landing pages.',
        video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration_minutes: 35,
        order_index: 1,
        created_at: new Date('2026-08-15T11:15:00Z').toISOString()
      }
    ],

    quizzes: [
      {
        id: 1,
        course_id: 1,
        title: 'Customer Discovery & Mom Test Quiz',
        description: 'Test your understanding of effective user interview techniques and avoiding confirmation bias.',
        passing_score: 70,
        time_limit_minutes: 15,
        max_attempts: 3,
        created_at: new Date('2026-08-15T10:50:00Z').toISOString()
      }
    ],

    quiz_questions: [
      {
        id: 1,
        quiz_id: 1,
        question_text: 'Which of the following is the BEST question to ask during customer discovery?',
        options: [
          'Would you buy our app if it cost $5/month?',
          'Do you think our design looks nice?',
          'Tell me about the last time you encountered this problem and what you did to fix it.',
          'Will you promise to use our service once we launch?'
        ],
        correct_answer: 2,
        points: 1,
        explanation: 'Asking about specific past actions reveals genuine behavior rather than polite hypothetical opinions.',
        order_index: 1,
        created_at: new Date('2026-08-15T10:55:00Z').toISOString()
      },
      {
        id: 2,
        quiz_id: 1,
        question_text: 'What is the primary goal of a Minimum Viable Product (MVP)?',
        options: [
          'To generate immediate million-dollar venture capital funding.',
          'To maximize learning about customers with the least amount of engineering effort.',
          'To build a feature-complete product identical to enterprise competitors.',
          'To win school science fairs.'
        ],
        correct_answer: 1,
        points: 1,
        explanation: 'An MVP is an experiment designed to validate core business hypotheses with minimum effort and capital.',
        order_index: 2,
        created_at: new Date('2026-08-15T10:56:00Z').toISOString()
      }
    ],

    quiz_attempts: [
      {
        id: 1,
        student_id: 1,
        quiz_id: 1,
        score: 2,
        total_points: 2,
        answers: { '1': 2, '2': 1 },
        passed: true,
        time_taken_seconds: 140,
        created_at: new Date('2026-08-21T16:00:00Z').toISOString()
      }
    ],

    learning_progress: [
      {
        id: 1,
        student_id: 1,
        course_id: 1,
        lesson_id: 1,
        completed: true,
        progress_percentage: 100,
        completed_at: new Date('2026-08-20T17:00:00Z').toISOString(),
        created_at: new Date('2026-08-20T16:30:00Z').toISOString()
      },
      {
        id: 2,
        student_id: 1,
        course_id: 1,
        lesson_id: 2,
        completed: true,
        progress_percentage: 100,
        completed_at: new Date('2026-08-21T15:30:00Z').toISOString(),
        created_at: new Date('2026-08-21T15:00:00Z').toISOString()
      }
    ],

    conversations: [
      {
        id: 'mentor-student-1',
        title: 'EcoTrack Incubation - Dr. Sarah Chen & Aarav Patel',
        type: 'mentorship',
        created_by: 'usr-mentor-001',
        created_at: new Date('2026-08-20T10:30:00Z').toISOString()
      }
    ],

    conversation_participants: [
      {
        id: 1,
        conversation_id: 'mentor-student-1',
        user_id: 'usr-student-001',
        joined_at: new Date('2026-08-20T10:30:00Z').toISOString(),
        last_read_at: new Date().toISOString()
      },
      {
        id: 2,
        conversation_id: 'mentor-student-1',
        user_id: 'usr-mentor-001',
        joined_at: new Date('2026-08-20T10:30:00Z').toISOString(),
        last_read_at: new Date().toISOString()
      }
    ],

    messages: [
      {
        id: 'msg-1',
        channel_id: 'mentor-student-1',
        conversation_id: 'mentor-student-1',
        sender_id: 'usr-student-001',
        sender_name: 'Aarav Patel',
        sender_role: 'student',
        content: 'Hi Dr. Chen! We successfully tested our Arduino power relay on classroom A2 today!',
        is_flagged: false,
        is_moderated: false,
        is_deleted: false,
        created_at: new Date('2026-08-25T14:30:00Z').toISOString()
      },
      {
        id: 'msg-2',
        channel_id: 'mentor-student-1',
        conversation_id: 'mentor-student-1',
        sender_id: 'usr-mentor-001',
        sender_name: 'Dr. Sarah Chen',
        sender_role: 'mentor',
        content: 'Outstanding work Aarav! What was the latency between motion detection and switch cut-off?',
        is_flagged: false,
        is_moderated: false,
        is_deleted: false,
        created_at: new Date('2026-08-25T14:38:00Z').toISOString()
      },
      {
        id: 'msg-3',
        channel_id: 'mentor-student-1',
        conversation_id: 'mentor-student-1',
        sender_id: 'usr-student-001',
        sender_name: 'Aarav Patel',
        sender_role: 'student',
        content: 'Under 1.2 seconds over the school Wi-Fi network! We logged it in our milestone report.',
        is_flagged: false,
        is_moderated: false,
        is_deleted: false,
        created_at: new Date('2026-08-25T14:42:00Z').toISOString()
      }
    ],

    message_flags: [
      {
        id: 1,
        message_id: 'msg-flag-demo',
        reason: 'Telephone number detected in peer chat (PII safety violation)',
        flagged_words: ['+919876543219'],
        severity: 'medium',
        status: 'pending',
        reviewed_by: null,
        reviewed_at: null,
        created_at: new Date('2026-08-26T16:00:00Z').toISOString()
      }
    ],

    moderation_actions: [
      {
        id: 1,
        flag_id: 1,
        action_type: 'warn_user',
        taken_by: 'usr-admin-001',
        notes: 'Warning notice issued regarding sharing personal phone numbers in student spaces.',
        created_at: new Date('2026-08-26T16:30:00Z').toISOString()
      }
    ],

    pitch_events: [
      {
        id: 1,
        title: 'Q3 National Student Incubator Demo Day',
        description: 'Showcase your prototype to accredited venture mentors and angel judges. 3-minute pitch followed by 2 minutes Q&A.',
        event_date: '2026-09-28T10:00:00Z',
        submission_deadline: '2026-09-26T23:59:59Z',
        max_participants: 25,
        status: 'active',
        created_by: 'usr-admin-001',
        created_at: new Date('2026-08-16T10:00:00Z').toISOString()
      },
      {
        id: 2,
        title: 'Youth GreenTech & Climate Challenge 2026',
        description: 'Specialized pitch showcase for student innovations addressing clean energy, waste diversion, and urban sustainability.',
        event_date: '2026-10-15T14:00:00Z',
        submission_deadline: '2026-10-10T23:59:59Z',
        max_participants: 30,
        status: 'upcoming',
        created_by: 'usr-admin-001',
        created_at: new Date('2026-08-16T11:00:00Z').toISOString()
      }
    ],

    pitch_submissions: [
      {
        id: 1,
        event_id: 1,
        startup_id: 1,
        student_id: 1,
        pitch_title: 'EcoTrack Smart Campus: IoT Energy Efficiency for Schools',
        pitch_content: 'EcoTrack combines ultra-low-power environmental sensors with automated kill-switches to eradicate 30% of utility power waste across classrooms and auditoriums.',
        presentation_url: 'https://storage.teenpreneur.edu/decks/ecotrack_q3_pitch.pdf',
        video_url: 'https://www.youtube.com/watch?v=mock_pitch_ecotrack',
        status: 'reviewed',
        total_score: 9.1,
        created_at: new Date('2026-08-26T12:00:00Z').toISOString()
      },
      {
        id: 2,
        event_id: 1,
        startup_id: 2,
        student_id: 2,
        pitch_title: 'PeerStudy Hub: Gamified Math Tutoring',
        pitch_content: 'Democratizing peer-to-peer STEM doubts clearing for adolescent students in regional districts.',
        presentation_url: 'https://storage.teenpreneur.edu/decks/peerstudy_q3_deck.pdf',
        video_url: 'https://www.youtube.com/watch?v=mock_pitch_peerstudy',
        status: 'submitted',
        total_score: 8.2,
        created_at: new Date('2026-08-26T14:00:00Z').toISOString()
      }
    ],

    pitch_feedback: [
      {
        id: 1,
        submission_id: 1,
        mentor_id: 1,
        rating: 9,
        innovation_score: 9,
        feasibility_score: 9,
        presentation_score: 9,
        strengths: 'Compelling live prototype demo, clear customer validation from 22 teachers, defensible hardware cost structure.',
        improvements: 'Clarify supply-chain procurement lead times for LoRa gateways.',
        comments: 'One of the strongest teen environmental IoT ventures this quarter.',
        created_at: new Date('2026-08-27T16:00:00Z').toISOString()
      }
    ],

    notifications: [
      {
        id: 1,
        user_id: 'usr-student-001',
        type: 'mentor_assigned',
        title: 'Mentor Assigned!',
        message: 'Dr. Sarah Chen has been paired with EcoTrack Smart Campus.',
        link: '/mentors',
        is_read: true,
        created_at: new Date('2026-08-20T10:05:00Z').toISOString()
      },
      {
        id: 2,
        user_id: 'usr-guardian-001',
        type: 'milestone_completed',
        title: 'Milestone Verified',
        message: 'Aarav Patel completed Milestone: "Interview 20 School Teachers".',
        link: '/guardians',
        is_read: false,
        created_at: new Date('2026-08-25T17:05:00Z').toISOString()
      }
    ],

    audit_logs: [
      {
        id: 1,
        user_id: 'usr-admin-001',
        action: 'PLATFORM_BOOTSTRAP',
        entity_type: 'system',
        entity_id: null,
        details: 'TeenPreneur Hub v1.0.0 initialized with COPPA security rules.',
        created_at: new Date('2026-08-14T08:00:00Z').toISOString()
      },
      {
        id: 2,
        user_id: 'usr-guardian-001',
        action: 'COPPA_CONSENT_GRANTED',
        entity_type: 'guardian_student_links',
        entity_id: 1,
        details: 'Parental supervision consent approved for minor student Aarav Patel.',
        created_at: new Date('2026-08-18T12:30:00Z').toISOString()
      },
      {
        id: 3,
        user_id: 'usr-student-001',
        action: 'STARTUP_CREATED',
        entity_type: 'startups',
        entity_id: 1,
        details: 'Venture created: EcoTrack Smart Campus',
        created_at: new Date('2026-08-20T11:00:00Z').toISOString()
      },
      {
        id: 4,
        user_id: 'usr-mentor-001',
        action: 'MILESTONE_APPROVED',
        entity_type: 'milestones',
        entity_id: 1,
        details: 'Verified milestone proof for EcoTrack Smart Campus customer discovery.',
        created_at: new Date('2026-08-25T17:00:00Z').toISOString()
      }
    ]
  };
}

class DataStore {
  constructor() {
    this.data = null;
    this.load();
  }

  load() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const content = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(content);
        return;
      }
    } catch (err) {
      console.warn('[DataStore] Warning reading local-db.json, generating fresh seed state:', err.message);
    }
    this.data = getInitialSeedData();
    this.save();
  }

  save() {
    try {
      const dir = path.dirname(DB_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('[DataStore] Error saving local-db.json:', err.message);
    }
  }

  table(name) {
    if (!this.data[name]) {
      this.data[name] = [];
    }
    return this.data[name];
  }

  find(tableName, predicate) {
    return this.table(tableName).find(predicate) || null;
  }

  filter(tableName, predicate) {
    return this.table(tableName).filter(predicate);
  }

  insert(tableName, item) {
    const list = this.table(tableName);
    const newId = item.id || (typeof list[0]?.id === 'number' ? Math.max(0, ...list.map(i => Number(i.id) || 0)) + 1 : `${tableName.slice(0, 3)}-${Date.now()}`);
    const newItem = {
      ...item,
      id: newId,
      created_at: item.created_at || new Date().toISOString()
    };
    list.push(newItem);
    this.save();
    return newItem;
  }

  update(tableName, id, updateFields) {
    const list = this.table(tableName);
    const index = list.findIndex(i => String(i.id) === String(id));
    if (index === -1) return null;
    const updated = {
      ...list[index],
      ...updateFields,
      updated_at: new Date().toISOString()
    };
    list[index] = updated;
    this.save();
    return updated;
  }

  delete(tableName, id) {
    const list = this.table(tableName);
    const index = list.findIndex(i => String(i.id) === String(id));
    if (index === -1) return false;
    list.splice(index, 1);
    this.save();
    return true;
  }
}

const dataStore = new DataStore();

module.exports = dataStore;
