import { useDispatch } from "react-redux";
import { setSearch, setFilters, setSortBy } from "../../store/candidateSlice";

export default function Filters() {
  const dispatch = useDispatch();

  return (
    <div className="filters">
      <input
        type="text"
        placeholder="🔍 Search by name..."
        onChange={(e) => dispatch(setSearch(e.target.value))}
        className="search-input"
      />

      <div className="filter-group">
        <label>Assignment Score ≥</label>
        <input
          type="number"
          min="0"
          max="100"
          placeholder="0"
          onChange={(e) =>
            dispatch(setFilters({ assignment: [Number(e.target.value), 100] }))
          }
        />
      </div>

      <div className="filter-group">
        <label>Video Score ≥</label>
        <input
          type="number"
          min="0"
          max="100"
          placeholder="0"
          onChange={(e) =>
            dispatch(setFilters({ video: [Number(e.target.value), 100] }))
          }
        />
      </div>

      <div className="filter-group">
        <label>ATS Score ≥</label>
        <input
          type="number"
          min="0"
          max="100"
          placeholder="0"
          onChange={(e) =>
            dispatch(setFilters({ ats: [Number(e.target.value), 100] }))
          }
        />
      </div>

      <div className="filter-group">
        <label>Status</label>
        <select
          onChange={(e) =>
            dispatch(setFilters({ status: e.target.value }))
          }
        >
          <option value="all">All Candidates</option>
          <option value="reviewed">Reviewed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Sort By</label>
        <select onChange={(e) => dispatch(setSortBy(e.target.value))}>
          <option value="priority">Priority (P0→P3)</option>
          <option value="assignment">Assignment Score</option>
          <option value="video">Video Score</option>
          <option value="ats">ATS Score</option>
        </select>
      </div>
    </div>
  );
}