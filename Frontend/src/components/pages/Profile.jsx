import { useState, useRef } from "react";
import { Card, Pill, Btn, SectionTitle, PageWrap } from "../ui";
import logo from "../../assets/cuj-logo.png";

const ALL_SKILLS = ["React","Python","Node.js","Machine Learning","MongoDB","C++","Data Structures","Java","Tailwind CSS","Express.js","MySQL","Git/GitHub"];

const ACHIEVEMENT_ICONS = ["🏆","⭐","📚","🎯","🥇","🚀","💡","🔥","🎓","📜"];

const MYPROJECTS = [
  { icon:"🏆", bg:"bg-amber-500/10", name:"Smart Traffic Controller", meta:"HackBIT 2025 · 2 members", status:"Active", sc:"green" },
  { icon:"💻", bg:"bg-blue-500/10", name:"AI Resume Screener", meta:"SIH 2025 · 4 members", status:"Full", sc:"amber" },
];
const MYRESOURCES = [
  { name:"DS Complete Notes", meta:"Sem 5 · 142 downloads" },
  { name:"OS Unit 4 Notes", meta:"Sem 5 · 98 downloads" },
  { name:"CN Lab Manual", meta:"Sem 5 · 64 downloads" },
];

export default function Profile({ onNavigate }) {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef(null);

  const [profile, setProfile] = useState({
    name: "Aryan Kumar",
    rollno: "23CUCSE001",
    programme: "B.Tech CSE",
    sem: "5",
    batch: "2022–26",
    bio: "Passionate about ML and full-stack dev. Building cool things one commit at a time.",
    skills: ["React", "Python", "Node.js", "Machine Learning", "MongoDB", "C++", "Data Structures"],
    photo: null,
    achievements: [
      { icon: "🏆", title: "HackBIT 2024", subtitle: "Finalist" },
      { icon: "⭐", title: "Top contributor", subtitle: "Oct 2024" },
      { icon: "📚", title: "142 resources", subtitle: "shared" },
    ],
  });

  const [draft, setDraft] = useState(profile);

  const startEdit = () => {
    setDraft(profile);
    setEditing(true);
    setSaved(false);
  };

  const cancelEdit = () => {
    setDraft(profile);
    setEditing(false);
  };

  const saveEdit = () => {
    setProfile(draft);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handle = (e) => {
    setDraft((d) => ({ ...d, [e.target.name]: e.target.value }));
  };

  const toggleSkill = (skill) => {
    setDraft((d) => ({
      ...d,
      skills: d.skills.includes(skill)
        ? d.skills.filter((s) => s !== skill)
        : [...d.skills, skill],
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      alert("Image must be under 3MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setDraft((d) => ({ ...d, photo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setDraft((d) => ({ ...d, photo: null }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const updateAchievement = (index, field, value) => {
    setDraft((d) => {
      const next = [...d.achievements];
      next[index] = { ...next[index], [field]: value };
      return { ...d, achievements: next };
    });
  };

  const addAchievement = () => {
    setDraft((d) => ({
      ...d,
      achievements: [...d.achievements, { icon: "🏆", title: "", subtitle: "" }],
    }));
  };

  const removeAchievement = (index) => {
    setDraft((d) => ({
      ...d,
      achievements: d.achievements.filter((_, i) => i !== index),
    }));
  };

  const initials = (editing ? draft.name : profile.name)
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const displayPhoto = editing ? draft.photo : profile.photo;

  return (
    <PageWrap>
      {saved && (
        <div className="bg-green-50 border border-green-300 rounded-lg px-4 py-2.5 text-sm text-green-700 mb-3 flex items-center gap-2">
          ✅ Profile updated successfully.
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 items-start">
        <div>
          {/* Profile card */}
          <div className="bg-[#f5efdc] border border-white/[0.07] rounded-xl overflow-hidden mb-3">
            {/* Cover with CUJ theming */}
            <div className="h-24 bg-gradient-to-br from-[#f1faf2] to-[#eef4fb] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-transparent to-blue-500/10" />
              <div className="absolute right-3 top-3 opacity-20">
                <img src={logo} alt="" className="w-14 h-14 object-cover rounded-full" />
              </div>
              <div className="absolute bottom-2 left-4 text-[10px] text-yellow-400/60 font-medium tracking-wider uppercase">
                CUJ · CSE · Batch {editing ? draft.batch : profile.batch}
              </div>
            </div>

            <div className="px-5 pb-5">
              {/* Avatar / Photo */}
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
                    className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-blue-500 text-white text-[11px] flex items-center justify-center cursor-pointer border-2 border-[#f5efdc] hover:bg-blue-600 transition-colors"
                    title="Change photo"
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
                    className="text-[11px] px-2.5 py-1 rounded-md bg-[#ece4c8] text-[#1a2540] border border-white/[0.07] hover:border-white/15 cursor-pointer transition-all"
                  >
                    📤 Upload photo
                  </button>
                  {draft.photo && (
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="text-[11px] px-2.5 py-1 rounded-md bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 cursor-pointer transition-all"
                    >
                      🗑️ Remove
                    </button>
                  )}
                </div>
              )}

              {editing ? (
                <input
                  name="name"
                  value={draft.name}
                  onChange={handle}
                  placeholder="Full name"
                  className="w-full font-['Syne',sans-serif] text-lg font-bold bg-[#ece4c8] border border-white/[0.07] rounded-lg px-2.5 py-1.5 text-[#1a2540] outline-none focus:border-blue-500/50 mb-1.5"
                />
              ) : (
                <div className="font-['Syne',sans-serif] text-lg font-bold">{profile.name}</div>
              )}

              {editing ? (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <label className="text-[10px] text-[#5a6a85] mb-1 block">Roll number</label>
                    <input
                      name="rollno"
                      value={draft.rollno}
                      onChange={handle}
                      className="w-full text-sm bg-[#ece4c8] border border-white/[0.07] rounded-lg px-2.5 py-1.5 text-[#1a2540] outline-none focus:border-blue-500/50"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-[#5a6a85] mb-1 block">Semester</label>
                    <select
                      name="sem"
                      value={draft.sem}
                      onChange={handle}
                      className="w-full text-sm bg-[#ece4c8] border border-white/[0.07] rounded-lg px-2.5 py-1.5 text-[#1a2540] outline-none focus:border-blue-500/50 cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="text-[10px] text-[#5a6a85] mb-1 block">Programme</label>
                    <input
                      name="programme"
                      value={draft.programme}
                      onChange={handle}
                      className="w-full text-sm bg-[#ece4c8] border border-white/[0.07] rounded-lg px-2.5 py-1.5 text-[#1a2540] outline-none focus:border-blue-500/50"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-[10px] text-[#5a6a85] mb-1 block">Batch</label>
                    <input
                      name="batch"
                      value={draft.batch}
                      onChange={handle}
                      placeholder="2022–26"
                      className="w-full text-sm bg-[#ece4c8] border border-white/[0.07] rounded-lg px-2.5 py-1.5 text-[#1a2540] outline-none focus:border-blue-500/50"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-sm text-[#5a6a85] mt-0.5">Roll No: {profile.rollno}</div>
                  <div className="text-sm text-[#5a6a85] mt-0.5">{profile.programme} · Semester {profile.sem}</div>
                </>
              )}

              {editing ? (
                <div className="mt-2">
                  <label className="text-[10px] text-[#5a6a85] mb-1 block">Bio</label>
                  <textarea
                    name="bio"
                    value={draft.bio}
                    onChange={handle}
                    rows={3}
                    className="w-full text-sm bg-[#ece4c8] border border-white/[0.07] rounded-lg px-2.5 py-1.5 text-[#1a2540] outline-none focus:border-blue-500/50 resize-none"
                  />
                </div>
              ) : (
                <div className="text-sm text-[#5a6a85] mt-1.5 leading-relaxed">{profile.bio}</div>
              )}

              <div className="flex gap-2 mt-3">
                {editing ? (
                  <>
                    <Btn size="sm" onClick={saveEdit}>💾 Save</Btn>
                    <Btn variant="ghost" size="sm" onClick={cancelEdit}>Cancel</Btn>
                  </>
                ) : (
                  <>
                    <Btn size="sm" onClick={() => onNavigate("messages")}>💌 Message</Btn>
                    <Btn variant="ghost" size="sm">🔗 Share</Btn>
                    <Btn variant="ghost" size="sm" onClick={startEdit}>✏️ Edit</Btn>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Skills */}
          <Card className="mb-3">
            <SectionTitle>Skills</SectionTitle>
            {editing ? (
              <>
                <div className="-mt-1 flex flex-wrap gap-1">
                  {ALL_SKILLS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSkill(s)}
                      className={`inline-block text-[11px] px-2.5 py-1 rounded-md border transition-all cursor-pointer ${
                        draft.skills.includes(s)
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-[#ece4c8] border-white/[0.07] text-[#5a6a85] hover:border-white/15 hover:text-[#1a2540]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-[#5a6a85] mt-2">Click to toggle. Don't forget to hit Save above.</p>
              </>
            ) : (
              <>
                <div className="-mt-1">
                  {profile.skills.map((s) => (
                    <button
                      key={s}
                      onClick={() => onNavigate("projects")}
                      className="inline-block text-[11px] px-2.5 py-1 rounded-md bg-[#ece4c8] border border-white/[0.07] text-[#5a6a85] m-0.5 hover:border-white/15 hover:text-[#1a2540] transition-all cursor-pointer"
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-[#5a6a85] mt-2">Click a skill to find open projects needing it ↗️</p>
              </>
            )}
          </Card>

          {/* Achievements */}
          <Card>
            <div className="flex items-center justify-between mb-1">
              <SectionTitle>Achievements</SectionTitle>
              {editing && (
                <button
                  type="button"
                  onClick={addAchievement}
                  className="text-[11px] px-2 py-1 rounded-md bg-blue-500 text-white cursor-pointer hover:bg-blue-600 transition-colors -mt-3"
                >
                  + Add
                </button>
              )}
            </div>

            {editing ? (
              <div className="flex flex-col gap-2">
                {draft.achievements.map((a, i) => (
                  <div key={i} className="flex items-center gap-2 bg-[#ece4c8] rounded-lg p-2">
                    <select
                      value={a.icon}
                      onChange={(e) => updateAchievement(i, "icon", e.target.value)}
                      className="text-lg bg-transparent outline-none cursor-pointer w-10"
                    >
                      {ACHIEVEMENT_ICONS.map((ic) => (
                        <option key={ic} value={ic}>{ic}</option>
                      ))}
                    </select>
                    <input
                      value={a.title}
                      onChange={(e) => updateAchievement(i, "title", e.target.value)}
                      placeholder="Title"
                      className="flex-1 text-xs bg-[#f5efdc] border border-white/[0.07] rounded-md px-2 py-1.5 text-[#1a2540] outline-none focus:border-blue-500/50"
                    />
                    <input
                      value={a.subtitle}
                      onChange={(e) => updateAchievement(i, "subtitle", e.target.value)}
                      placeholder="Subtitle"
                      className="flex-1 text-xs bg-[#f5efdc] border border-white/[0.07] rounded-md px-2 py-1.5 text-[#1a2540] outline-none focus:border-blue-500/50"
                    />
                    <button
                      type="button"
                      onClick={() => removeAchievement(i)}
                      className="text-red-500 hover:text-red-700 cursor-pointer text-sm shrink-0"
                      title="Remove"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                {draft.achievements.length === 0 && (
                  <p className="text-[11px] text-[#5a6a85] text-center py-2">No achievements yet — click + Add above.</p>
                )}
              </div>
            ) : (
              <div className="flex gap-2 flex-wrap">
                {profile.achievements.map((a, i) => (
                  <div key={i} className="flex-1 min-w-[80px] text-center p-2.5 bg-[#ece4c8] rounded-xl">
                    <div className="text-2xl">{a.icon}</div>
                    <div className="text-[11px] text-[#5a6a85] mt-1 leading-snug">
                      {a.title}
                      <br />
                      {a.subtitle}
                    </div>
                  </div>
                ))}
                {profile.achievements.length === 0 && (
                  <p className="text-[11px] text-[#5a6a85] w-full text-center py-2">No achievements added yet.</p>
                )}
              </div>
            )}
          </Card>
        </div>

        <div>
          <Card className="mb-3">
            <SectionTitle>My projects</SectionTitle>
            {MYPROJECTS.map((p, i) => (
              <div key={i} className="flex items-center gap-3 py-2.5 border-b border-white/[0.07] last:border-0">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-base ${p.bg} shrink-0`}>
                  {p.icon}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{p.name}</div>
                  <div className="text-[11px] text-[#5a6a85] mt-0.5 flex items-center gap-1.5">
                    {p.meta} · <Pill color={p.sc} className="text-[10px]">{p.status}</Pill>
                  </div>
                </div>
                <Btn variant="ghost" size="sm" onClick={() => onNavigate("projects")}>View ↗️</Btn>
              </div>
            ))}
          </Card>

          <Card>
            <SectionTitle>Uploaded resources</SectionTitle>
            {MYRESOURCES.map((r, i) => (
              <div key={i} className="flex items-center gap-3 py-2.5 border-b border-white/[0.07] last:border-0">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 shrink-0">📄</div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{r.name}</div>
                  <div className="text-[11px] text-[#5a6a85] mt-0.5">{r.meta}</div>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </PageWrap>
  );
}