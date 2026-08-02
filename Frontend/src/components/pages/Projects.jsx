import { useState, useEffect } from "react";
import { Pill, Btn, FilterChips, PageWrap, Avatar } from "../ui";

import {
  getProjects,
  joinProject,
  createProject,
  approveRequest,
  rejectRequest,
  getPendingRequests

} from "../../api/project";
const FILTERS = [
  "All",
  "Open slots",
  "Hackathons",
  "Side projects",
  "ML/AI",
  "Web dev"
];

export default function Projects({ onNavigate, user }) {

  const [projects, setProjects] = useState([]);
  const [joined, setJoined] = useState({});
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [pendingProjects, setPendingProjects] = useState([]);
  const [approving, setApproving] = useState({});
  const [rejecting, setRejecting] = useState({});

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    maxMembers: 4,
    repoLink: "",
    tags: ""
  });

  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchProjects();
    fetchPendingRequests();
  }, []);

  const fetchProjects = async () => {
    try {

      const res = await getProjects();

      setProjects(res.data.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }
  };

  const fetchPendingRequests = async () => {

    try {

      const res = await getPendingRequests();

      setPendingProjects(res.data.data);

    } catch (err) {

      console.log(err);

    }

  };
  const handleJoin = async (inviteCode, projectId) => {

    try {

      await joinProject(inviteCode);

      setJoined((prev) => ({
        ...prev,
        [projectId]: true
      }));

      fetchProjects();

      alert("Join request sent successfully!");

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        "Unable to join project"
      );

    }

  };

  const handleCreateProject = async () => {

    if (
      !newProject.title.trim() ||
      !newProject.description.trim()
    ) {
      return;
    }

    try {

      setCreating(true);

      await createProject({
        title: newProject.title,
        description: newProject.description,
        maxMembers: newProject.maxMembers,
        repoLink: newProject.repoLink,
        tags: newProject.tags
          .split(",")
          .map(tag => tag.trim())
      });

      setShowCreateModal(false);

      setNewProject({
        title: "",
        description: "",
        maxMembers: 4,
        repoLink: "",
        tags: ""
      });

      fetchProjects();

    } catch (err) {

      console.log(err);

    } finally {

      setCreating(false);

    }

  };

  const handleApprove = async (projectId, userId) => {
    try {

      setApproving(prev => ({
        ...prev,
        [userId]: true
      }));

      await approveRequest(projectId, userId);

      await fetchProjects();
      await fetchPendingRequests();

    } catch (err) {

      console.log(err);

    } finally {

      setApproving(prev => ({
        ...prev,
        [userId]: false
      }));

    }
  };

  const handleReject = async (projectId, userId) => {

    try {

        setRejecting(prev => ({
            ...prev,
            [userId]: true
        }));

        await rejectRequest(projectId, userId);

        await fetchProjects();
        await fetchPendingRequests();

    } catch (err) {

        console.log(err);

    } finally {

        setRejecting(prev => ({
            ...prev,
            [userId]: false
        }));

    }

};

  if (loading) {

    return (
      <PageWrap title="Projects">
        Loading...
      </PageWrap>
    );

  }

  const isMember = (project) => {
    return project.members.some(
      (member) => member._id === user._id
    );
  };

  return (
    <PageWrap
      title="Projects & Hackathons"
      subtitle="Find teammates, share repos, collaborate on builds"
      action={
        <Btn onClick={() => setShowCreateModal(true)}>
          + Post Project
        </Btn>
      }
    >
      <div className="mb-4">
        <FilterChips
          chips={FILTERS}
          active={filter}
          onChange={setFilter}
        />
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          {projects.map((p) => (
            <div
              key={p._id}
              className="bg-[#f5efdc] border border-black/10 rounded-xl p-3.5 flex flex-col"
            >
              {/* Status */}
              <div className="flex items-center justify-between mb-2">
                <Pill>{p.status}</Pill>

                <Pill>
                  {(p.members?.length || 0)}/{p.maxMembers}
                </Pill>
              </div>

              {/* Title */}
              <div className="font-semibold mb-2">
                {p.title}
              </div>

              {/* Description */}
              <div className="text-xs text-[#5a6a85] mb-3">
                {p.description}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {p.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-1 rounded border"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Members */}
              <div className="mb-3">
                <span className="text-xs">
                  Members :
                  {" "}
                  {(p.members?.length || 0)}
                  /
                  {p.maxMembers}
                </span>
              </div>

              {/* Invite Code */}
              <div className="text-xs text-blue-600 mb-3">
                Invite :
                {" "}
                {p.inviteCode}
              </div>

              {/* Buttons */}
              <div className="flex gap-2">

                {p.repoLink ? (
                  <a
                    href={p.repoLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center border rounded-lg py-1 text-xs"
                  >
                    Repo
                  </a>
                ) : (
                  <button
                    disabled
                    className="flex-1 border rounded-lg py-1 text-xs opacity-50"
                  >
                    No Repo
                  </button>
                )}

                <button
                  onClick={() => onNavigate("messages")}
                  className="flex-1 border rounded-lg py-1 text-xs"
                >
                  Message
                </button>

                {p.owner._id === user._id ? (

                  <button
                    disabled
                    className="flex-1 py-1.5 rounded-lg text-[11px] bg-gray-300 text-gray-600 cursor-not-allowed"
                  >
                    Your Project
                  </button>

                ) : isMember(p) ? (

                  <button
                    disabled
                    className="flex-1 py-1.5 rounded-lg text-[11px] bg-green-100 text-green-700 cursor-not-allowed"
                  >
                    ✓ Joined
                  </button>

                ) : p.members.length >= p.maxMembers ? (

                  <button
                    disabled
                    className="flex-1 py-1.5 rounded-lg text-[11px] border border-black/10 bg-transparent text-[#5a6a85] opacity-40 cursor-not-allowed"
                  >
                    Team Full
                  </button>

                ) : joined[p._id] ? (

                  <button
                    className="flex-1 py-1.5 rounded-lg text-[11px] bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 cursor-default"
                  >
                    ✓ Requested
                  </button>

                ) : (

                  <button
                    onClick={() => handleJoin(p.inviteCode, p._id)}
                    className="flex-1 py-1.5 rounded-lg text-[11px] bg-blue-500 text-white hover:bg-blue-600 transition-colors cursor-pointer"
                  >
                    + Join
                  </button>

                )}

              </div>

              {/* Pending Requests */}



            </div>
          ))}
        </div>

        {/* Right Side - Pending Requests */}

        {pendingProjects.length > 0 && (

          <div className="col-span-4">

            <div className="bg-[#f5efdc] rounded-xl p-4 border border-black/10 sticky top-5">

              <h2 className="text-lg font-semibold mb-4">
                Pending Join Requests
              </h2>

              {pendingProjects.map((project) => (

                <div
                  key={project._id}
                  className="mb-6"
                >

                  <h3 className="font-semibold mb-2">
                    {project.title}
                  </h3>

                  {project.pendingRequests.length === 0 ? (

                    <p className="text-xs text-gray-500">
                      No Pending Requests
                    </p>

                  ) : (

                    project.pendingRequests.map((user) => (

                      <div
                        key={user._id}
                        className="flex justify-between items-center py-2 border-b"
                      >

                        <div>

                          <p className="font-medium">
                            {user.name}
                          </p>

                          <p className="text-xs text-gray-500">
                            {user.email}
                          </p>

                        </div>

                        <div className="flex gap-2">

                          <button
                            onClick={() => handleApprove(project._id, user._id)}
                            disabled={approving[user._id]}
                            className={`px-3 py-1 rounded-lg text-white ${approving[user._id]
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-600 hover:bg-green-700"
                              }`}
                          >
                            {approving[user._id] ? "Approving..." : "Approve"}
                          </button>

                          <button
                            onClick={() =>
                              handleReject(project._id, pendingUser._id)
                            }
                            disabled={rejecting[pendingUser._id]}
                            className={`px-3 py-1 rounded-lg text-white transition ${rejecting[pendingUser._id]
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-red-500 hover:bg-red-600"
                              }`}
                          >
                            {rejecting[pendingUser._id]
                              ? "Rejecting..."
                              : "Reject"}
                          </button>

                        </div>

                      </div>

                    ))

                  )}

                </div>

              ))}

            </div>

          </div>

        )}

      </div>

      {showCreateModal && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-[#f5efdc] rounded-xl p-6 w-full max-w-lg">

            <h2 className="text-xl font-semibold mb-5">
              Create Project
            </h2>

            <input
              type="text"
              placeholder="Project Title"
              value={newProject.title}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  title: e.target.value,
                })
              }
              className="w-full mb-3 border rounded-lg px-3 py-2"
            />

            <textarea
              rows={5}
              placeholder="Project Description"
              value={newProject.description}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  description: e.target.value,
                })
              }
              className="w-full mb-3 border rounded-lg px-3 py-2"
            />

            <input
              type="number"
              placeholder="Max Members"
              value={newProject.maxMembers}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  maxMembers: Number(e.target.value),
                })
              }
              className="w-full mb-3 border rounded-lg px-3 py-2"
            />

            <input
              type="text"
              placeholder="Repository Link"
              value={newProject.repoLink}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  repoLink: e.target.value,
                })
              }
              className="w-full mb-3 border rounded-lg px-3 py-2"
            />

            <input
              type="text"
              placeholder="Tags (React, Node, AI)"
              value={newProject.tags}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  tags: e.target.value,
                })
              }
              className="w-full mb-3 border rounded-lg px-3 py-2"
            />

            <div className="flex justify-end gap-3">

              <Btn
                variant="ghost"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </Btn>

              <Btn
                disabled={creating}
                onClick={handleCreateProject}
              >
                {creating ? "Creating..." : "Create"}
              </Btn>

            </div>

          </div>

        </div>

      )}
    </PageWrap>
  );
}