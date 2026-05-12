 Candidate Dashboard
A modern application and this application desgined by user.

 Features
- Candidate List View - Browse all candidates with quick overview information
- Advanced Filtering - Filter candidates by priority, status, and other criteria
- Candidate Comparison - Compare multiple candidates side-by-side
- Detailed View - Access detailed candidate information through a drawer panel
- Summary Statistics - View dashboard summary and candidate statistics
- Video Integration - View candidate interview videos
- Assignment Management- Track and manage candidate assignments

Tech Stack

- React 19 - UI framework
- Vite - Build tool with HMR support
- Redux Toolkit - State management
- React Redux - React bindings for Redux
- ESLint - Code quality and consistency

 Project Structure

```
src/
├── components/
│   ├── dashboard/        # Main dashboard components
│   │   ├── CandidateDrawer.jsx
│   │   ├── CandidateList.jsx
│   │   ├── CandidateRow.jsx
│   │   ├── ComparisonPanel.jsx
│   │   ├── Filters.jsx
│   │   └── Summary.jsx
│   └── drawer/           # Drawer panel components
│       ├── AssignmentPanel.jsx
│       └── VideoPanel.jsx
├── pages/
│   └── Dashboard.jsx     # Main dashboard page
├── store/
│   ├── candidateSlice.js # Redux candidate slice
│   └── store.js          # Redux store configuration
├── data/
│   └── mockData.js       # Mock candidate data
├── utils/
│   └── priority.js       # Priority utilities
└── App.jsx               # Main app component
```

 Getting Started

 Prerequisites

- Node.js 16+ 
- npm or yarn

 Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
 Development

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

 Build

Create a production build:

```bash
npm run build
```

 Preview

Preview the production build locally:

```bash
npm run preview
```

 Linting

Check code quality with ESLint:

```bash
npm run lint
```

Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

 Development Notes

- Hot Module Replacement (HMR) is enabled for fast development experience
- Redux DevTools integration available through Redux Toolkit
- Mock data used for demonstration - replace with API calls as needed

 License

MIT
