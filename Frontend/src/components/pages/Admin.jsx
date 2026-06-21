import { useState } from "react";
import { Card, Pill, Btn, SectionTitle, StatCard, TabBar, PageWrap } from "../ui";

const PENDING = [
  { title: "DBMS Complete Notes Unit 5", by: "Rahul K.", subject: "DBMS", subjectColor: "purple", type: "Notes", date: "Today" },
  { title: "ML Lab Manual — All 12 Experiments", by: "Sneha M.", subject: "ML", subjectColor: "teal", type: "Lab", date: "Today" },
  { title: "OS Mid Sem 2023 Question Paper", by: "Arjun J.", subject: "OS", subjectColor: "green", type: "PYQ", date: "Yesterday" },
];

const UPLOAD_BARS = [40, 55, 35, 80, 65, 90, 70];
const DAYS = ["M","T","W","T","F","S","S"];
const DOUBT_BARS = [90, 70, 55, 40, 30];
const SUBJECTS = ["DS","OS","DBMS","CN","ML"];

export default function Admin() {
  const [tab, setTab] = useState("Resources (8)");
  const [dismissed, setDismissed] = useState({});

  return (
    <PageWrap title="Admin Dashboard" subtitle="Moderate content, manage users, view analytics">
      <div className="grid grid-cols-4 gap-2.5 mb-5">
        <StatCard value="12" label="Pending approvals" delta="Needs review" deltaColor="text-amber-400" />
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

      {/* Pending approvals */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <SectionTitle>Pending approvals</SectionTitle>
          <TabBar
            tabs={["Resources (8)", "Papers (3)", "Projects (1)"]}
            active={tab}
            onChange={setTab}
          />
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {["Title","Uploaded by","Subject","Type","Date","Actions"].map((h) => (
                <th key={h} className="text-[11px] font-semibold text-[#5a6a85] uppercase tracking-wider pb-2 border-b border-black/10 text-left px-2 first:pl-0">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PENDING.filter((_, i) => !dismissed[i]).map((row, i) => (
              <tr key={i} className="border-b border-black/10 last:border-0 hover:bg-white/3 transition-colors">
                <td className="py-2.5 px-2 pl-0 text-sm text-[#1a2540]">{row.title}</td>
                <td className="py-2.5 px-2 text-sm text-[#5a6a85]">{row.by}</td>
                <td className="py-2.5 px-2"><Pill color={row.subjectColor} className="text-[10px]">{row.subject}</Pill></td>
                <td className="py-2.5 px-2 text-sm text-[#5a6a85]">{row.type}</td>
                <td className="py-2.5 px-2 text-sm text-[#5a6a85]">{row.date}</td>
                <td className="py-2.5 px-2">
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setDismissed((d) => ({ ...d, [i]: true }))}
                      className="text-xs px-2.5 py-1 rounded-lg border border-emerald-500/30 text-emerald-400 bg-transparent hover:bg-emerald-500/10 transition-colors cursor-pointer"
                    >
                      ✓ Approve
                    </button>
                    <button
                      onClick={() => setDismissed((d) => ({ ...d, [i]: true }))}
                      className="text-xs px-2.5 py-1 rounded-lg border border-red-500/30 text-red-400 bg-transparent hover:bg-red-500/10 transition-colors cursor-pointer"
                    >
                      ✕ Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {Object.keys(dismissed).length === PENDING.length && (
              <tr><td colSpan={6} className="py-6 text-center text-sm text-[#5a6a85]">All caught up! No pending approvals.</td></tr>
            )}
          </tbody>
        </table>
      </Card>
    </PageWrap>
  );
}
