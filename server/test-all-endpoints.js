async function runTests() {
  const BASE_URL = 'http://localhost:5000/api/v1';
  const AI_URL = 'http://localhost:8000';
  const results = [];

  async function test(name, fn) {
    try {
      const res = await fn();
      results.push({ name, status: 'PASS', details: res });
      console.log(`[PASS] ${name}`);
    } catch (err) {
      results.push({ name, status: 'FAIL', error: err.message });
      console.error(`[FAIL] ${name}:`, err.message);
    }
  }

  console.log('--- Starting Comprehensive API Endpoint Verification ---');

  // 1. Base API
  await test('API Root Health', async () => {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    if (!data.success) throw new Error('Root health failed');
    return data.message;
  });

  // 2. AI Health
  await test('Python AI Service Health', async () => {
    const res = await fetch(`${AI_URL}/health`);
    const data = await res.json();
    if (data.status !== 'healthy') throw new Error('AI health not healthy');
    return data.status;
  });

  // 3. Student Login
  let studentToken = null;
  await test('Student Login (aarav.student@teenpreneur.edu)', async () => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'aarav.student@teenpreneur.edu', password: 'Demo1234!' })
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error?.message || 'Login failed');
    studentToken = data.data.tokens.accessToken;
    return `Logged in as ${data.data.user.firstName} (Role: ${data.data.user.role})`;
  });

  // 4. Student Startups
  await test('GET /startups (Student Ventures)', async () => {
    const res = await fetch(`${BASE_URL}/startups`, {
      headers: { Authorization: `Bearer ${studentToken}` }
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error?.message || 'Failed fetching startups');
    return `Found ${data.data.length} startups (First: ${data.data[0]?.name})`;
  });

  // 5. AI Feasibility Evaluation
  await test('POST /startups/evaluate-idea (AI Concept Scoring)', async () => {
    const res = await fetch(`${BASE_URL}/startups/evaluate-idea`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${studentToken}`
      },
      body: JSON.stringify({
        title: 'Smart Green Roof Garden',
        problem: 'Schools face high summer temperatures and lack fresh produce for cafeterias.',
        solution: 'Modular hydroponic urban farming trays with IoT moisture tracking.',
        targetMarket: 'Urban secondary schools'
      })
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error?.message || 'AI evaluation failed');
    return `Scored: ${data.data.overall_score}/100 (${data.data.rating_tier || 'Analyzed'})`;
  });

  // 6. Create Startup
  await test('POST /startups (Create New Venture)', async () => {
    const res = await fetch(`${BASE_URL}/startups`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${studentToken}`
      },
      body: JSON.stringify({
        name: 'HydroSense Solar ' + Date.now(),
        industry: 'CleanTech & IoT',
        tagline: 'Automated irrigation sensor array',
        description: 'IoT moisture nodes for agricultural schools'
      })
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error?.message || 'Create startup failed');
    return `Created venture ID: ${data.data.id} (${data.data.name})`;
  });

  // 7. Guardian Login
  let guardianToken = null;
  await test('Guardian Login (sunita.guardian@teenpreneur.edu)', async () => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'sunita.guardian@teenpreneur.edu', password: 'Demo1234!' })
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error?.message || 'Guardian login failed');
    guardianToken = data.data.tokens.accessToken;
    return `Logged in as ${data.data.user.firstName} (Role: ${data.data.user.role})`;
  });

  // 8. Guardian Linked Children
  await test('GET /guardians/children (Guardian Oversight)', async () => {
    const res = await fetch(`${BASE_URL}/guardians/children`, {
      headers: { Authorization: `Bearer ${guardianToken}` }
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error?.message || 'Failed fetching children');
    return `Found ${data.data.length} linked wards (First: ${data.data[0]?.first_name} - Consent: ${data.data[0]?.consent_status})`;
  });

  // 9. Mentor Login
  let mentorToken = null;
  await test('Mentor Login (sarah.mentor@teenpreneur.edu)', async () => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'sarah.mentor@teenpreneur.edu', password: 'Demo1234!' })
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error?.message || 'Mentor login failed');
    mentorToken = data.data.tokens.accessToken;
    return `Logged in as ${data.data.user.firstName} (Role: ${data.data.user.role})`;
  });

  // 10. Mentor Assigned Startups
  await test('GET /mentors/assigned-startups (Mentor Workspace)', async () => {
    const res = await fetch(`${BASE_URL}/mentors/assigned-startups`, {
      headers: { Authorization: `Bearer ${mentorToken}` }
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error?.message || 'Failed fetching assigned startups');
    return `Assigned to ${data.data.length} ventures (First: ${data.data[0]?.name})`;
  });

  // 11. Admin Login
  let adminToken = null;
  await test('Admin Login (admin@teenpreneur.edu)', async () => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@teenpreneur.edu', password: 'Demo1234!' })
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error?.message || 'Admin login failed');
    adminToken = data.data.tokens.accessToken;
    return `Logged in as ${data.data.user.firstName} (Role: ${data.data.user.role})`;
  });

  // 12. Admin Dashboard
  await test('GET /admin/dashboard (Platform Governance)', async () => {
    const res = await fetch(`${BASE_URL}/admin/dashboard`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error?.message || 'Admin dashboard failed');
    return `Total users: ${data.data.metrics?.totalUsers}, Startups: ${data.data.metrics?.totalStartups}, Pending Mentors: ${data.data.pendingMentors?.length}`;
  });

  // 13. LMS Tracks
  await test('GET /learning/tracks (LMS Academy)', async () => {
    const res = await fetch(`${BASE_URL}/learning/tracks`);
    const data = await res.json();
    if (!data.success) throw new Error(data.error?.message || 'LMS tracks failed');
    return `Found ${data.data.length} course tracks`;
  });

  // 14. Submit Quiz
  await test('POST /learning/lessons/les-1/quiz (LMS Quiz Grading)', async () => {
    const res = await fetch(`${BASE_URL}/learning/lessons/les-1/quiz`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${studentToken}`
      },
      body: JSON.stringify({ selectedAnswer: 1 })
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error?.message || 'Quiz submission failed');
    return `Passed: ${data.data.passed}, Score: ${data.data.score}`;
  });

  // 15. Pitch Events & Leaderboard
  await test('GET /events/events (Virtual Pitch Competitions)', async () => {
    const res = await fetch(`${BASE_URL}/events/events`);
    const data = await res.json();
    if (!data.success) throw new Error(data.error?.message || 'Pitch events failed');
    return `Found ${data.data.length} active demo events (First: ${data.data[0]?.title})`;
  });

  // 16. Supervised Chat
  await test('GET /messages/channel/mentor-student-1 (Supervised Messaging)', async () => {
    const res = await fetch(`${BASE_URL}/messages/channel/mentor-student-1`);
    const data = await res.json();
    if (!data.success) throw new Error(data.error?.message || 'Chat messages failed');
    return `Retrieved ${data.data.length} chat messages in channel`;
  });

  // 17. Send Message with AI Moderation
  await test('POST /messages/channel/mentor-student-1 (AI Supervised Message)', async () => {
    const res = await fetch(`${BASE_URL}/messages/channel/mentor-student-1`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${studentToken}`
      },
      body: JSON.stringify({
        message: 'Completed testing our solar sensors today! Ready for Demo Day review.'
      })
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error?.message || 'Message send failed');
    return `Message sent (Flagged: ${data.data.is_flagged || false})`;
  });

  console.log('\n================ SUMMARY ================');
  const passed = results.filter(r => r.status === 'PASS').length;
  console.log(`TOTAL TESTS: ${results.length} | PASSED: ${passed} | FAILED: ${results.length - passed}`);
}

runTests();
