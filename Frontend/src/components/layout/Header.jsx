import { useState, useRef, useEffect } from "react";
import logo from "../../assets/cuj-logo.png";
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../../api/notifications";

const SEARCHABLE_PAGES = [
  { key: "dashboard", label: "Dashboard", hint: "Overview & activity" },
  { key: "resources", label: "Resources", hint: "Notes, materials" },
  { key: "papers", label: "Papers & PYQ", hint: "Previous year questions" },
  { key: "community", label: "Community", hint: "Discussions, threads" },
  { key: "messages", label: "Messages", hint: "Chats & DMs" },
  { key: "projects", label: "Projects", hint: "Team projects" },
  { key: "doubts", label: "AI Doubts", hint: "Ask AI a question" },
  { key: "profile", label: "My Profile", hint: "Your profile & resume" },
];

function matches(text, q) {
  return text.toLowerCase().includes(q);
}

export default function Header({ onNavigate, onLogout, userRole, user }) {
  const [query, setQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const [notifications, setNotifications] =useState([]);
  const [loadingNotifications, setLoadingNotifications] =useState(false);

  const searchRef = useRef(null);
  const notifRef = useRef(null);
  const settingsRef = useRef(null);

  const q = query.trim().toLowerCase();

  const filteredPages = q
    ? SEARCHABLE_PAGES.filter((p) => matches(p.label, q) || matches(p.hint, q))
    : [];

  const filteredResources = q
    ? RESOURCES.filter(
        (r) => matches(r.title, q) || r.tags.some(([tag]) => matches(tag, q))
      ).slice(0, 4)
    : [];

  const filteredPapers = q
    ? PAPERS.filter(
        (p) => matches(p.name, q) || p.tags.some(([tag]) => matches(tag, q)) || matches(p.type, q)
      ).slice(0, 4)
    : [];

  const filteredProjects = q
    ? PROJECTS.filter(
        (p) => matches(p.name, q) || matches(p.desc, q) || p.tags.some((tag) => matches(tag, q)) || matches(p.type, q)
      ).slice(0, 4)
    : [];

  const hasAnyResults = filteredPages.length > 0 || filteredResources.length > 0 || filteredPapers.length > 0 || filteredProjects.length > 0;

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const fetchNotifications = async () => {
    try {
      setLoadingNotifications(true);

      const data = await getNotifications();

      setNotifications(data);
    } catch (err) {
      console.error(
        "Failed to fetch notifications:",
        err
      );
    } finally {
      setLoadingNotifications(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowSearchResults(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false);
      if (settingsRef.current && !settingsRef.current.contains(e.target)) setShowSettings(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goToPage = (key) => {
    onNavigate(key);
    setQuery("");
    setShowSearchResults(false);
  };

  const markAllRead = async () => {
    try {
      await markAllNotificationsAsRead();

      setNotifications((notifications) =>
        notifications.map((notification) => ({
          ...notification,
          read: true,
        }))
      );
    } catch (err) {
      console.error(
        "Failed to mark notifications as read:",
        err
      );
    }
  };

  const handleNotificationClick = async (
  notification
  ) => {
    try {

      if (!notification.read) {

        await markNotificationAsRead(
          notification._id
        );

        setNotifications((notifications) =>
          notifications.map((item) =>
            item._id === notification._id
              ? {
                  ...item,
                  read: true,
                }
              : item
          )
        );
      }

      // Navigate based on notification type
      if (
        notification.referenceType === "Resource"
      ) {
        onNavigate("resources");
      }

      if (
        notification.referenceType === "PYQ"
      ) {
        onNavigate("papers");
      }

    } catch (err) {
      console.error(
        "Failed to mark notification as read:",
        err
      );
    }
  };

  return (
    <header className="h-14 bg-gradient-to-r from-blue-700 via-blue-600 to-green-600 border-b-2 border-yellow-300 flex items-center px-5 gap-4 shrink-0 z-20 shadow-sm relative">

      {/* Logo + Brand */}
      <div className="flex items-center gap-2.5 whitespace-nowrap">
        <img src={logo} alt="CUJ" className="w-8 h-8 rounded-full object-cover ring-2 ring-yellow-300 bg-white/90 p-0.5" />
        <div>
          <div className="font-['Syne',sans-serif] text-sm font-bold text-white leading-none">Smart Student Platform</div>
          <div className="text-[10px] text-yellow-200 leading-none mt-0.5">CSE · Central University of Jharkhand</div>
        </div>
      </div>

      {/* Search */}
      <div ref={searchRef} className="flex-1 max-w-sm mx-5 relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-700/70 text-sm">🔍</span>
        <input
          value={query}
          onChange={(e) => { setQuery(e.target.value); setShowSearchResults(true); }}
          onFocus={() => query.trim() && setShowSearchResults(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && filteredPages.length > 0) goToPage(filteredPages[0].key);
            else if (e.key === "Enter" && filteredResources.length > 0) goToPage("resources");
            else if (e.key === "Enter" && filteredPapers.length > 0) goToPage("papers");
            else if (e.key === "Enter" && filteredProjects.length > 0) goToPage("projects");
            if (e.key === "Escape") setShowSearchResults(false);
          }}
          placeholder="Search notes, papers, threads…"
          className="w-full bg-white/95 border border-white/40 rounded-lg py-1.5 pl-8 pr-3 text-sm text-[#1a2540] placeholder-[#5a6a85] outline-none focus:border-yellow-300 focus:ring-2 focus:ring-yellow-300/40" />

        {showSearchResults && q && (
          <div className="absolute top-[calc(100%+6px)] left-0 right-0 bg-white rounded-lg shadow-2xl border border-black/5 overflow-hidden z-30 max-h-96 overflow-y-auto">
            {!hasAnyResults && (
              <div className="px-3.5 py-3 text-sm text-[#5a6a85]">
                No matches for "<span className="font-medium text-[#1a2540]">{query}</span>"
              </div>
            )}

            {filteredPages.length > 0 && (
              <div>
                <div className="px-3.5 pt-2.5 pb-1 text-[10px] font-semibold text-[#5a6a85] uppercase tracking-wide">Pages</div>
                {filteredPages.map((p) => (
                  <button key={p.key} onClick={() => goToPage(p.key)}
                    className="w-full text-left px-3.5 py-2 hover:bg-[#fbf7ec] flex items-center justify-between cursor-pointer bg-transparent border-0">
                    <span>
                      <span className="block text-sm font-medium text-[#1a2540]">{p.label}</span>
                      <span className="block text-[11px] text-[#5a6a85]">{p.hint}</span>
                    </span>
                  </button>
                ))}
              </div>
            )}

            {filteredResources.length > 0 && (
              <div className="border-t border-black/5">
                <div className="px-3.5 pt-2.5 pb-1 text-[10px] font-semibold text-[#5a6a85] uppercase tracking-wide">Resources</div>
                {filteredResources.map((r, i) => (
                  <button key={i} onClick={() => goToPage("resources")}
                    className="w-full text-left px-3.5 py-2 hover:bg-[#fbf7ec] flex items-center gap-2.5 cursor-pointer bg-transparent border-0">
                    <span className="text-base shrink-0">{r.icon}</span>
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-[#1a2540] truncate">{r.title}</span>
                      <span className="block text-[11px] text-[#5a6a85]">{r.meta}</span>
                    </span>
                  </button>
                ))}
              </div>
            )}

            {filteredPapers.length > 0 && (
              <div className="border-t border-black/5">
                <div className="px-3.5 pt-2.5 pb-1 text-[10px] font-semibold text-[#5a6a85] uppercase tracking-wide">Papers & PYQ</div>
                {filteredPapers.map((p, i) => (
                  <button key={i} onClick={() => goToPage("papers")}
                    className="w-full text-left px-3.5 py-2 hover:bg-[#fbf7ec] flex items-center gap-2.5 cursor-pointer bg-transparent border-0">
                    <span className="text-base shrink-0">📄</span>
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-[#1a2540] truncate">{p.name}</span>
                      <span className="block text-[11px] text-[#5a6a85]">{p.meta} · {p.type}</span>
                    </span>
                  </button>
                ))}
              </div>
            )}

            {filteredProjects.length > 0 && (
              <div className="border-t border-black/5">
                <div className="px-3.5 pt-2.5 pb-1 text-[10px] font-semibold text-[#5a6a85] uppercase tracking-wide">Projects</div>
                {filteredProjects.map((p, i) => (
                  <button key={i} onClick={() => goToPage("projects")}
                    className="w-full text-left px-3.5 py-2 hover:bg-[#fbf7ec] flex items-center gap-2.5 cursor-pointer bg-transparent border-0">
                    <span className="text-base shrink-0">{p.icon}</span>
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-[#1a2540] truncate">{p.name}</span>
                      <span className="block text-[11px] text-[#5a6a85]">{p.type} · {p.slots}</span>
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>


      {/* Right */}
      <div className="ml-auto flex items-center gap-2">

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => {
              setShowNotifications((v) => !v);
              setShowSettings(false);
            }}
            className="relative w-8 h-8 rounded-lg border border-white/30 text-white hover:bg-white/10 flex items-center justify-center bg-transparent cursor-pointer"
          >
            🔔
          
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-yellow-300 text-blue-900 text-[9px] font-bold flex items-center justify-center border-2 border-blue-600">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute top-[calc(100%+8px)] right-0 w-80 bg-white rounded-xl shadow-2xl border border-black/5 overflow-hidden z-30">
              <div className="flex items-center justify-between px-4 py-3 border-b border-black/5">
                <span className="text-sm font-semibold text-[#1a2540]">Notifications</span>
                {unreadCount > 0 && (
                  <button onClick={markAllRead}
                    className="text-[11px] text-blue-600 hover:text-blue-700 cursor-pointer bg-transparent border-0">
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-72 overflow-y-auto">

                {loadingNotifications ? (

  <div className="px-4 py-8 text-sm text-[#5a6a85] text-center">
    Loading notifications...
  </div>

) : notifications.length === 0 ? (

  <div className="px-4 py-8 text-sm text-[#5a6a85] text-center">
    You're all caught up ✨
  </div>

) : (

  <div className="p-2 space-y-1.5">

    {notifications.map((notification) => (

      <button
        key={notification._id}
        onClick={() =>
          handleNotificationClick(notification)
        }
        className={`group relative w-full text-left rounded-xl px-3 py-3
          flex gap-3 transition-all duration-200
          cursor-pointer border
          ${
            notification.read
              ? "bg-[#fbf7ec] border-transparent hover:bg-[#f5efdc]"
              : "bg-[#f1ead3] border-[#e5dbc0] hover:bg-[#ebe2c8] hover:border-[#d8cba8]"
          }
        `}
      >

        {/* Unread accent */}
        {!notification.read && (
          <div className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full bg-[#1a2540]" />
        )}

        {/* Notification icon */}
        <div
          className={`w-9 h-9 rounded-lg shrink-0 flex items-center justify-center text-sm
            ${
              notification.read
                ? "bg-[#f1ead3] text-[#5a6a85]"
                : "bg-[#e5dbc0] text-[#1a2540]"
            }
          `}
        >
          {notification.type === "resource_approved" && "📚"}

          {notification.type === "pyq_approved" && "📄"}

          {notification.type === "resource_deleted" && "🗑️"}

          {notification.type === "pyq_deleted" && "🗑️"}

          {notification.type === "project_join_request" && "👥"}

          {notification.type === "project_request_approved" && "✓"}

          {![
            "resource_approved",
            "pyq_approved",
            "resource_deleted",
            "pyq_deleted",
            "project_join_request",
            "project_request_approved",
          ].includes(notification.type) && "🔔"}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">

          <div className="flex items-start justify-between gap-2">

            <p
              className={`text-[13px] leading-snug ${
                notification.read
                  ? "font-medium text-[#1a2540]"
                  : "font-semibold text-[#1a2540]"
              }`}
            >
              {notification.title}
            </p>

            {/* Unread dot */}
            {!notification.read && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#1a2540] mt-1.5 shrink-0" />
            )}

          </div>

          <p
            className={`text-[11px] leading-relaxed mt-1 ${
              notification.read
                ? "text-[#6b7890]"
                : "text-[#4b5b73]"
            }`}
          >
            {notification.message}
          </p>

          <div className="flex items-center gap-2 mt-2">

            <span className="text-[10px] text-[#8791a1]">
              {new Date(
                notification.createdAt
              ).toLocaleString([], {
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>

            {!notification.read && (
              <>
                <span className="w-1 h-1 rounded-full bg-[#b9af95]" />

                <span className="text-[9px] font-semibold uppercase tracking-wide text-[#1a2540]">
                  New
                </span>
              </>
            )}

          </div>

        </div>

      </button>

    ))}

  </div>

)}

              </div>
            </div>
          )}
        </div>

        {/* Settings */}
        <div ref={settingsRef} className="relative">
          <button
            onClick={() => { setShowSettings((v) => !v); setShowNotifications(false); }}
            className="w-8 h-8 rounded-lg border border-white/30 text-white hover:bg-white/10 flex items-center justify-center bg-transparent cursor-pointer">
            ⚙️
          </button>

          {showSettings && (
            <div className="absolute top-[calc(100%+8px)] right-0 w-56 bg-white rounded-xl shadow-2xl border border-black/5 overflow-hidden z-30">
              <button onClick={() => { onNavigate("profile"); setShowSettings(false); }}
                className="w-full text-left px-4 py-2.5 text-sm text-[#1a2540] hover:bg-[#fbf7ec] cursor-pointer bg-transparent border-0">
                Edit profile
              </button>
              {userRole === "admin" && (
                <button onClick={() => { onNavigate("admin"); setShowSettings(false); }}
                  className="w-full text-left px-4 py-2.5 text-sm text-[#1a2540] hover:bg-[#fbf7ec] cursor-pointer bg-transparent border-0">
                  Admin panel
                </button>
              )}
              <button
                className="w-full text-left px-4 py-2.5 text-sm text-[#1a2540] hover:bg-[#fbf7ec] cursor-pointer bg-transparent border-0">
                Notification preferences
              </button>
                      <div className="border-t border-black/5" />
                      <button onClick={() => { onLogout(); setShowSettings(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 cursor-pointer bg-transparent border-0">
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
                
                <button
            onClick={() => onNavigate("profile")}
            className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white/40 border-0 cursor-pointer bg-white"
        >
            {user?.avatar ? (
                <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                />
            ) : (
                <div className="w-full h-full bg-gradient-to-br from-yellow-300 to-green-400 flex items-center justify-center text-xs font-bold text-blue-900">
                    {user?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase() || "U"}
                </div>
            )}
        </button>
        <button onClick={onLogout}
          className="text-xs text-yellow-200 hover:text-white transition-colors cursor-pointer bg-transparent border-0 ml-1">
          Sign out
        </button>
      </div>

    </header>
  );
}