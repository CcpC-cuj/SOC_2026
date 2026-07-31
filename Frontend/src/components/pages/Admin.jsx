import { useEffect, useState } from "react";
import { Card, Pill, Btn, SectionTitle, StatCard, TabBar, PageWrap } from "../ui";
import { getPendingResources, approveResource, deleteResource } from "../../api/resources";
import { getPendingPyqs, approvePyq, deletePyq } from "../../api/pyq";

const STUDENTS = [
  { name: "Aryan Kumar", rollno: "23CUCSE001", sem: "5", resume: { fileName: "Aryan_Kumar_Resume.pdf", uploaded: "12 Jul 2026", size: "412 KB" } },
  { name: "Rahul Kumar", rollno: "23CUCSE014", sem: "5", resume: { fileName: "Rahul_K_CV.pdf", uploaded: "08 Jul 2026", size: "380 KB" } },
  { name: "Sneha Mehta", rollno: "23CUCSE022", sem: "5", resume: { fileName: "Sneha_Mehta_Resume.docx", uploaded: "02 Jul 2026", size: "290 KB" } },
  { name: "Arjun Jha", rollno: "23CUCSE009", sem: "5", resume: null },
  { name: "Priya Das", rollno: "23CUCSE031", sem: "5", resume: { fileName: "Priya_Das_Resume.pdf", uploaded: "15 Jun 2026", size: "455 KB" } },
  { name: "Nikhil Kujur", rollno: "22CUCSE045", sem: "7", resume: null },
];

const UPLOAD_BARS = [40, 55, 35, 80, 65, 90, 70];
const DAYS = ["M","T","W","T","F","S","S"];
const DOUBT_BARS = [90, 70, 55, 40, 30];
const SUBJECTS = ["DS","OS","DBMS","CN","ML"];

// Fallback colors for subjects not explicitly mapped
const SUBJECT_COLORS = { DBMS: "purple", ML: "teal", OS: "green", DS: "blue", CN: "amber" };
const subjectColor = (subject) => SUBJECT_COLORS[subject] || "gray";

function ResumeSection() {
  const [query, setQuery] = useState("");
  const [semFilter, setSemFilter] = useState("All");

  const sems = ["All", ...Array.from({ length: 10 }, (_, i) => String(i + 1))];

  const filtered = STUDENTS.filter((s) => {
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || s.name.toLowerCase().includes(q) || s.rollno.toLowerCase().includes(q);
    const matchesSem = semFilter === "All" || s.sem === semFilter;
    return matchesQuery && matchesSem;
  });

  const uploadedCount = STUDENTS.filter((s) => s.resume).length;

  return (
    <Card>
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <SectionTitle>Student resumes ({uploadedCount}/{STUDENTS.length} uploaded)</SectionTitle>
        <div className="flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="🔍 Search name or roll no…"
            className="bg-[#ece4c8] border border-black/10 rounded-lg px-3 py-1.5 text-xs text-[#1a2540] placeholder-[#5a6a85] outline-none focus:border-blue-400 transition-colors w-56"
          />
          <select value={semFilter} onChange={(e) => setSemFilter(e.target.value)}
            className="bg-[#ece4c8] border border-black/10 rounded-lg px-2.5 py-1.5 text-xs text-[#1a2540] outline-none cursor-pointer">
            {sems.map((s) => <option key={s} value={s}>{s === "All" ? "All semesters" : `Sem ${s}`}</option>)}
          </select>
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            {["Student","Roll no","Sem","Resume","Actions"].map((h) => (
              <th key={h} className="text-[11px] font-semibold text-[#5a6a85] uppercase tracking-wider pb-2 border-b border-black/10 text-left px-2 first:pl-0">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map((s) => (
            <tr key={s.rollno} className="border-b border-black/10 last:border-0 hover:bg-white/3 transition-colors">
              <td className="py-2.5 px-2 pl-0 text-sm text-[#1a2540] font-medium">{s.name}</td>
              <td className="py-2.5 px-2 text-sm text-[#5a6a85]">{s.rollno}</td>
              <td className="py-2.5 px-2 text-sm text-[#5a6a85]">{s.sem}</td>
              <td className="py-2.5 px-2">
                {s.resume ? (
                  <div className="text-xs">
                    <span className="text-[#1a2540]">{s.resume.fileName}</span>
                    <span className="text-[#5a6a85]"> · {s.resume.size} · {s.resume.uploaded}</span>
                  </div>
                ) : (
                  <Pill color="gray" className="text-[10px]">No resume uploaded</Pill>
                )}
              </td>
              <td className="py-2.5 px-2">
                {s.resume ? (
                  <div className="flex gap-1.5">
                    <button className="text-xs px-2.5 py-1 rounded-lg border border-blue-400/30 text-blue-500 bg-transparent hover:bg-blue-500/10 transition-colors cursor-pointer">
                      👁️ Preview
                    </button>
                    <button className="text-xs px-2.5 py-1 rounded-lg border border-emerald-500/30 text-emerald-500 bg-transparent hover:bg-emerald-500/10 transition-colors cursor-pointer">
                      ⬇️ Download
                    </button>
                  </div>
                ) : (
                  <span className="text-xs text-[#5a6a85]">—</span>
                )}
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr><td colSpan={5} className="py-6 text-center text-sm text-[#5a6a85]">No students match your search.</td></tr>
          )}
        </tbody>
      </table>
    </Card>
  );
}

export default function Admin() {
  const [resourceItems, setResourceItems] = useState([]);
  const [pyqItems, setPyqItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);   // id currently being approved/rejected

  const [tab, setTab] = useState("Resources"); // "Resources" | "Papers & PYQ"

  const fetchPending = async () => {
    setLoading(true);
    setError("");
    try {
      const [resources, pyqs] = await Promise.all([
        getPendingResources(),
        getPendingPyqs(),
      ]);
      setResourceItems((resources || []).map((r) => ({ ...r, _source: "resource" })));
      setPyqItems((pyqs || []).map((p) => ({ ...p, _source: "pyq" })));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load pending items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleApprove = async (row) => {
    setBusyId(row._id);
    try {
      if (row._source === "pyq") {
        await approvePyq(row._id);
        setPyqItems((prev) => prev.filter((r) => r._id !== row._id));
      } else {
        await approveResource(row._id);
        setResourceItems((prev) => prev.filter((r) => r._id !== row._id));
      }
    } catch (err) {
      setError(err.response?.data?.message || "Approve failed. Try again.");
    } finally {
      setBusyId(null);
    }
  };

  const handleReject = async (row) => {
    setBusyId(row._id);
    try {
      if (row._source === "pyq") {
        await deletePyq(row._id);
        setPyqItems((prev) => prev.filter((r) => r._id !== row._id));
      } else {
        await deleteResource(row._id);
        setResourceItems((prev) => prev.filter((r) => r._id !== row._id));
      }
    } catch (err) {
      setError(err.response?.data?.message || "Reject failed. Try again.");
    } finally {
      setBusyId(null);
    }
  };

  const visibleRows = tab === "Papers & PYQ" ? pyqItems : resourceItems;
  const totalPending = resourceItems.length + pyqItems.length;

  return (
    <PageWrap title="Admin Dashboard" subtitle="Moderate content, manage users, view analytics">
      <div className="grid grid-cols-4 gap-2.5 mb-5">
        <StatCard value={totalPending} label="Pending approvals" delta="Needs review" deltaColor="text-amber-400" />
        <StatCard value="847" label="Total users" delta="↑ 23 this week" />
        <StatCard value="1.2k" label="Resources uploaded" delta="↑ 47 this month" deltaColor="text-blue-400" />
        <StatCard value="289" label="AI doubts today" delta="DS most queried" />
      </div>

      {/* Analytics charts */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <Card>
          <SectionTitle>Upload activity (last 7 days)</SectionTitle>
          <div className="flex items-end gap-1 h-20 mt-2">
            {UPLOAD_BARS.map((h, i) => (
              <div key={i} className="flex-1 rounded-sm rounded-t" style={{ height: `${h}%`, background: `rgba(79,142,247,${0.3 + h / 200})` }} />
            ))}
          </div>
          <div className="flex gap-1 mt-1">
            {DAYS.map((d) => <span key={d} className="flex-1 text-center text-[9px] text-[#5a6a85]">{d}</span>)}
          </div>
        </Card>
        <Card>
          <SectionTitle>AI doubts by subject</SectionTitle>
          <div className="flex items-end gap-1 h-20 mt-2">
            {DOUBT_BARS.map((h, i) => (
              <div key={i} className="flex-1 rounded-sm rounded-t" style={{ height: `${h}%`, background: `rgba(124,90,245,${0.3 + h / 200})` }} />
            ))}
          </div>
          <div className="flex gap-1 mt-1">
            {SUBJECTS.map((s) => <span key={s} className="flex-1 text-center text-[9px] text-[#5a6a85]">{s}</span>)}
          </div>
        </Card>
      </div>

      {/* Pending approvals — live */}
      <Card className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <SectionTitle>Pending approvals</SectionTitle>
          <TabBar
            tabs={[`Resources (${resourceItems.length})`, `Papers & PYQ (${pyqItems.length})`]}
            active={tab === "Papers & PYQ" ? `Papers & PYQ (${pyqItems.length})` : `Resources (${resourceItems.length})`}
            onChange={(t) => setTab(t.startsWith("Papers") ? "Papers & PYQ" : "Resources")}
          />
        </div>

        {error && (
          <div className="mb-3 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 text-xs text-red-400">{error}</div>
        )}

        {loading ? (
          <div className="py-6 text-center text-sm text-[#5a6a85]">Loading pending items…</div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {["Title","Uploaded by","Subject","Type","Date","Actions"].map((h) => (
                  <th key={h} className="text-[11px] font-semibold text-[#5a6a85] uppercase tracking-wider pb-2 border-b border-black/10 text-left px-2 first:pl-0">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row) => (
                <tr key={row._id} className="border-b border-black/10 last:border-0 hover:bg-white/3 transition-colors">
                  <td className="py-2.5 px-2 pl-0 text-sm text-[#1a2540]">{row.title}</td>
                  <td className="py-2.5 px-2 text-sm text-[#5a6a85]">{row.uploadedBy?.name || row.uploadedBy || "—"}</td>
                  <td className="py-2.5 px-2"><Pill color={subjectColor(row.subject)} className="text-[10px]">{row.subject}</Pill></td>
                  <td className="py-2.5 px-2 text-sm text-[#5a6a85]">{row.type}</td>
                  <td className="py-2.5 px-2 text-sm text-[#5a6a85]">
                    {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "—"}
                  </td>
                  <td className="py-2.5 px-2">
                    <div className="flex gap-1.5">
                      <button
                        disabled={busyId === row._id}
                        onClick={() => handleApprove(row)}
                        className="text-xs px-2.5 py-1 rounded-lg border border-emerald-500/30 text-emerald-400 bg-transparent hover:bg-emerald-500/10 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {busyId === row._id ? "…" : "✓ Approve"}
                      </button>
                      <button
                        disabled={busyId === row._id}
                        onClick={() => handleReject(row)}
                        className="text-xs px-2.5 py-1 rounded-lg border border-red-500/30 text-red-400 bg-transparent hover:bg-red-500/10 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {busyId === row._id ? "…" : "✕ Reject"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {visibleRows.length === 0 && (
                <tr><td colSpan={6} className="py-6 text-center text-sm text-[#5a6a85]">All caught up! No pending {tab === "Papers & PYQ" ? "papers" : "resources"}.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </Card>

      {/* Student resumes — still static, wire up separately when resume endpoint is ready */}
      <ResumeSection />
    </PageWrap>
  );
}