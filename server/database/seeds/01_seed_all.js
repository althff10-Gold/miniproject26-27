const bcrypt = require('bcrypt');

/**
 * Seed: Create admin user and demo accounts
 * All demo accounts use clearly marked credentials
 */
exports.seed = async function(knex) {
  // Clear all tables in correct order (respecting foreign keys)
  await knex('audit_logs').del();
  await knex('notifications').del();
  await knex('pitch_feedback').del();
  await knex('pitch_submissions').del();
  await knex('pitch_events').del();
  await knex('moderation_actions').del();
  await knex('message_flags').del();
  await knex('messages').del();
  await knex('conversation_participants').del();
  await knex('conversations').del();
  await knex('learning_progress').del();
  await knex('quiz_attempts').del();
  await knex('quiz_questions').del();
  await knex('quizzes').del();
  await knex('lessons').del();
  await knex('courses').del();
  await knex('milestone_progress').del();
  await knex('milestones').del();
  await knex('business_ideas').del();
  await knex('startups').del();
  await knex('mentor_assignments').del();
  await knex('mentor_verifications').del();
  await knex('guardian_student_links').del();
  await knex('mentors').del();
  await knex('guardians').del();
  await knex('students').del();
  await knex('users').del();

  const saltRounds = 12;

  // ============ USERS ============
  const adminPassword = await bcrypt.hash('Admin@123', saltRounds);
  const guardianPassword = await bcrypt.hash('Guardian@123', saltRounds);
  const studentPassword = await bcrypt.hash('Student@123', saltRounds);
  const mentorPassword = await bcrypt.hash('Mentor@123', saltRounds);

  const [admin] = await knex('users').insert({
    email: 'admin@teenpreneur.hub',
    password_hash: adminPassword,
    role: 'admin',
    status: 'active',
    first_name: 'Admin',
    last_name: 'TeenPreneur',
    phone: '+91-9000000001'
  }).returning('*');

  const [guardianUser] = await knex('users').insert({
    email: 'guardian@demo.com',
    password_hash: guardianPassword,
    role: 'guardian',
    status: 'active',
    first_name: 'Priya',
    last_name: 'Sharma',
    phone: '+91-9000000002'
  }).returning('*');

  const [studentUser] = await knex('users').insert({
    email: 'student@demo.com',
    password_hash: studentPassword,
    role: 'student',
    status: 'active',
    first_name: 'Arjun',
    last_name: 'Sharma',
    phone: '+91-9000000003'
  }).returning('*');

  const [mentorUser] = await knex('users').insert({
    email: 'mentor@demo.com',
    password_hash: mentorPassword,
    role: 'mentor',
    status: 'active',
    first_name: 'Rajesh',
    last_name: 'Kumar',
    phone: '+91-9000000004'
  }).returning('*');

  // Second student (pending)
  const [student2User] = await knex('users').insert({
    email: 'student2@demo.com',
    password_hash: studentPassword,
    role: 'student',
    status: 'pending',
    first_name: 'Meera',
    last_name: 'Patel',
    phone: '+91-9000000005'
  }).returning('*');

  // ============ ROLE-SPECIFIC PROFILES ============
  const [guardian] = await knex('guardians').insert({
    user_id: guardianUser.id,
    relationship: 'parent',
    occupation: 'Software Engineer',
    address: 'Mumbai, Maharashtra, India'
  }).returning('*');

  const [student] = await knex('students').insert({
    user_id: studentUser.id,
    school_name: 'Delhi Public School',
    grade: '11th',
    date_of_birth: '2010-05-15',
    interests: 'Technology, Business, AI',
    bio: 'Aspiring tech entrepreneur passionate about solving real-world problems.',
    city: 'Mumbai',
    state: 'Maharashtra',
    guardian_approved: true
  }).returning('*');

  const [student2] = await knex('students').insert({
    user_id: student2User.id,
    school_name: 'Kendriya Vidyalaya',
    grade: '10th',
    date_of_birth: '2011-08-20',
    interests: 'Environment, Social Impact',
    bio: 'Passionate about sustainable business ideas.',
    city: 'Bangalore',
    state: 'Karnataka',
    guardian_approved: false
  }).returning('*');

  const [mentor] = await knex('mentors').insert({
    user_id: mentorUser.id,
    expertise: 'Technology & Startups',
    organization: 'TechStart Ventures',
    bio: 'Serial entrepreneur with 15 years of experience in tech startups. Passionate about mentoring the next generation.',
    years_of_experience: 15,
    linkedin_url: 'https://linkedin.com/in/rajesh-kumar-demo',
    verification_status: 'verified'
  }).returning('*');

  // ============ GUARDIAN-STUDENT LINK ============
  await knex('guardian_student_links').insert({
    guardian_id: guardian.id,
    student_id: student.id,
    status: 'approved',
    guardian_code: 'GRD001',
    approved_at: new Date()
  });

  await knex('guardian_student_links').insert({
    guardian_id: guardian.id,
    student_id: student2.id,
    status: 'pending',
    guardian_code: 'GRD002'
  });

  // ============ MENTOR VERIFICATION ============
  await knex('mentor_verifications').insert({
    mentor_id: mentor.id,
    document_type: 'certification',
    document_url: '/uploads/demo/mentor_cert.pdf',
    qualification: 'MBA in Entrepreneurship',
    institution: 'IIM Bangalore',
    status: 'approved',
    reviewed_by: admin.id,
    review_notes: 'Verified credentials. Approved for mentorship.',
    reviewed_at: new Date()
  });

  // ============ MENTOR ASSIGNMENT ============
  await knex('mentor_assignments').insert({
    mentor_id: mentor.id,
    student_id: student.id,
    assigned_by: admin.id,
    status: 'active',
    notes: 'Assigned for technology startup guidance'
  });

  // ============ STARTUP ============
  const [startup] = await knex('startups').insert({
    student_id: student.id,
    name: 'EcoTrack',
    description: 'A mobile app that helps students track and reduce their carbon footprint through gamification.',
    industry: 'CleanTech / EdTech',
    stage: 'validation',
    status: 'active',
    problem_statement: 'Students lack awareness about their daily environmental impact and have no engaging way to track it.',
    solution: 'A gamified mobile app that tracks daily activities, calculates carbon footprint, suggests eco-friendly alternatives, and rewards sustainable behavior.',
    target_audience: 'School and college students aged 13-22'
  }).returning('*');

  // ============ BUSINESS IDEA ============
  await knex('business_ideas').insert({
    startup_id: startup.id,
    title: 'Carbon Footprint Tracker App',
    description: 'Mobile application with AI-powered activity tracking to calculate and visualize personal carbon footprint.',
    value_proposition: 'Make environmental awareness fun and actionable for young people through gamification and social challenges.',
    target_market: 'Students aged 13-22, environmentally conscious schools',
    revenue_model: 'Freemium model with premium features, school partnerships, and corporate sponsorships for challenges.',
    status: 'approved'
  });

  // ============ MILESTONES ============
  const milestones = [
    { startup_id: startup.id, title: 'Market Research', description: 'Conduct surveys and interviews with target users', order_index: 1, status: 'completed', due_date: '2026-10-01' },
    { startup_id: startup.id, title: 'MVP Design', description: 'Create wireframes and UI/UX prototype', order_index: 2, status: 'in_progress', due_date: '2026-10-15' },
    { startup_id: startup.id, title: 'MVP Development', description: 'Build the minimum viable product', order_index: 3, status: 'not_started', due_date: '2026-11-01' },
    { startup_id: startup.id, title: 'Beta Testing', description: 'Launch beta with 50 test users', order_index: 4, status: 'not_started', due_date: '2026-11-15' },
    { startup_id: startup.id, title: 'Launch', description: 'Public launch and marketing campaign', order_index: 5, status: 'not_started', due_date: '2026-12-01' }
  ];
  const insertedMilestones = await knex('milestones').insert(milestones).returning('*');

  await knex('milestone_progress').insert({
    milestone_id: insertedMilestones[0].id,
    description: 'Completed 30 user interviews and 150 survey responses. Key findings documented.',
    percentage: 100,
    updated_by: studentUser.id
  });

  await knex('milestone_progress').insert({
    milestone_id: insertedMilestones[1].id,
    description: 'Wireframes completed. Working on high-fidelity prototype in Figma.',
    percentage: 60,
    updated_by: studentUser.id
  });

  // ============ COURSES ============
  const [course1] = await knex('courses').insert({
    title: 'Introduction to Entrepreneurship',
    description: 'Learn the fundamentals of entrepreneurship, from ideation to execution. Perfect for young aspiring entrepreneurs.',
    category: 'Entrepreneurship',
    difficulty: 'beginner',
    duration_minutes: 120,
    status: 'published',
    created_by: admin.id,
    order_index: 1
  }).returning('*');

  const [course2] = await knex('courses').insert({
    title: 'Business Model Canvas',
    description: 'Master the Business Model Canvas framework to design, test, and iterate your startup idea.',
    category: 'Business Strategy',
    difficulty: 'intermediate',
    duration_minutes: 90,
    status: 'published',
    created_by: admin.id,
    order_index: 2
  }).returning('*');

  // ============ LESSONS ============
  const lessons1 = [
    { course_id: course1.id, title: 'What is Entrepreneurship?', content: 'Entrepreneurship is the process of creating, developing, and managing a new business venture...', order_index: 1, duration_minutes: 15 },
    { course_id: course1.id, title: 'Finding Your Passion', content: 'Every great startup begins with a passionate founder who wants to solve a real problem...', order_index: 2, duration_minutes: 20 },
    { course_id: course1.id, title: 'Identifying Problems Worth Solving', content: 'The best business ideas come from identifying real problems that people face...', order_index: 3, duration_minutes: 25 },
    { course_id: course1.id, title: 'From Idea to Action', content: 'Learn how to transform your idea into an actionable plan...', order_index: 4, duration_minutes: 30 }
  ];
  await knex('lessons').insert(lessons1);

  // ============ QUIZZES ============
  const [quiz1] = await knex('quizzes').insert({
    course_id: course1.id,
    title: 'Entrepreneurship Basics Quiz',
    description: 'Test your understanding of entrepreneurship fundamentals',
    passing_score: 60,
    time_limit_minutes: 15,
    max_attempts: 3
  }).returning('*');

  await knex('quiz_questions').insert([
    {
      quiz_id: quiz1.id,
      question_text: 'What is the primary goal of a startup?',
      options: JSON.stringify(['Make quick profits', 'Solve a problem for a target market', 'Get famous', 'Copy existing businesses']),
      correct_answer: 1,
      points: 1,
      explanation: 'Startups aim to solve real problems for their target market in innovative ways.',
      order_index: 1
    },
    {
      quiz_id: quiz1.id,
      question_text: 'What does MVP stand for?',
      options: JSON.stringify(['Most Valuable Player', 'Minimum Viable Product', 'Maximum Value Proposition', 'Market Validation Process']),
      correct_answer: 1,
      points: 1,
      explanation: 'MVP = Minimum Viable Product — the simplest version of your product that delivers core value.',
      order_index: 2
    },
    {
      quiz_id: quiz1.id,
      question_text: 'Which of the following is NOT a common revenue model?',
      options: JSON.stringify(['Subscription', 'Freemium', 'Procrastination', 'Advertising']),
      correct_answer: 2,
      points: 1,
      explanation: 'Procrastination is not a revenue model! Subscription, freemium, and advertising are common models.',
      order_index: 3
    }
  ]);

  // ============ LEARNING PROGRESS ============
  await knex('learning_progress').insert({
    student_id: student.id,
    course_id: course1.id,
    lesson_id: null,
    completed: false,
    progress_percentage: 50
  });

  // ============ PITCH EVENT ============
  const [pitchEvent] = await knex('pitch_events').insert({
    title: 'TeenPreneur Pitch Day 2026',
    description: 'Present your startup idea to a panel of verified mentors and receive constructive feedback.',
    event_date: '2026-11-15T10:00:00',
    submission_deadline: '2026-11-10T23:59:00',
    max_participants: 20,
    status: 'upcoming',
    created_by: admin.id
  }).returning('*');

  // ============ NOTIFICATIONS ============
  await knex('notifications').insert([
    {
      user_id: studentUser.id,
      type: 'mentor_assignment',
      title: 'Mentor Assigned',
      message: 'Rajesh Kumar has been assigned as your mentor. Start connecting!',
      link: '/student/mentor',
      is_read: false
    },
    {
      user_id: studentUser.id,
      type: 'pitch_event',
      title: 'Upcoming Pitch Event',
      message: 'TeenPreneur Pitch Day 2026 is coming up! Submit your pitch before Nov 10.',
      link: '/student/events',
      is_read: false
    },
    {
      user_id: guardianUser.id,
      type: 'guardian_approval',
      title: 'New Student Registration',
      message: 'Meera Patel has requested your approval to join TeenPreneur Hub.',
      link: '/guardian/approvals',
      is_read: false
    }
  ]);

  // ============ AUDIT LOG ============
  await knex('audit_logs').insert({
    user_id: admin.id,
    action: 'SEED_DATA',
    entity_type: 'system',
    entity_id: null,
    new_values: JSON.stringify({ message: 'Demo data seeded for development' }),
    ip_address: '127.0.0.1',
    user_agent: 'Seed Script'
  });

  console.log('✅ Seed data inserted successfully!');
  console.log('Demo accounts:');
  console.log('  Admin:    admin@teenpreneur.hub / Admin@123');
  console.log('  Guardian: guardian@demo.com / Guardian@123');
  console.log('  Student:  student@demo.com / Student@123');
  console.log('  Mentor:   mentor@demo.com / Mentor@123');
};
