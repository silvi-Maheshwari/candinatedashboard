import { createSlice } from "@reduxjs/toolkit";
import { mockData } from "../data/mockData";

// Load candidates from localStorage or use mockData
const loadCandidatesFromStorage = () => {
  try {
    const stored = localStorage.getItem("candidates");
    return stored ? JSON.parse(stored) : mockData;
  } catch (e) {
    console.warn("Failed to load from localStorage:", e);
    return mockData;
  }
};

// Save candidates to localStorage
const saveCandidatesToStorage = (candidates) => {
  try {
    localStorage.setItem("candidates", JSON.stringify(candidates));
  } catch (e) {
    console.warn("Failed to save to localStorage:", e);
  }
};

const slice = createSlice({
  name: "candidates",
  initialState: {
    list: loadCandidatesFromStorage(),
    selected: null,
    compare: [],
    filters: {
      search: "",
      assignment: [0, 100],
      video: [0, 100],
      ats: [0, 100],
      status: "all"
    },
    sortBy: "priority" // priority, assignment, video, ats
  },

  reducers: {
    // select candidate
    selectCandidate: (state, action) => {
      state.selected = action.payload;
    },

    // update main score
    updateScore: (state, action) => {
      const { id, field, value } = action.payload;
      const c = state.list.find((c) => c.id === id);
      if (c) {
        c[field] = value;
        c.reviewed = true;
        saveCandidatesToStorage(state.list);
      }
    },

    // update evaluation fields
    updateEvaluation: (state, action) => {
      const { id, field, value } = action.payload;
      const c = state.list.find((c) => c.id === id);
      if (c) {
        c[field] = value;
        c.reviewed = true;
        saveCandidatesToStorage(state.list);
      }
    },

    // toggle shortlist
    toggleShortlist: (state, action) => {
      const id = action.payload;
      const c = state.list.find((c) => c.id === id);
      if (c) {
        c.shortlisted = !c.shortlisted;
        c.rejected = false; // Clear reject when shortlisting
        saveCandidatesToStorage(state.list);
      }
    },

    // toggle reject
    toggleReject: (state, action) => {
      const id = action.payload;
      const c = state.list.find((c) => c.id === id);
      if (c) {
        c.rejected = !c.rejected;
        c.shortlisted = false; // Clear shortlist when rejecting
        saveCandidatesToStorage(state.list);
      }
    },

    // compare feature
    toggleCompare: (state, action) => {
      const id = action.payload;

      if (state.compare.includes(id)) {
        state.compare = state.compare.filter((c) => c !== id);
      } else if (state.compare.length < 3) {
        state.compare.push(id);
      }
    },

    // search
    setSearch: (state, action) => {
      state.filters.search = action.payload;
    },

    // filters
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    // sort
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    }
  }
});

export const {
  selectCandidate,
  updateScore,
  updateEvaluation,
  toggleShortlist,
  toggleReject,
  toggleCompare,
  setSearch,
  setFilters,
  setSortBy
} = slice.actions;

export default slice.reducer;