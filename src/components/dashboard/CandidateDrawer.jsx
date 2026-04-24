import { useSelector, useDispatch } from "react-redux";
import { updateScore, selectCandidate, toggleShortlist, toggleReject } from "../../store/candidateSlice";
import { calculatePriority, calculateScore, getPriorityDetails } from "../../utils/priority";
import AssignmentPanel from "../drawer/AssignmentPanel";
import VideoPanel from "../drawer/VideoPanel";


export default function CandidateDrawer() {
  const { selected } = useSelector((state) => state.candidates);
  const dispatch = useDispatch();

  if (!selected) return null;

  const update = (field, value) => {
    dispatch(updateScore({ id: selected.id, field, value: Number(value) }));
  };

  const priority = calculatePriority(selected);
  const priorityDetails = getPriorityDetails(selected);
  const overallScore = calculateScore(selected);

  return (
    <div className={`drawer ${selected ? "active" : ""}`}>
      <div className="drawer-top">
        <div className="drawer-header">
          <h2>{selected?.name}</h2>
          <p className="college-name">📍 {selected?.college}</p>
        </div>
        <button 
          className="close-btn-icon"
          onClick={() => dispatch(selectCandidate(null))}
        >
          ✕
        </button>
      </div>

      {/* Score Overview */}
      <div className="scores-overview">
        <h3>📊 Score Summary</h3>
        <div className="scores-grid">
          <div className="score-card">
            <div className="score-label">Assignment</div>
            <div className="score-value">{selected?.assignment_score}</div>
            <div className="score-bar">
              <div 
                className="score-fill" 
                style={{ width: `${selected?.assignment_score}%` }}
              />
            </div>
          </div>

          <div className="score-card">
            <div className="score-label">Video</div>
            <div className="score-value">{selected?.video_score}</div>
            <div className="score-bar">
              <div 
                className="score-fill" 
                style={{ width: `${selected?.video_score}%` }}
              />
            </div>
          </div>

          <div className="score-card">
            <div className="score-label">ATS</div>
            <div className="score-value">{selected?.ats_score}</div>
            <div className="score-bar">
              <div 
                className="score-fill" 
                style={{ width: `${selected?.ats_score}%` }}
              />
            </div>
          </div>

          <div className="score-card">
            <div className="score-label">GitHub</div>
            <div className="score-value">{selected?.github_score}</div>
            <div className="score-bar">
              <div 
                className="score-fill" 
                style={{ width: `${selected?.github_score}%` }}
              />
            </div>
          </div>

          <div className="score-card">
            <div className="score-label">Communication</div>
            <div className="score-value">{selected?.communication_score}</div>
            <div className="score-bar">
              <div 
                className="score-fill" 
                style={{ width: `${selected?.communication_score}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Priority Display */}
      <div className="priority-banner" data-priority={priority.toLowerCase()}>
        <div className="priority-info">
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <h3 style={{ margin: 0 }}>Priority: <span className={`priority ${priority.toLowerCase()}`}>{priority}</span></h3>
            <div style={{
              background: priorityDetails.color,
              color: "white",
              padding: "4px 12px",
              borderRadius: "6px",
              fontWeight: "700",
              fontSize: "14px"
            }}>
              Score: {overallScore}/100
            </div>
          </div>
          <p className="priority-description">
            {priorityDetails.label}
          </p>
          
          {/* Score Breakdown */}
          <div style={{
            marginTop: "12px",
            padding: "10px",
            background: "rgba(0,0,0,0.05)",
            borderRadius: "6px",
            fontSize: "12px",
            fontFamily: "monospace"
          }}>
            <div>📊 Score Breakdown:</div>
            <div>Assignment (30%): {Math.round(selected?.assignment_score * 0.3)}/30</div>
            <div>Video (25%): {Math.round(selected?.video_score * 0.25)}/25</div>
            <div>ATS (20%): {Math.round(selected?.ats_score * 0.2)}/20</div>
            <div>GitHub (15%): {Math.round(selected?.github_score * 0.15)}/15</div>
            <div>Communication (10%): {Math.round(selected?.communication_score * 0.1)}/10</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button 
            className={`shortlist-btn ${selected?.shortlisted ? "active" : ""}`}
            onClick={() => dispatch(toggleShortlist(selected.id))}
          >
            {selected?.shortlisted ? "★ Shortlisted" : "☆ Add to Shortlist"}
          </button>
          <button 
            className={`reject-btn ${selected?.rejected ? "active" : ""}`}
            onClick={() => dispatch(toggleReject(selected.id))}
            style={{
              background: selected?.rejected ? "#ff4444" : "#f0f0f0",
              color: selected?.rejected ? "white" : "#333",
              border: "1px solid #ddd",
              padding: "10px 16px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "all 0.3s ease"
            }}
          >
            {selected?.rejected ? "✕ Rejected" : "✕ Reject"}
          </button>
        </div>
      </div>

      {/* Score Adjustment Sliders */}
      {/* Score Adjustment Sliders */}
      <div className="score-adjustment">
        <h3>⚙️ Adjust Scores</h3>
        <div className="score-sliders">
          <div className="slider-group">
            <label>Assignment Score: {selected?.assignment_score}/100</label>
            <input
              type="range"
              min="0"
              max="100"
              value={selected?.assignment_score || 0}
              onChange={(e) => update("assignment_score", e.target.value)}
              className="main-slider"
            />
          </div>

          <div className="slider-group">
            <label>Video Score: {selected?.video_score}/100</label>
            <input
              type="range"
              min="0"
              max="100"
              value={selected?.video_score || 0}
              onChange={(e) => update("video_score", e.target.value)}
              className="main-slider"
            />
          </div>

          <div className="slider-group">
            <label>ATS Score: {selected?.ats_score}/100</label>
            <input
              type="range"
              min="0"
              max="100"
              value={selected?.ats_score || 0}
              onChange={(e) => update("ats_score", e.target.value)}
              className="main-slider"
            />
          </div>

          <div className="slider-group">
            <label>GitHub Score: {selected?.github_score}/100</label>
            <input
              type="range"
              min="0"
              max="100"
              value={selected?.github_score || 0}
              onChange={(e) => update("github_score", e.target.value)}
              className="main-slider"
            />
          </div>

          <div className="slider-group">
            <label>Communication Score: {selected?.communication_score}/100</label>
            <input
              type="range"
              min="0"
              max="100"
              value={selected?.communication_score || 0}
              onChange={(e) => update("communication_score", e.target.value)}
              className="main-slider"
            />
          </div>
        </div>
      </div>

      {/* Evaluation Panels */}
      <AssignmentPanel candidate={selected} />
      <VideoPanel candidate={selected} />

      <button 
        className="close-btn-full"
        onClick={() => dispatch(selectCandidate(null))}
      >
        Close Drawer
      </button>
    </div>
  );
}