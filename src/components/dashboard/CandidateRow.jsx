import { useDispatch, useSelector } from "react-redux";
import { selectCandidate, toggleCompare } from "../../store/candidateSlice";
import { calculatePriority, calculateScore } from "../../utils/priority";

export default function CandidateRow({ data }) {
  const dispatch = useDispatch();
  const { compare } = useSelector((state) => state.candidates);
  const isSelected = compare.includes(data.id);

  return (
    <tr onClick={() => dispatch(selectCandidate(data))} className={isSelected ? "selected" : ""}>
      <td onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => {
            e.stopPropagation();
            dispatch(toggleCompare(data.id));
          }}
        />
      </td>
      <td className="candidate-name">{data.name}</td>
      <td className="candidate-college">{data.college}</td>
      <td className="score-td">
        <span className="score-badge">{data.assignment_score}</span>
      </td>
      <td className="score-td">
        <span className="score-badge">{data.video_score}</span>
      </td>
      <td className="score-td">
        <span className="score-badge">{data.ats_score}</span>
      </td>
      <td className="priority-td">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
          <span className={`priority ${calculatePriority(data).toLowerCase()}`}>
            {calculatePriority(data)}
          </span>
          <span style={{ fontSize: "10px", color: "#6b7280", fontWeight: "500" }}>
            {calculateScore(data)}/100
          </span>
        </div>
      </td>
      <td className="status-td">
        {data.rejected ? (
          <span className="status-badge rejected">✕ Rejected</span>
        ) : data.shortlisted ? (
          <span className="status-badge shortlisted">⭐ Shortlisted</span>
        ) : data.reviewed ? (
          <span className="status-badge reviewed">✓ Reviewed</span>
        ) : (
          <span className="status-badge pending">⏳ Pending</span>
        )}
      </td>
    </tr>
  );
}