import { useState } from "react";
import Login from "./components/pages/Login";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import Dashboard from "./components/pages/Dashboard";
import Resources from "./components/pages/Resources";
import Papers from "./components/pages/Papers";
import Community from "./components/pages/Community";
import Messages from "./components/pages/Messages";
import Projects from "./components/pages/Projects";
import AiDoubts from "./components/pages/AiDoubts";
import Profile from "./components/pages/Profile";
import Admin from "./components/pages/Admin";

const PAGES = {
  dashboard: Dashboard,
  resources: Resources,
  papers: Papers,
  community: Community,
  messages: Messages,
  projects: Projects,
  doubts: AiDoubts,
  profile: Profile,
  admin: Admin,
};

export default function App() {
  const [user, setUser] = useState(null); // null | "student" | "admin"
  const [page, setPage] = useState("dashboard");
  const Page = PAGES[page] || Dashboard;

  if (!user) {
    return (
      <Login
        onLogin={(role) => {
          setUser(role);
          setPage(role === "admin" ? "admin" : "dashboard");
        }}
      />
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#fbf7ec] text-[#1a2540] overflow-hidden">
      <Header
        onNavigate={setPage}
        onLogout={() => {
          setUser(null);
          setPage("dashboard");
        }}
        userRole={user}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activePage={page} onNavigate={setPage} userRole={user} />
        <main className="flex-1 overflow-y-auto">
          <Page onNavigate={setPage} userRole={user} />
        </main>
      </div>
    </div>
  );
}