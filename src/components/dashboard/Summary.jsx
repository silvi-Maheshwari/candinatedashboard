import { useSelector } from "react-redux";
import { calculatePriority } from "../../utils/priority";

export default function Summary() {
  const { list } = useSelector((state) => state.candidates);

  const total = list.length;
  const reviewed = list.filter((c) => c.reviewed).length;
  const pending = total - reviewed;
  const shortlisted = list.filter((c) => c.shortlisted).length;
  const rejected = list.filter((c) => c.rejected).length;
  
  // Priority breakdown
  const p0 = list.filter((c) => calculatePriority(c) === "P0").length;
  const p1 = list.filter((c) => calculatePriority(c) === "P1").length;
  const p2 = list.filter((c) => calculatePriority(c) === "P2").length;
  const p3 = list.filter((c) => calculatePriority(c) === "P3").length;

  return (
    <div className="summary">
      <div className="summary-card">
        <div className="summary-label">📊 Total Candidates</div>
        <div className="summary-value">{total}</div>
      </div>
      <div className="summary-card">
        <div className="summary-label">✓ Reviewed</div>
        <div className="summary-value">{reviewed}</div>
      </div>
      <div className="summary-card">
        <div className="summary-label">⏳ Pending</div>
        <div className="summary-value">{pending}</div>
      </div>
      <div className="summary-card">
        <div className="summary-label">⭐ Shortlisted</div>
        <div className="summary-value">{shortlisted}</div>
      </div>
      
      <div className="summary-card">
        <div className="summary-label">🔥 P0 (Interview)</div>
        <div className="summary-value" style={{ color: "#22c55e" }}>{p0}</div>
      </div>
      <div className="summary-card">
        <div className="summary-label">⭐ P1 (Strong)</div>
        <div className="summary-value" style={{ color: "#eab308" }}>{p1}</div>
      </div>
      <div className="summary-card">
        <div className="summary-label">👀 P2 (Review)</div>
        <div className="summary-value" style={{ color: "#f97316" }}>{p2}</div>
      </div>
      <div className="summary-card">
        <div className="summary-label">❌ P3 (Reject)</div>
        <div className="summary-value" style={{ color: "#ef4444" }}>{p3}</div>
      </div>
    </div>
  );
}