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

// Pages admins are not allowed to land on — they get redirected to Admin instead.
const ADMIN_BLOCKED_PAGES = ["dashboard", "projects"];

function getSavedUser() {
  const savedUser = localStorage.getItem("user");
  return savedUser ? JSON.parse(savedUser) : null;
}

export default function App() {

  const [user, setUser] = useState(() => getSavedUser());

  const [page, setPage] = useState(() => {
    const savedUser = getSavedUser();
    return savedUser?.role === "admin" ? "admin" : "dashboard";
  });

  const isAdmin = user?.role === "admin";

  // If an admin somehow lands on a blocked page (e.g. stale link), fall back to Admin.
  const effectivePage = isAdmin && ADMIN_BLOCKED_PAGES.includes(page) ? "admin" : page;
  const Page = PAGES[effectivePage] || Dashboard;

  if (!user) {
    return (
      <Login
        onLogin={() => {
          const savedUser = getSavedUser();

          setUser(savedUser);
          setPage(savedUser.role === "admin" ? "admin" : "dashboard");
        }}
      />
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#fbf7ec] text-[#1a2540] overflow-hidden">
      <Header
        onNavigate={setPage}
        onLogout={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          setUser(null);
          setPage("dashboard");
        }}
        userRole={user.role}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activePage={effectivePage} onNavigate={setPage} userRole={user.role} />
        <main className="flex-1 overflow-y-auto">
          <Page
            onNavigate={setPage}
            userRole={user.role}
            user={user}
          />
        </main>
      </div>
    </div>
  );
}