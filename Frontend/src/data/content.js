export const RESOURCES = [
  { title: "Data Structures — Complete Notes", meta: "Sem 5 · DS · 4.2 MB", tags: [["Trees","blue"],["Graphs","purple"],["DP","teal"]], contributor: "RK", contribName: "Rahul K.", downloads: 142, bg: "bg-red-500/10", color: "text-red-400", icon: "📄" },
  { title: "OS — Process Management Unit 4", meta: "Sem 5 · OS · 2.8 MB", tags: [["Scheduling","green"],["Deadlock","amber"]], contributor: "SM", contribName: "Sneha M.", downloads: 98, bg: "bg-emerald-500/10", color: "text-emerald-400", icon: "📄" },
  { title: "DBMS — Normalization & SQL Queries", meta: "Sem 5 · DBMS · 1.9 MB", tags: [["1NF–BCNF","purple"],["SQL","teal"]], contributor: "AJ", contribName: "Arjun J.", downloads: 76, bg: "bg-violet-500/10", color: "text-violet-400", icon: "📊" },
  { title: "CN — TCP/IP & Routing Protocols", meta: "Sem 5 · CN · 3.1 MB", tags: [["TCP","teal"],["Routing","blue"]], contributor: "PD", contribName: "Priya D.", downloads: 64, bg: "bg-teal-500/10", color: "text-teal-400", icon: "💻" },
  { title: "DS Lab Manual — All Experiments", meta: "Sem 5 · DS Lab · 5.4 MB", tags: [["Lab","amber"],["C++","gray"]], contributor: "NK", contribName: "Nikhil K.", downloads: 53, bg: "bg-amber-500/10", color: "text-amber-400", icon: "⚙️" },
];

export const PAPERS = [
  { name: "Data Structures — End Sem 2024", meta: "AKTU · Sem 5 · Dec 2024", type: "End-sem", typeColor: "blue", tags: [["DP","teal"],["Trees","purple"],["Graphs","blue"]] },
  { name: "OS — End Sem 2024", meta: "AKTU · Sem 5 · Dec 2024", type: "End-sem", typeColor: "blue", tags: [["Scheduling","green"],["Deadlock","amber"]] },
  { name: "DBMS — Mid Sem 2024", meta: "AKTU · Sem 5 · Sep 2024", type: "Mid-sem", typeColor: "purple", tags: [["SQL","purple"],["ER Diagram","teal"]] },
  { name: "Data Structures — End Sem 2023", meta: "AKTU · Sem 5 · Dec 2023", type: "End-sem", typeColor: "blue", tags: [["Hashing","teal"],["Sorting","blue"]] },
  { name: "CN — Viva Questions Bank 2024", meta: "Dept. · Sem 5 · Jan 2024", type: "Viva", typeColor: "amber", tags: [["OSI Model","amber"],["TCP/IP","green"]] },
];

export const PROJECTS = [
  {
    type: "Hackathon", typeColor: "amber", icon: "🏆",
    status: "open", slots: "2 slots open", slotColor: "green",
    name: "Smart Traffic Controller · HackBIT 2025",
    desc: "Adaptive signal control using real-time vehicle detection. Need backend dev + ML person.",
    tags: ["Python", "OpenCV", "Flask", "IoT"],
    members: [{ i: "RK", c: 0 }, { i: "AJ", c: 2 }], memberCount: "2 members · needs 2",
  },
  {
    type: "Side project", typeColor: "blue", icon: "💻",
    status: "open", slots: "1 slot open", slotColor: "green",
    name: "Campus Lost & Found App",
    desc: "Mobile app to report and claim lost items on campus. Looking for React Native developer.",
    tags: ["React Native", "Firebase", "Node.js"],
    members: [{ i: "SM", c: 1 }, { i: "PD", c: 4 }, { i: "NK", c: 5 }], memberCount: "3 members · needs 1",
  },
  {
    type: "Hackathon", typeColor: "amber", icon: "🏆",
    status: "full", slots: "Team full", slotColor: "red",
    name: "AI Resume Screener · SIH 2025",
    desc: "NLP-based resume parser that scores and ranks applicants against job descriptions.",
    tags: ["Python", "BERT", "FastAPI", "React"],
    members: [{ i: "RK", c: 0 }, { i: "SM", c: 1 }, { i: "AJ", c: 2 }, { i: "PD", c: 4 }], memberCount: "4/4 members",
  },
  {
    type: "Research", typeColor: "teal", icon: "🔬",
    status: "open", slots: "2 slots open", slotColor: "green",
    name: "Federated Learning for IoT Security",
    desc: "Research on privacy-preserving ML for edge devices. Publication target: IEEE.",
    tags: ["Python", "TensorFlow", "Raspberry Pi"],
    members: [{ i: "NK", c: 5 }], memberCount: "1 member · needs 2",
  },
  {
    type: "Side project", typeColor: "blue", icon: "💻",
    status: "open", slots: "1 slot open", slotColor: "green",
    name: "Smart Attendance via Face Recognition",
    desc: "Automated attendance using facial recognition via classroom webcam.",
    tags: ["OpenCV", "Python", "MongoDB"],
    members: [{ i: "AJ", c: 2 }, { i: "RK", c: 0 }], memberCount: "2 members · needs 1",
  },
];