import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateEvaluation } from "../../store/candidateSlice";

export default function VideoPanel({ candidate }) {
  const dispatch = useDispatch();
  const [newNote, setNewNote] = useState("");

  const update = (field, value) => {
    dispatch(updateEvaluation({ id: candidate.id, field, value: Number(value) }));
  };

  const criteria = [
    { field: "clarity", label: "Clarity", description: "How clear and understandable" },
    { field: "confidence", label: "Confidence", description: "Presenter's confidence level" },
    { field: "architecture_explanation", label: "Architecture", description: "Technical depth & explanation" },
    { field: "tradeoff_reasoning", label: "Tradeoff Reasoning", description: "Decision-making approach" },
    { field: "communication", label: "Communication", description: "Overall speaking skills" }
  ];

  const getRatingColor = (rating) => {
    if (rating >= 5) return "#10b981";
    if (rating >= 4) return "#3b82f6";
    if (rating >= 3) return "#f59e0b";
    if (rating >= 2) return "#f97316";
    return "#ef4444";
  };

  const addNote = () => {
    if (newNote.trim()) {
      const timestamp = new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
      candidate.video_notes = candidate.video_notes || [];
      candidate.video_notes.push(`${timestamp} - ${newNote}`);
      setNewNote("");
    }
  };

  return (
    <div className="evaluation-panel">
      <div className="panel-header">
        <h3>🎥 Video Evaluation</h3>
        <p>Assess the video explanation quality</p>
      </div>

      <div className="criteria-list">
        {criteria.map((item) => (
          <div key={item.field} className="criteria-item">
            <div className="criteria-header">
              <label>{item.label}</label>
              <div className="rating-display">
                <span 
                  className="rating-value"
                  style={{ color: getRatingColor(candidate[item.field]) }}
                >
                  {candidate[item.field]}/5
                </span>
              </div>
            </div>
            <p className="criteria-description">{item.description}</p>
            <div className="slider-container">
              <input
                type="range"
                min="1"
                max="5"
                value={candidate[item.field] || 3}
                onChange={(e) => update(item.field, e.target.value)}
                className="criteria-slider"
              />
              <div className="slider-labels">
                <span>Poor</span>
                <span>Good</span>
                <span>Excellent</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="notes-section">
        <h4>📝 Timestamp Notes</h4>
        <div className="note-input-group">
          <textarea
            placeholder="Add note (e.g., 'unclear explanation at 2:15')"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.ctrlKey) {
                addNote();
              }
            }}
          />
          <button onClick={addNote} className="add-note-btn">
            Add Note
          </button>
        </div>

        {candidate.video_notes && candidate.video_notes.length > 0 && (
          <div className="notes-list">
            {candidate.video_notes.map((note, idx) => (
              <div key={idx} className="note-item">
                <span className="note-timestamp">{note.split(" - ")[0]}</span>
                <span className="note-text">{note.split(" - ")[1]}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}