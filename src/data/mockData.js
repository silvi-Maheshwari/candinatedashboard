const colleges = [
  "IIT Delhi", "IIT Bombay", "IIT Madras", "IIT Kanpur", "IIT Kharagpur",
  "BITS Pilani", "NIT Rourkee", "NIT Trichy", "IIIT Delhi", "IIIT Hyderabad",
  "Delhi University", "Mumbai University", "Bangalore Institute", "Chennai Institute", "Pune Institute"
];

const firstNames = [
  "Aarav", "Vivaan", "Aditya", "Arjun", "Ashok", "Ananya", "Priya", "Neha", "Shreya", "Pooja",
  "Rohan", "Kavya", "Rishi", "Diya", "Aryan", "Zara", "Sanjay", "Deepak", "Ritik", "Ankita",
  "Nikhil", "Sakshi", "Varun", "Divya", "Harsh", "Swati", "Rajesh", "Sneha", "Karan", "Isha"
];

const lastNames = [
  "Sharma", "Singh", "Kumar", "Patel", "Verma", "Gupta", "Rao", "Nair", "Menon", "Iyer",
  "Kapoor", "Malik", "Desai", "Reddy", "Chopra", "Bhat", "Trivedi", "Saxena", "Jain", "Mehta"
];

function getRandomName(i) {
  const first = firstNames[i % firstNames.length];
  const last = lastNames[(i * 7) % lastNames.length];
  return `${first} ${last}`;
}

function getRandomCollege(i) {
  return colleges[i % colleges.length];
}

function randomScore(min = 0, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const mockData = Array.from({ length: 100 }, (_, i) => {
  // Generate realistic score distributions
  const baseScore = randomScore(40, 95);
  
  return {
    id: i + 1,
    name: getRandomName(i),
    college: getRandomCollege(i),
    
    // Main scores
    assignment_score: Math.max(30, baseScore + randomScore(-15, 15)),
    video_score: Math.max(30, baseScore + randomScore(-20, 10)),
    ats_score: Math.max(30, baseScore + randomScore(-10, 20)),
    github_score: Math.max(30, baseScore + randomScore(-15, 15)),
    communication_score: Math.max(30, baseScore + randomScore(-20, 20)),
    
    // Assignment evaluation details
    ui_quality: randomScore(1, 5),
    component_structure: randomScore(1, 5),
    state_handling: randomScore(1, 5),
    edge_case_handling: randomScore(1, 5),
    responsiveness: randomScore(1, 5),
    accessibility: randomScore(1, 5),
    
    // Video evaluation details
    clarity: randomScore(1, 5),
    confidence: randomScore(1, 5),
    architecture_explanation: randomScore(1, 5),
    tradeoff_reasoning: randomScore(1, 5),
    communication: randomScore(1, 5),
    
    // Timestamps for video notes
    video_notes: [
      `${randomScore(2, 8)}:${randomScore(10, 59)} - Strong architecture discussion`,
      `${randomScore(9, 15)}:${randomScore(10, 59)} - Clear state management approach`
    ],
    
    // Status
    reviewed: Math.random() > 0.6, // 40% are reviewed
    shortlisted: false,
    rejected: false
  };
});