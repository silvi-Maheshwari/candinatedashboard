// Calculate priority score (0-100)
export const calculateScore = (c) => {
  return Math.round(
    c.assignment_score * 0.3 +
    c.video_score * 0.25 +
    c.ats_score * 0.2 +
    c.github_score * 0.15 +
    c.communication_score * 0.1
  );
};

// Calculate priority level based on score
export const calculatePriority = (c) => {
  const score = calculateScore(c);

  if (score >= 80) return "P0";
  if (score >= 65) return "P1";
  if (score >= 50) return "P2";
  return "P3";
};

// Get priority details
export const getPriorityDetails = (c) => {
  const score = calculateScore(c);
  const priority = calculatePriority(c);
  
  return {
    score,
    priority,
    label:
      priority === "P0" ? "🔥 Interview immediately - Top candidate" :
      priority === "P1" ? "⭐ Strong shortlist - Highly recommended" :
      priority === "P2" ? "👀 Review later - Potential candidate" :
      "❌ Reject - Below threshold",
    color:
      priority === "P0" ? "#22c55e" :
      priority === "P1" ? "#eab308" :
      priority === "P2" ? "#f97316" :
      "#ef4444"
  };
};