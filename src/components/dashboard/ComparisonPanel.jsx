import { useSelector, useDispatch } from "react-redux";
import { toggleCompare } from "../../store/candidateSlice";
import { calculatePriority } from "../../utils/priority";

export default function ComparisonPanel() {
  const { list, compare } = useSelector((state) => state.candidates);
  const dispatch = useDispatch();

  const candidates = list.filter((c) => compare.includes(c.id));

  if (compare.length === 0) return null;

  // Calculate overall score
  const getOverallScore = (c) => {
    return Math.round(
      c.assignment_score * 0.3 +
      c.video_score * 0.25 +
      c.ats_score * 0.2 +
      c.github_score * 0.15 +
      c.communication_score * 0.1
    );
  };

  return (
    <div className="comparison-panel">
      <div className="comparison-header">
        <div>
          <h2>⚖️ Comparison Mode</h2>
          <p>{compare.length} candidate(s) selected</p>
        </div>
      </div>

      <table className="comparison-table">
        <thead>
          <tr>
            <th>Metric</th>
            {candidates.map((c) => (
              <th key={c.id}>
                <div className="candidate-cell">
                  <div>{c.name}</div>
                  <div className="candidate-college">{c.college}</div>
                  <button
                    className="remove-btn"
                    onClick={() => dispatch(toggleCompare(c.id))}
                  >
                    ✕
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Overall Score</strong></td>
            {candidates.map((c) => (
              <td key={c.id} className="score-cell overall">
                {getOverallScore(c)}/100
              </td>
            ))}
          </tr>
          <tr>
            <td><strong>Assignment</strong></td>
            {candidates.map((c) => (
              <td key={c.id} className="score-cell">
                {c.assignment_score}
              </td>
            ))}
          </tr>
          <tr>
            <td><strong>Video</strong></td>
            {candidates.map((c) => (
              <td key={c.id} className="score-cell">
                {c.video_score}
              </td>
            ))}
          </tr>
          <tr>
            <td><strong>ATS</strong></td>
            {candidates.map((c) => (
              <td key={c.id} className="score-cell">
                {c.ats_score}
              </td>
            ))}
          </tr>
          <tr>
            <td><strong>GitHub</strong></td>
            {candidates.map((c) => (
              <td key={c.id} className="score-cell">
                {c.github_score}
              </td>
            ))}
          </tr>
          <tr>
            <td><strong>Communication</strong></td>
            {candidates.map((c) => (
              <td key={c.id} className="score-cell">
                {c.communication_score}
              </td>
            ))}
          </tr>
          <tr>
            <td><strong>Priority</strong></td>
            {candidates.map((c) => (
              <td key={c.id} className="priority-cell">
                <span className={`priority ${calculatePriority(c).toLowerCase()}`}>
                  {calculatePriority(c)}
                </span>
              </td>
            ))}
          </tr>
          <tr>
            <td><strong>Status</strong></td>
            {candidates.map((c) => (
              <td key={c.id} className="status-cell">
                {c.rejected && <span className="status-badge rejected">✕ Rejected</span>}
                {c.shortlisted && <span className="status-badge shortlisted">⭐ Shortlisted</span>}
                {!c.rejected && !c.shortlisted && c.reviewed && <span className="status-badge reviewed">✓ Reviewed</span>}
                {!c.rejected && !c.shortlisted && !c.reviewed && <span className="status-badge pending">⏳ Pending</span>}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <div className="comparison-controls">
        <button
          className="clear-btn"
          onClick={() => {
            compare.forEach((id) => dispatch(toggleCompare(id)));
          }}
        >
          Clear All
        </button>
      </div>
    </div>
  );
}
