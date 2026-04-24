import { useDispatch } from "react-redux";
import { updateEvaluation } from "../../store/candidateSlice";

export default function AssignmentPanel({ candidate }) {
  const dispatch = useDispatch();

  const update = (field, value) => {
    dispatch(updateEvaluation({ id: candidate.id, field, value: Number(value) }));
  };

  const criteria = [
    { field: "ui_quality", label: "UI Quality", description: "Design, layout, visual hierarchy" },
    { field: "component_structure", label: "Component Structure", description: "Code organization, reusability" },
    { field: "state_handling", label: "State Handling", description: "State management, data flow" },
    { field: "edge_case_handling", label: "Edge-Case Handling", description: "Error handling, edge cases" },
    { field: "responsiveness", label: "Responsiveness", description: "Mobile-friendly, adaptive design" },
    { field: "accessibility", label: "Accessibility", description: "a11y, semantic HTML, ARIA" }
  ];

  const getRatingColor = (rating) => {
    if (rating >= 5) return "#10b981";
    if (rating >= 4) return "#3b82f6";
    if (rating >= 3) return "#f59e0b";
    if (rating >= 2) return "#f97316";
    return "#ef4444";
  };

  return (
    <div className="evaluation-panel">
      <div className="panel-header">
        <h3>📋 Assignment Evaluation</h3>
        <p>Rate different aspects of the assignment submission</p>
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
    </div>
  );
}