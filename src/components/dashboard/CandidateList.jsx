import { useSelector } from "react-redux";
import CandidateRow from "./CandidateRow";
import { calculatePriority } from "../../utils/priority";

export default function CandidateList() {
  const { list, filters, sortBy } = useSelector((state) => state.candidates);

  let filtered = list.filter((c) =>
    c.name.toLowerCase().includes(filters.search.toLowerCase())
  );

  filtered = filtered.filter(
    (c) =>
      c.assignment_score >= filters.assignment[0] &&
      c.video_score >= filters.video[0] &&
      c.ats_score >= filters.ats[0]
  );

  if (filters.status === "reviewed") {
    filtered = filtered.filter((c) => c.reviewed);
  } else if (filters.status === "pending") {
    filtered = filtered.filter((c) => !c.reviewed);
  }

  // Apply sorting
  filtered.sort((a, b) => {
    if (sortBy === "priority") {
      return calculatePriority(a).localeCompare(calculatePriority(b));
    } else if (sortBy === "assignment") {
      return b.assignment_score - a.assignment_score;
    } else if (sortBy === "video") {
      return b.video_score - a.video_score;
    } else if (sortBy === "ats") {
      return b.ats_score - a.ats_score;
    }
    return 0;
  });

  return (
    <div className="candidate-list-container">
      <div className="list-header">
        <h3>📋 Candidate List ({filtered.length})</h3>
      </div>
      <table className="candidate-table">
        <thead>
          <tr>
            <th style={{ width: "50px" }}>Select</th>
            <th>Name</th>
            <th>College</th>
            <th>Assignment</th>
            <th>Video</th>
            <th>ATS</th>
            <th>Priority</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ? (
            filtered.map((c) => (
              <CandidateRow key={c.id} data={c} />
            ))
          ) : (
            <tr>
              <td colSpan="8" className="no-results">
                No candidates found. Try adjusting your filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}