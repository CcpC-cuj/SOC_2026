import { useState, useEffect } from "react";
import { Pill, Btn, FilterChips, PageWrap } from "../ui";
import { getResources } from "../../api/resources";
import UploadResourceModal from "../UploadResourceModal";

const SEM_FILTERS = ["All", "Sem 3", "Sem 4", "Sem 5", "Sem 6"];
const TYPE_FILTERS = ["All", "Notes", "Assignment", "Lab", "Tutorial"];

export default function Resources({ onNavigate }) {
  const [semFilter, setSemFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);

  const fetchResources = async () => {
    try {
      setLoading(true);
      setError("");

      const params = {};

      if (search.trim()) {
        params.search = search;
      }

      if (semFilter !== "All") {
        params.semester = Number(
          semFilter.replace("Sem ", "")
        );
      }

      if (typeFilter !== "All") {
        params.resourceType = typeFilter.toLowerCase();
      }

      const data = await getResources(params);

      setResources(data.resources || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load resources");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchResources();
    }, 500);

    return () => clearTimeout(timer);
  }, [search, semFilter, typeFilter]);

  return (
    <PageWrap
      title="Notes & Resources"
      subtitle="Semester-wise academic materials shared by students"
      action={
        <Btn onClick={() => setShowUploadModal(true)}>
          ⬆️ Upload
        </Btn>
      }
    >
      {/* Search */}
      <div className="flex gap-2.5 mb-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search notes, subjects..."
          className="bg-[#ece4c8] border border-black/10 rounded-lg px-3 py-2 text-sm text-[#1a2540] placeholder-[#5a6a85] outline-none focus:border-white/20 transition-colors w-72"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap mb-4">
        <FilterChips
          chips={SEM_FILTERS}
          active={semFilter}
          onChange={setSemFilter}
        />

        <div className="w-px h-4 bg-white/10" />

        <FilterChips
          chips={TYPE_FILTERS}
          active={typeFilter}
          onChange={setTypeFilter}
        />
      </div>

      {/* Resources */}
<div className="relative">
  {loading && (
    <div className="absolute right-2 -top-8 text-xs text-[#5a6a85]">
      Searching...
    </div>
  )}

  <div className="grid grid-cols-3 gap-3">
    {!loading && error ? (
      <div className="col-span-3 text-center py-10 text-red-500">
        {error}
      </div>
    ) : resources.length === 0 && !loading ? (
      <div className="col-span-3 text-center py-10 text-[#5a6a85]">
        No resources available.
      </div>
    ) : (
      <>
        {resources.map((resource) => (
          <div
            key={resource._id}
            onClick={() => window.open(resource.fileUrl, "_blank")}
            className="bg-[#f5efdc] border border-black/10 rounded-xl p-3.5 hover:border-white/15 transition-colors cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg mb-2.5 bg-blue-100">
              📄
            </div>

            <div className="text-sm font-medium text-[#1a2540] mb-1 leading-snug">
              {resource.title}
            </div>

            <div className="text-[11px] text-[#5a6a85] mb-2">
              {resource.subject}
            </div>

            <div className="flex gap-1 flex-wrap mb-2.5">
              <Pill color="blue">
                Sem {resource.semester}
              </Pill>

              <Pill color="green">
                {resource.resourceType}
              </Pill>
            </div>

            <div className="flex items-center gap-2 pt-2.5 border-t border-black/10">
              <div className="text-[11px] text-[#5a6a85]">
                {resource.faculty?.name || "Unknown Faculty"}
              </div>

              <span className="text-[11px] text-[#5a6a85] ml-auto">
                ↓ {resource.downloads}
              </span>

              <Btn
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate("doubts");
                }}
              >
                Explain 🧠
              </Btn>
            </div>
          </div>
        ))}

        <div
          onClick={() => onNavigate("upload-resource")}
          className="bg-[#f5efdc] border border-dashed border-white/15 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer min-h-[160px] hover:border-white/25 transition-colors"
        >
          <span className="text-2xl text-[#5a6a85]">⬆️</span>
          <span className="text-sm text-[#5a6a85]">
            Upload a resource
          </span>
          <span className="text-[11px] text-[#5a6a85]">
            PDF supported
          </span>
        </div>
      </>
    )}
  </div>
</div>
      {showUploadModal && (
    <UploadResourceModal
        onClose={() => setShowUploadModal(false)}
        onSuccess={() => {
            setShowUploadModal(false);
            fetchResources();
        }}
    />
)}
    </PageWrap>
  );
}