import { useState } from "react";
import { uploadResource } from "../api/resources";
import { Btn } from "./ui";

const RESOURCE_TYPES = [
  "notes",
  "assignment",
  "lab",
  "tutorial",
];

const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const SUBJECTS = [
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
];

const initialForm = {
  title: "",
  description: "",
  subject: "",
  semester: 3,
  resourceType: "notes",
  faculty: {
    name: "",
    department: "",
  },
};

export default function UploadResourceModal({
  onClose,
  onSuccess,
}) {
  const [form, setForm] = useState(initialForm);

  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const handleFileChange = (e) => {
    if (loading) return;

    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    setError("");
    setSuccess("");

    if (selectedFile.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      e.target.value = "";
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("PDF size must be less than 10 MB.");
      e.target.value = "";
      return;
    }

    setFile(selectedFile);
  };

  const handleChange = (e) => {
    if (loading) return;

    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleFacultyChange = (e) => {
    if (loading) return;

    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      faculty: {
        ...prev.faculty,
        [name]: value,
      },
    }));

    setError("");
  };

  const validateForm = () => {
    if (!form.title.trim()) {
      return "Title is required.";
    }

    if (form.title.trim().length < 3) {
      return "Title must be at least 3 characters.";
    }

    if (!form.subject) {
      return "Please select a subject.";
    }

    if (!form.semester) {
      return "Please select a semester.";
    }

    if (!form.resourceType) {
      return "Please select a resource type.";
    }

    if (!file) {
      return "Please select a PDF file.";
    }

    return "";
  };

  const handleUpload = async () => {
    if (loading) return;

    setError("");
    setSuccess("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append(
        "title",
        form.title.trim()
      );

      formData.append(
        "description",
        form.description.trim()
      );

      formData.append(
        "subject",
        form.subject
      );

      formData.append(
        "semester",
        String(form.semester)
      );

      formData.append(
        "resourceType",
        form.resourceType
      );

      formData.append(
        "faculty[name]",
        form.faculty.name.trim()
      );

      formData.append(
        "faculty[department]",
        form.faculty.department.trim()
      );

      formData.append(
        "file",
        file
      );

      await uploadResource(formData);

      setSuccess(
        "Resource uploaded successfully! It is now waiting for admin approval."
      );

      setForm(initialForm);
      setFile(null);

      setTimeout(() => {
        onSuccess();
      }, 1200);

    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
        "Upload failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (loading) return;

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">

      <div className="w-full max-w-3xl rounded-2xl bg-[#f5efdc] shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/10 px-6 py-4">

          <div>
            <h2 className="text-xl font-semibold text-[#1a2540]">
              Upload Resource
            </h2>

            <p className="text-sm text-[#5a6a85]">
              Share notes, assignments and study material.
            </p>
          </div>

          <button
            onClick={handleClose}
            disabled={loading}
            className={`text-xl text-[#5a6a85] hover:text-[#1a2540] ${
              loading
                ? "opacity-30 cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            ✕
          </button>

        </div>

        {/* Body */}
        <div className="max-h-[70vh] overflow-y-auto p-6">

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mb-5 rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-700">
              ✓ {success}
            </div>
          )}

          {/* Title */}
          <div className="mb-4">

            <label className="mb-2 block text-sm font-medium text-[#1a2540]">
              Title *
            </label>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              disabled={loading}
              placeholder="e.g. Operating Systems Unit 1 Notes"
              className="w-full rounded-lg border border-black/10 bg-[#ece4c8] px-3 py-2 text-sm outline-none transition focus:border-blue-500/50 disabled:cursor-not-allowed disabled:opacity-60"
            />

          </div>

          {/* Description */}
          <div className="mb-4">

            <label className="mb-2 block text-sm font-medium text-[#1a2540]">
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              disabled={loading}
              rows={4}
              placeholder="Briefly describe this resource..."
              className="w-full resize-none rounded-lg border border-black/10 bg-[#ece4c8] px-3 py-2 text-sm outline-none transition focus:border-blue-500/50 disabled:cursor-not-allowed disabled:opacity-60"
            />

          </div>

          {/* Subject + Semester */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm font-medium text-[#1a2540]">
                Subject *
              </label>

              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                disabled={loading}
                className="w-full rounded-lg border border-black/10 bg-[#ece4c8] px-3 py-2 text-sm outline-none focus:border-blue-500/50 disabled:cursor-not-allowed disabled:opacity-60"
              >

                <option value="">
                  Select subject
                </option>

                {SUBJECTS.map((subject) => (
                  <option
                    key={subject}
                    value={subject}
                  >
                    {subject}
                  </option>
                ))}

              </select>

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium text-[#1a2540]">
                Semester *
              </label>

              <select
                name="semester"
                value={form.semester}
                onChange={handleChange}
                disabled={loading}
                className="w-full rounded-lg border border-black/10 bg-[#ece4c8] px-3 py-2 text-sm outline-none focus:border-blue-500/50 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {SEMESTERS.map((sem) => (
                  <option
                    key={sem}
                    value={sem}
                  >
                    Semester {sem}
                  </option>
                ))}

              </select>

            </div>

          </div>

          {/* Resource Type */}
          <div className="mb-4">

            <label className="mb-2 block text-sm font-medium text-[#1a2540]">
              Resource Type *
            </label>

            <div className="flex flex-wrap gap-2">

              {RESOURCE_TYPES.map((type) => (

                <button
                  key={type}
                  type="button"
                  disabled={loading}
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      resourceType: type,
                    }))
                  }
                  className={`rounded-full px-4 py-2 text-sm capitalize transition ${
                    form.resourceType === type
                      ? "bg-[#1a2540] text-white"
                      : "border border-black/10 bg-[#ece4c8] hover:bg-[#e6dcc1]"
                  } ${
                    loading
                      ? "cursor-not-allowed opacity-60"
                      : "cursor-pointer"
                  }`}
                >
                  {type}
                </button>

              ))}

            </div>

          </div>

          {/* Faculty */}
          <div className="mb-4">

            <label className="mb-2 block text-sm font-medium text-[#1a2540]">
              Faculty
            </label>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

              <input
                name="name"
                value={form.faculty.name}
                onChange={handleFacultyChange}
                disabled={loading}
                placeholder="Faculty Name"
                className="rounded-lg border border-black/10 bg-[#ece4c8] px-3 py-2 text-sm outline-none focus:border-blue-500/50 disabled:cursor-not-allowed disabled:opacity-60"
              />

              <input
                name="department"
                value={form.faculty.department}
                onChange={handleFacultyChange}
                disabled={loading}
                placeholder="Department"
                className="rounded-lg border border-black/10 bg-[#ece4c8] px-3 py-2 text-sm outline-none focus:border-blue-500/50 disabled:cursor-not-allowed disabled:opacity-60"
              />

            </div>

          </div>

          {/* PDF */}
          <div className="mb-2">

            <label className="mb-2 block text-sm font-medium text-[#1a2540]">
              PDF File *
            </label>

            <div className="rounded-xl border border-dashed border-black/10 bg-[#ece4c8] p-6 text-center">

              <input
                type="file"
                accept=".pdf,application/pdf"
                id="pdf-upload"
                className="hidden"
                disabled={loading}
                onChange={handleFileChange}
              />

              <label
                htmlFor="pdf-upload"
                className={`inline-block rounded-lg bg-[#1a2540] px-4 py-2 text-sm text-white ${
                  loading
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer hover:opacity-90"
                }`}
              >
                {file
                  ? "Change PDF"
                  : "Choose PDF"}
              </label>

              {file ? (
                <div className="mt-4 rounded-lg bg-[#f5efdc] px-4 py-3 text-left">

                  <div className="flex items-center gap-3">

                    <div className="text-2xl">
                      📄
                    </div>

                    <div className="min-w-0 flex-1">

                      <p className="truncate text-sm font-medium text-[#1a2540]">
                        {file.name}
                      </p>

                      <p className="text-xs text-[#5a6a85]">
                        {(
                          file.size /
                          (1024 * 1024)
                        ).toFixed(2)}{" "}
                        MB
                      </p>

                    </div>

                  </div>

                </div>
              ) : (
                <p className="mt-3 text-sm text-[#5a6a85]">
                  PDF only · Maximum 10 MB
                </p>
              )}

            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-black/10 px-6 py-4">

          <p className="text-xs text-[#5a6a85]">
            {loading
              ? "Please wait while your resource is being uploaded..."
              : "Your resource will require admin approval."}
          </p>

          <div className="flex gap-3">

            <Btn
              variant="ghost"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </Btn>

            <Btn
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Uploading...
                </span>
              ) : (
                "Upload Resource"
              )}
            </Btn>

          </div>

        </div>

      </div>

    </div>
  );
}