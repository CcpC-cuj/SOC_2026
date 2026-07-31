import { useState, useEffect } from "react";
import { Pill, Btn, PageWrap, Select } from "../ui";
import { getResources } from "../../api/resources";
import UploadResourceModal from "../UploadResourceModal";
const SUBJECTS = [
  "All Subjects",
  "Physics – I",
  "Physics-I Lab",
  "Mathematics-I",
  "Basics Electrical Engineering",
  "Basics Electrical Engineering Lab",
  "Engineering Graphics & Design",
  "Communicative English",
  "Design Thinking",
  "Chemistry – I",
  "Chemistry - I Lab",
  "Mathematics-II",
  "Biology for Engineers",
  "Programming for Problem Solving",
  "Programming for Problem Solving Lab",
  "Workshop Manufacturing Practices",
  "Universal Human Values –II",
  "NSS/NCC",
  "Digital Electronics",
  "Engineering Mechanics",
  "Engineering Mechanics Lab",
  "Digital Electronics Lab",
  "Mathematics-III (Probability and Statistics)",
  "Data Structure & Algorithms",
  "Data Structure & Algorithms Lab",
  "Object Oriented Programming with C++",
  "Object Oriented Programming with C++ Lab",
  "Disaster Management",
  "Design & Analysis of Algorithms",
  "Design & Analysis of Algorithms Lab",
  "Computer Organization & Architecture",
  "Discrete Mathematical Structure",
  "Operating Systems",
  "Operating Systems Lab",
  "Environmental Sciences",
  "Computer Graphics",
  "Project Management Techniques",
  "Basic of Renewable Energy Resource",
  "Fundamentals of Materials Science and Engineering",
  "Introduction to Data Structure",
  "Introduction to Database Management Systems",
  "Introduction to Database Management Systems Lab",
  "Programming with Python",
  "Programming with Python Lab",
  "Theory of Computation",
  "Computer Networks",
  "Engineering Economics",
  "Introductory Cyber Security",
  "Remote Sensing and GIS in Engineering",
  "Basics of Solar Energy Engineering",
  "Fundamental of Nanoscience and Technology",
  "AI Foundation and Applications",
  "Introduction to Artificial Intelligence",
  "Compiler Design",
  "Data Mining: Concepts and Techniques",
  "Software Engineering",
  "System Analysis and Design",
  "Software Project Management",
  "Mobile Computing",
  "Information Extraction and Retrieval",
  "Blockchain and Cryptocurrency Technologies",
  "Web Technology",
  "Web Technology Lab",
  "Network and System Security",
  "Watershed Management",
  "Basic of Fuel Cell and Hydrogen Energy",
  "Fundamentals of Materials Characterization Techniques",
  "Introduction to Machine Learning",
  "Machine Learning",
  "Introduction to Data Analytics using Python",
  "Principles of Cloud Computing",
  "Next Generation Networks",
  "Introduction to Industry 4.0",
  "Internet of Things",
  "Nature Inspired Computing for Data Science",
  "Introduction to Cryptography",
  "Distributed Systems",
  "Engineering Project – I",
  "Summer Internship",
  "Knowledge Representation and Reasoning",
  "Parallel Algorithms",
  "Soft Computing",
  "Quantum Computing",
  "Virtual and Augmented Reality",
  "Engineering Project – II",
  "Big Data Analytics",
  "Artificial Neural Network",
  "Deep Learning",
  "Natural Language Processing",
  "Research Methodology and Intellectual Property Rights",
  "Dissertation I",
  "Dissertation II",
  "Introduction to AI",
];

const SEMESTERS = [
  "All Semesters",
  "Sem 1",
  "Sem 2",
  "Sem 3",
  "Sem 4",
  "Sem 5",
  "Sem 6",
  "Sem 7",
  "Sem 8",
  "Sem 9",
  "Sem 10",
];

export default function Resources({ onNavigate }) {
  const [filters, setFilters] = useState({
  search: "",
  subject: "",
  semester: "",

  });

  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);

  const fetchResources = async () => {
    try {
      setLoading(true);
      setError("");

      const params = {};

if (filters.search.trim()) {
  params.search = filters.search;
}

if (filters.subject) {
  params.subject = filters.subject;
}

if (filters.semester) {
  params.semester = Number(filters.semester);
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
  }, [filters]);

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
      {/* Filters */}
<div className="flex flex-wrap items-center gap-3 mb-4">

  {/* Search */}
  <input
    type="text"
    placeholder="🔍 Search resources..."
    value={filters.search}
    onChange={(e) =>
      setFilters((prev) => ({
        ...prev,
        search: e.target.value,
      }))
    }
    className="w-72 px-3 py-2 rounded-lg border border-black/10 bg-[#ece4c8] text-sm text-[#1a2540] placeholder-[#5a6a85] outline-none"
  />

  {/* Subject */}
  <Select
    value={filters.subject}
    options={SUBJECTS}
    onChange={(val) =>
      setFilters((prev) => ({
        ...prev,
        subject: val === "All Subjects" ? "" : val,
      }))
    }
  />

  {/* Semester */}
  <Select
    value={filters.semester}
    options={SEMESTERS}
    onChange={(val) =>
      setFilters((prev) => ({
        ...prev,
        semester:
          val === "All Semesters"
            ? ""
            : val.split(" ")[1],
      }))
    }
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
                onClick={() => setShowUploadModal(true)}
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