import WelcomeBoard from "../WelcomeBoard/WelcomeBoard";
import StatsBoard from "../StatsBoard/StatsBoard";
import GraphBoard from "../GraphBoard/GraphBoard";
import DashboardNavbar from "../DashboardNavbar/DashboardNavbar";

import "./Dashboard.css";

const Dashboard = ({ openDrawer }) => {
  return (
    <div
      className={
        openDrawer ? "small-dashboard" : "large-dashboard"
      }
    >
      <DashboardNavbar />
      <WelcomeBoard />
      <StatsBoard />
      <GraphBoard />
    </div>
  );
};

export default Dashboard;
