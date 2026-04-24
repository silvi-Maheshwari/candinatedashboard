import CandidateDrawer from "../components/dashboard/CandidateDrawer";
import CandidateList from "../components/dashboard/CandidateList";
import ComparisonPanel from "../components/dashboard/ComparisonPanel";
import Filters from "../components/dashboard/Filters";
import Summary from "../components/dashboard/Summary";


export default function Dashboard() {
  return (
    <div className="container">
      <h1>🎯 Candidate Dashboard</h1>
      <Summary/>
      <Filters/>
      <ComparisonPanel/>
      <CandidateList/>
      <CandidateDrawer/>
    </div>
  );
}