import { useState, useRef, useEffect } from "react";
import { Card, Pill, Btn, SectionTitle, PageWrap } from "../ui";
import logo from "../../assets/cuj-logo.png";
import {
  getProfile,
  updateProfile,
  uploadAvatar,
  uploadResume,
  removeAvatar,
  removeResume,
} from "../../api/profile";

import {getMyRecentResources} from "../../api/resources";
const ALL_SKILLS = [
  "React",
  "Python",
  "Node.js",
  "Machine Learning",
  "MongoDB",
  "C++",
  "Data Structures",
  "Java",
  "Tailwind CSS",
  "Express.js",
  "MySQL",
  "Git/GitHub",
];

const ACHIEVEMENT_ICONS = [
  "🏆",
  "⭐",
  "📚",
  "🎯",
  "🥇",
  "🚀",
  "💡",
  "🔥",
  "🎓",
  "📜",
];

const MYPROJECTS = [
  {
    icon: "🏆",
    bg: "bg-amber-500/10",
    name: "Smart Traffic Controller",
    meta: "HackBIT 2025 · 2 members",
    status: "Active",
    sc: "green",
  },
  {
    icon: "💻",
    bg: "bg-blue-500/10",
    name: "AI Resume Screener",
    meta: "SIH 2025 · 4 members",
    status: "Full",
    sc: "amber",
  },
];


const RESUME_ACCEPT =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export default function Profile({ onNavigate }) {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const fileInputRef = useRef(null);
  const resumeInputRef = useRef(null);

  const [profile, setProfile] = useState(null);
  const [draft, setDraft] = useState(null);

  const [myResources, setMyResources] = useState([]);

  const fetchProfile = async () => {
      try {
        const res = await getProfile();

        const user = res.data.data;

        const profileData = {
          name: user.name || "",
          rollno: user.rollNumber || "",
          programme: user.branch || "",
          sem: user.semester || "",
          batch: "",
          bio: user.bio || "",
          skills: user.skills || [],
          photo: user.avatar || "",
          resume: user.resumeUrl || "",
          achievements: user.achievements || [],
        };

        setProfile(profileData);
        setDraft(profileData);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchMyResources = async () => {
      try {
           const res = await getMyRecentResources();
           setMyResources(res.data);
       } catch (err) {
           console.error(err);
           setMyResources([]);
       }
    };

  useEffect(() => {
    fetchProfile();
    fetchMyResources();
  }, []);

  const startEdit = () => {
    setDraft(profile);
    setEditing(true);
    setSaved(false);
  };

  const cancelEdit = () => {
    setDraft(profile);
    setEditing(false);
  };

  const saveEdit = async () => {
    try {
      const res = await updateProfile({
        name: draft.name,
        bio: draft.bio,
        branch: draft.programme,
        semester: draft.sem,
        skills: draft.skills,
        achievements: draft.achievements,
      });

      const user = res.data.data;

      const updated = {
          ...draft,
          achievements: user.achievements ?? draft.achievements,
          photo: user.avatar ?? draft.photo,
          resume: user.resumeUrl ?? draft.resume,
      };

      setProfile(updated);
      setDraft(updated);

      localStorage.setItem("user", JSON.stringify(user));

      setEditing(false);
      setSaved(true);

      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Profile update failed");
    }
  };

  const handle = (e) => {
    setDraft((d) => ({
      ...d,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleSkill = (skill) => {
    setDraft((d) => ({
      ...d,
      skills: d.skills.includes(skill)
        ? d.skills.filter((s) => s !== skill)
        : [...d.skills, skill],
    }));
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image.");
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      alert("Image must be under 3MB.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const res = await uploadAvatar(formData);

      const user = res.data.data;

      setDraft((d) => ({
        ...d,
        photo: user.avatar,
      }));

      setProfile((p) => ({
        ...p,
        photo: user.avatar,
      }));
    } catch (err) {
      console.error(err);
      alert("Avatar upload failed");
    }
  };

  const removePhoto = async () => {
  try {
    await removeAvatar();

    setDraft((d) => ({
      ...d,
      photo: "",
    }));

    setProfile((p) => ({
      ...p,
      photo: "",
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  } catch (err) {
    console.error(err);
    alert("Failed to remove avatar");
  }
};

  const handleResumeUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      const formData = new FormData();

      formData.append("resume", file);

      const res = await uploadResume(formData);

      const user = res.data.data;

      setDraft((d) => ({
        ...d,
        resume: user.resumeUrl,
      }));

      setProfile((p) => ({
        ...p,
        resume: user.resumeUrl,
      }));
    } catch (err) {
      console.error(err);
      alert("Resume upload failed");
    }
  };

  const handleRemoveResume = async () => {
  try {
    await removeResume();

    setDraft((d) => ({
      ...d,
      resume: "",
    }));

    setProfile((p) => ({
      ...p,
      resume: "",
    }));

    if (resumeInputRef.current) {
      resumeInputRef.current.value = "";
    }
  } catch (err) {
    console.error(err);
    alert("Failed to remove resume");
  }
};

  const viewResume = (url) => {
    if (!url) return;
    window.open(url, "_blank");
  };

  const downloadResume = (url) => {
    if (!url) return;

    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.click();
  };

  const updateAchievement = (index, value) => {
      setDraft((d) => {
          const next = [...d.achievements];
          next[index] = value;
      
          return {
              ...d,
              achievements: next,
          };
      });
  };

  const addAchievement = () =>
    setDraft((d) => ({
      ...d,
      achievements: [
          ...d.achievements,
          "",
      ],
    }));

  const removeAchievement = (index) =>
    setDraft((d) => ({
      ...d,
      achievements: d.achievements.filter((_, i) => i !== index),
    }));

  if (!profile || !draft) {
    return (
      <PageWrap>
        <div className="text-center py-20 text-[#5a6a85]">
          Loading profile...
        </div>
      </PageWrap>
    );
  }

  const initials = (editing ? draft.name : profile.name)
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const displayPhoto = editing ? draft.photo : profile.photo;
  const displayResume = editing ? draft.resume : profile.resume;
  return (
  <PageWrap>
    {saved && (
      <div className="bg-green-50 border border-green-300 rounded-lg px-4 py-2.5 text-sm text-green-700 mb-3 flex items-center gap-2">
        ✅ Profile updated successfully.
      </div>
    )}

    <div className="grid grid-cols-2 gap-3 items-start">
      <div>

        {/* Profile Card */}

        <div className="bg-[#f5efdc] border border-white/[0.07] rounded-xl overflow-hidden mb-3">

          <div className="h-24 bg-gradient-to-br from-[#f1faf2] to-[#eef4fb] relative overflow-hidden">

            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-transparent to-blue-500/10" />

            <div className="absolute right-3 top-3 opacity-20">
              <img
                src={logo}
                alt=""
                className="w-14 h-14 object-cover rounded-full"
              />
            </div>

            <div className="absolute bottom-2 left-4 text-[10px] text-yellow-400/60 font-medium tracking-wider uppercase">
              CUJ · CSE · Batch {editing ? draft.batch : profile.batch}
            </div>

          </div>

          <div className="px-5 pb-5">

            <div className="relative -mt-8 mb-2.5 w-16 h-16">

              {displayPhoto ? (
                <img
                  src={displayPhoto}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover border-[3px] border-[#f5efdc]"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-xl font-bold text-white border-[3px] border-[#f5efdc]">
                  {initials}
                </div>
              )}

              {editing && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-blue-500 text-white text-[11px] flex items-center justify-center border-2 border-[#f5efdc]"
                >
                  📷
                </button>
              )}

            </div>

            {editing && (
              <div className="flex gap-2 mb-3">

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[11px] px-2.5 py-1 rounded-md bg-[#ece4c8]"
                >
                  📤 Upload Photo
                </button>

                {draft.photo && (
                  <button
                    type="button"
                    onClick={removePhoto}
                    className="text-[11px] px-2.5 py-1 rounded-md bg-red-100 text-red-600"
                  >
                    Remove
                  </button>
                )}

              </div>
            )}

            {editing ? (
              <input
                name="name"
                value={draft.name}
                onChange={handle}
                className="w-full font-bold text-lg bg-[#ece4c8] rounded-lg px-3 py-2"
              />
            ) : (
              <div className="font-bold text-lg">
                {profile.name}
              </div>
            )}

            {editing ? (
              <div className="grid grid-cols-2 gap-2 mt-3">

                <input
                  name="rollno"
                  value={draft.rollno}
                  onChange={handle}
                  placeholder="Roll Number"
                  className="bg-[#ece4c8] rounded-lg px-3 py-2"
                />

                <select
                  name="sem"
                  value={draft.sem}
                  onChange={handle}
                  className="bg-[#ece4c8] rounded-lg px-3 py-2"
                >
                  {[1,2,3,4,5,6,7,8].map((s)=>(
                    <option key={s}>{s}</option>
                  ))}
                </select>

                <input
                  name="programme"
                  value={draft.programme}
                  onChange={handle}
                  placeholder="Programme"
                  className="col-span-2 bg-[#ece4c8] rounded-lg px-3 py-2"
                />

                <input
                  name="batch"
                  value={draft.batch}
                  onChange={handle}
                  placeholder="Batch"
                  className="col-span-2 bg-[#ece4c8] rounded-lg px-3 py-2"
                />

              </div>
            ) : (
              <>
                <div className="text-sm text-[#5a6a85] mt-1">
                  Roll No: {profile.rollno}
                </div>

                <div className="text-sm text-[#5a6a85]">
                  {profile.programme} · Semester {profile.sem}
                </div>
              </>
            )}

            {editing ? (
              <textarea
                rows={3}
                name="bio"
                value={draft.bio}
                onChange={handle}
                className="mt-3 w-full bg-[#ece4c8] rounded-lg px-3 py-2"
              />
            ) : (
              <div className="text-sm text-[#5a6a85] mt-2">
                {profile.bio}
              </div>
            )}

            <div className="flex gap-2 mt-3">

              {editing ? (
                <>
                  <Btn size="sm" onClick={saveEdit}>
                    💾 Save
                  </Btn>

                  <Btn
                    variant="ghost"
                    size="sm"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </Btn>
                </>
              ) : (
                <>
                  <Btn
                    size="sm"
                    onClick={() => onNavigate("messages")}
                  >
                    💌 Message
                  </Btn>

                  <Btn variant="ghost" size="sm">
                    🔗 Share
                  </Btn>

                  <Btn
                    variant="ghost"
                    size="sm"
                    onClick={startEdit}
                  >
                    ✏️ Edit
                  </Btn>
                </>
              )}

            </div>

          </div>
        </div>

        {/* Resume */}

        <Card className="mb-3">

          <SectionTitle>
            Resume
          </SectionTitle>

          <input
            ref={resumeInputRef}
            type="file"
            accept={RESUME_ACCEPT}
            onChange={handleResumeUpload}
            className="hidden"
          />

          {displayResume ? (

            <div className="flex items-center gap-3 bg-[#ece4c8] rounded-lg p-3">

              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                📄
              </div>

              <div className="flex-1">

                <div className="font-medium">
                  Resume Uploaded
                </div>

                <div className="text-xs text-[#5a6a85]">
                  Stored securely on Cloudinary
                </div>

              </div>

              <button
                onClick={() => viewResume(displayResume)}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                View
              </button>

              <button
                onClick={() => downloadResume(displayResume)}
                className="px-3 py-1 border rounded"
              >
                Download
              </button>

              {editing && (
                <>
                  <button
                    onClick={() => resumeInputRef.current?.click()}
                    className="px-3 py-1 border rounded"
                  >
                    Replace
                  </button>

                  <button
                    onClick={handleRemoveResume}
                    className="px-3 py-1 bg-red-100 rounded"
                  >
                    Remove
                  </button>
                </>
              )}

            </div>

          ) : (

            <div className="flex justify-between items-center bg-[#ece4c8] rounded-lg p-3">

              <div>

                <div className="font-medium">
                  No Resume Uploaded
                </div>

                <div className="text-xs text-[#5a6a85]">
                  PDF / DOC / DOCX
                </div>

              </div>

              <button
                onClick={() => resumeInputRef.current?.click()}
                className="bg-blue-500 text-white px-3 py-2 rounded"
              >
                Upload Resume
              </button>

            </div>

          )}

        </Card>

        {/* Skills starts here */}
                {/* Skills */}

        <Card className="mb-3">
          <SectionTitle>Skills</SectionTitle>

          {editing ? (
            <>
              <div className="flex flex-wrap gap-2">

                {ALL_SKILLS.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1 rounded-md text-xs border transition ${
                      draft.skills.includes(skill)
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-[#ece4c8] border-gray-300"
                    }`}
                  >
                    {skill}
                  </button>
                ))}

              </div>

              <p className="text-xs text-[#5a6a85] mt-2">
                Click to add or remove skills.
              </p>
            </>
          ) : (
            <>
              <div className="flex flex-wrap gap-2">

                {profile.skills.length === 0 ? (
                  <p className="text-sm text-[#5a6a85]">
                    No skills added.
                  </p>
                ) : (
                  profile.skills.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => onNavigate("projects")}
                      className="px-3 py-1 rounded-md bg-[#ece4c8] text-xs border"
                    >
                      {skill}
                    </button>
                  ))
                )}

              </div>

              <p className="text-xs text-[#5a6a85] mt-2">
                Click a skill to browse projects.
              </p>
            </>
          )}
        </Card>

        {/* Achievements */}

        <Card>

          <div className="flex justify-between items-center mb-3">

            <SectionTitle>
              Achievements
            </SectionTitle>

            {editing && (
              <button
                onClick={addAchievement}
                className="bg-blue-500 text-white px-3 py-1 rounded text-xs"
              >
                + Add
              </button>
            )}

          </div>

          {editing ? (

            <div className="space-y-3">

              {draft.achievements.map((a, index) => (

                <div
                  key={index}
                  className="bg-[#ece4c8] rounded-lg p-3 flex gap-2 items-center"
                >

                  <input
                      value={a}
                      onChange={(e) => updateAchievement(index, e.target.value)}
                      placeholder="Achievement"
                      className="flex-1 px-3 py-2 rounded border"
                  />

                  <button
                    onClick={() => removeAchievement(index)}
                    className="text-red-500"
                  >
                    ✕
                  </button>

                </div>

              ))}

              {draft.achievements.length === 0 && (
                <div className="text-center text-sm text-[#5a6a85] py-4">
                  No achievements added.
                </div>
              )}

            </div>

          ) : (

            <div className="flex flex-wrap gap-3">

              {profile.achievements.length === 0 ? (

                <div className="w-full text-center py-4 text-[#5a6a85]">
                  No achievements yet.
                </div>

              ) : (

                profile.achievements.map((a, index) => (

                  <div
                    key={index}
                    className="flex-1 min-w-[100px] bg-[#ece4c8] rounded-xl p-3 text-center"
                  >

                    <div className="font-medium">
                        🏆 {a}
                    </div>

                  </div>

                ))

              )}

            </div>

          )}

        </Card>

      </div>

      {/* Right Column starts here */}

<div>

  <Card className="mb-3">
          <SectionTitle>My Projects</SectionTitle>

          {MYPROJECTS.map((project, index) => (
            <div
              key={index}
              className="flex items-center gap-3 py-3 border-b border-white/10 last:border-0"
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${project.bg}`}
              >
                {project.icon}
              </div>

              <div className="flex-1">
                <div className="font-medium">
                  {project.name}
                </div>

                <div className="text-xs text-[#5a6a85] flex items-center gap-2 mt-1">
                  {project.meta}

                  <Pill color={project.sc}>
                    {project.status}
                  </Pill>
                </div>
              </div>

              <Btn
                variant="ghost"
                size="sm"
                onClick={() => onNavigate("projects")}
              >
                View ↗️
              </Btn>
            </div>
          ))}
        </Card>

        <Card>

          <SectionTitle>
            Uploaded Resources
          </SectionTitle>

          {myResources.map((resource) => (

            <div
              key={resource._id}
              className="flex items-center gap-3 py-3 border-b border-white/10 last:border-0"
            >

              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                📄
              </div>

              <div className="flex-1">

                <div className="font-medium">
                    {resource.title}
                </div>

                <div className="text-xs text-[#5a6a85]">
                    Sem {resource.semester} · {resource.downloads} downloads
                </div>

              </div>

            </div>

          ))}

        </Card>

      </div>

    </div>

  </PageWrap>
);
}