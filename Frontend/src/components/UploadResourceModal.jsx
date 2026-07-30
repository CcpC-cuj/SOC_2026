import { useState } from "react";
import { uploadResource } from "../api/resources";
import { Btn } from "./ui";

const RESOURCE_TYPES = ["notes", "assignment", "lab", "tutorial"];
const SEMESTERS = [1,2, 3, 4, 5, 6,7 ,8];

export default function UploadResourceModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    subject: "",
    semester: 3,
    resourceType: "notes",
    faculty: {
      name: "",
      department: "",
    },
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleFileChange = (e) => {
  const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    
    if (selectedFile.type !== "application/pdf") {
      alert("Only PDF files are allowed.");
      return;
    }
  
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF.");
      return;
    }

    if (!form.title.trim()) {
      alert("Title is required.");
      return;
    }

    if (!form.subject.trim()) {
      alert("Subject is required.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("subject", form.subject);
      formData.append("semester", form.semester);
      formData.append("resourceType", form.resourceType);

      formData.append("faculty[name]", form.faculty.name);
      formData.append("faculty[department]", form.faculty.department);

      formData.append("tags", form.tags);

      formData.append("file", file);

      await uploadResource(formData);

      alert("Resource uploaded successfully!");

      onSuccess();

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
  const { name, value } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handleFacultyChange = (e) => {
  const { name, value } = e.target;

  setForm((prev) => ({
    ...prev,
    faculty: {
      ...prev.faculty,
      [name]: value,
    },
  }));
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-3xl rounded-2xl bg-[#f5efdc] shadow-2xl">

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
            onClick={onClose}
            className="text-xl text-[#5a6a85] hover:text-[#1a2540]"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[70vh] overflow-y-auto p-6">

          {/* Title */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">
              Title *
            </label>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full rounded-lg border border-black/10 bg-[#ece4c8] px-3 py-2 outline-none"
            />

          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-lg border border-black/10 bg-[#ece4c8] px-3 py-2 resize-none outline-none"
            />

          </div>

          {/* Subject + Semester */}
          <div className="mb-4 grid grid-cols-2 gap-4">

            <div>
              <label className="mb-2 block text-sm font-medium">
                Subject
              </label>

              <input
                 name="subject"
                 value={form.subject}
                 onChange={handleChange}
                 className="w-full rounded-lg border border-black/10 bg-[#ece4c8] px-3 py-2"
               />

            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Semester
              </label>

              <select
                  name="semester"
                  value={form.semester}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-black/10 bg-[#ece4c8] px-3 py-2"
                >
                  {SEMESTERS.map((sem) => (
                    <option key={sem} value={sem}>
                      Semester {sem}
                    </option>
                  ))}
                </select>

            </div>

          </div>

          {/* Resource Type */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">
              Resource Type
            </label>

            <div className="flex flex-wrap gap-2">
              {RESOURCE_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      resourceType: type,
                    }))
                  }
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    form.resourceType === type
                      ? "bg-[#1a2540] text-white"
                      : "bg-[#ece4c8] border border-black/10 hover:bg-[#e6dcc1]"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Faculty */}
          <div className="mb-4 grid grid-cols-2 gap-4">

            <input
              name="name"
              value={form.faculty.name}
              onChange={handleFacultyChange}
              placeholder="Faculty Name"
              className="rounded-lg border border-black/10 bg-[#ece4c8] px-3 py-2"
            />

            <input
              name="department"
              value={form.faculty.department}
              onChange={handleFacultyChange}
              placeholder="Department"
              className="rounded-lg border border-black/10 bg-[#ece4c8] px-3 py-2"
            />

          </div>

          {/* PDF Upload */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium">
                PDF File <span className="text-red-500">*</span>
              </label>
                    
              <div className="rounded-xl border border-dashed border-black/10 bg-[#ece4c8] p-6 text-center">
                <input
                  type="file"
                  accept=".pdf"
                  id="pdf-upload"
                  className="hidden"
                  onChange={handleFileChange}
                />
            
                <label
                  htmlFor="pdf-upload"
                  className="cursor-pointer inline-block rounded-lg bg-[#1a2540] px-4 py-2 text-white hover:opacity-90"
                >
                  Choose PDF
                </label>
                    
                {file ? (
                  <div className="mt-4 text-sm text-[#1a2540]">
                    <p className="font-medium">📄 {file.name}</p>
                    <p className="text-[#5a6a85]">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-[#5a6a85]">
                    No file selected
                  </p>
                )}
              </div>
            </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-black/10 px-6 py-4">

          <Btn
            variant="ghost"
            onClick={onClose}
          >
            Cancel
          </Btn>

          <Btn
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload Resource"}
          </Btn>

        </div>

      </div>
    </div>
  );
}