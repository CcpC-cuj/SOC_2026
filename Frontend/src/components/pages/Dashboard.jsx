import { Card, StatCard, Pill, Btn, SectionTitle, PageWrap } from "../ui";
import { useEffect, useState } from "react";
import { getDashboard } from "../../api/dashboard";
import logo from "../../assets/cuj-logo.png";

export default function Dashboard({ onNavigate }) {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const hour = new Date().getHours();

  let greeting = "Hello";

  if (hour >= 5 && hour < 12) {
    greeting = "Good Morning";
  } else if (hour >= 12 && hour < 17) {
    greeting = "Good Afternoon";
  } else if (hour >= 17 && hour < 21) {
    greeting = "Good Evening";
  } else {
    greeting = "Good Night";
  }

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboard();
        setDashboard(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <PageWrap>

      {/* Welcome banner */}
      <div className="relative bg-[#ece4c8] border border-white/[0.07] rounded-2xl px-6 py-5 mb-5 flex items-center gap-5 overflow-hidden">

        <div className="absolute right-0 top-0 w-48 h-48 rounded-full bg-blue-500/5 -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-32 h-32 rounded-full bg-yellow-500/3 translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <img
          src={logo}
          alt="CUJ"
          className="w-12 h-12 rounded-full object-cover border-2 border-yellow-500/30 shrink-0"
        />

        <div>
          <div className="text-[10px] text-yellow-400/70 font-medium uppercase tracking-wider mb-0.5">
            Central University of Jharkhand · CSE
          </div>

          <h2 className="font-['Syne',sans-serif] text-lg font-bold">
            {greeting}, {user.name || "Student"} 👋
          </h2>

          <p className="text-sm text-[#5a6a85] mt-0.5">
            Semester {user.semester || "-"}
          </p>
        </div>

        <div className="ml-auto flex gap-2">
          <Btn
            size="sm"
            onClick={() => onNavigate("resources")}
          >
            ⬆️ Upload note
          </Btn>

          <Btn
            variant="ghost"
            size="sm"
            onClick={() => onNavigate("doubts")}
          >
            Ask AI doubt
          </Btn>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2.5 mb-5">
        <StatCard
          value={dashboard?.stats.totalUploads ?? 0}
          label="Resources uploaded"
        />
          
        <StatCard
          value={dashboard?.stats.approvedUploads ?? 0}
          label="Approved"
        />
          
        <StatCard
          value={dashboard?.stats.pendingUploads ?? 0}
          label="Pending Approval"
        />
        <StatCard value={dashboard?.profile.contributionScore?? 0} label="Contribution pts" delta="★" deltaColor="text-amber-400" />
      </div>

      {/* Content */}
      <div className="grid grid-cols-2 gap-3">

        <Card>
          <SectionTitle>Recent activity</SectionTitle>

          {dashboard?.recentUploads?.length ? (
            dashboard.recentUploads.map((resource) => (
              <div
                key={resource._id}
                className="flex items-start gap-2.5 py-2.5 border-b border-white/[0.07] last:border-0"
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm shrink-0 bg-blue-500/10">
                  📄
                </div>

                <div className="flex-1">
                  <div className="text-sm leading-snug">
                    You uploaded <strong>{resource.title}</strong>
                  </div>

                  <div className="text-[11px] text-[#5a6a85] mt-0.5">
                    {new Date(resource.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <Pill color={resource.approved ? "green" : "amber"}>
                  {resource.approved ? "Approved" : "Pending"}
                </Pill>
              </div>
            ))
          ) : (
            <div className="text-sm text-[#5a6a85] py-4">
              No recent uploads.
            </div>
          )}
        </Card>

        <Card>
          <SectionTitle>Trending in community</SectionTitle>
          {
            dashboard?.recentPosts?.map((post) => (
              <div
                  key={post._id}
                  className="flex items-center gap-2.5 py-2.5 border-b border-white/[0.07]"
              >
                  <div className="flex-1">
                      <div className="text-sm font-medium">
                          {post.title}
                      </div>
                      
                      <div className="mt-1 flex gap-2 items-center">
                          <Pill color="blue">
                              {post.subject}
                          </Pill>
                      
                          <span className="text-xs text-[#5a6a85]">
                              by {post.author.name}
                          </span>
                      </div>
                  </div>
                      
                  <span className="text-xs text-emerald-500">
                      👍 {post.likesCount}
                  </span>
              </div>
          ))
          }
          
        </Card>

      </div>

    </PageWrap>
  );
}