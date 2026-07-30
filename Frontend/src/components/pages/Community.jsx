import { useEffect, useState } from "react";
import { Pill, Btn, FilterChips, PageWrap, Avatar } from "../ui";
import {
    getAllPosts,
    toggleUpvote,
    toggleDownvote,
    createPost,
} from "../../api/community";

const COMMENTS = [
  { initials: "RK", colorIndex: 0, name: "Rahul Kumar", sem: "Sem 6", text: "A process is an independent program in execution with its own memory space. A thread is the smallest unit of execution within a process, sharing the process's memory. Multiple threads communicate faster than inter-process communication.", votes: 31 },
  { initials: "SM", colorIndex: 4, name: "Sneha Mishra", sem: "Sem 5", text: "Key difference: context switch between processes is heavy (saves full PCB) while between threads is lightweight (shared address space). Threads share heap but have separate stacks.", votes: 18 },
];

export default function Community({ onNavigate }) {
  const [posts, setPosts] = useState([]);
  const [activeThread, setActiveThread] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [newPost, setNewPost] = useState({
      title: "",
      content: "",
  });

  const [creating, setCreating] = useState(false);

  const fetchPosts = async () => {
    try {
        const data = await getAllPosts();

        setPosts(data.posts);

        if (data.posts.length > 0) {
            setActiveThread((prev) => {
                if (!prev) return data.posts[0];

                return (
                    data.posts.find((post) => post._id === prev._id) ||
                    data.posts[0]
                );
            });
        }
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
};

const handleUpvote = async (postId) => {
    try {
        await toggleUpvote(postId);
        await fetchPosts();
    } catch (err) {
        console.error(err);
    }
};

const handleDownvote = async (postId) => {
    try {
        await toggleDownvote(postId);
        await fetchPosts();
    } catch (err) {
        console.error(err);
    }
};

const handleCreatePost = async () => {

    if (!newPost.title.trim() || !newPost.content.trim()) {
        return;
    }

    try {

        setCreating(true);

        await createPost(newPost);

        setNewPost({
            title: "",
            content: "",
        });

        setShowCreateModal(false);

        await fetchPosts();

    } catch (err) {

        console.error(err);

    } finally {

        setCreating(false);

    }

};

useEffect(() => {
    fetchPosts();
}, []);

  if (loading) {
        return (
            <PageWrap title="Community">
                Loading...
            </PageWrap>
        );
    }

    if (!activeThread) {
        return (
            <PageWrap title="Community">
                No posts found.
            </PageWrap>
        );
    }

  return (
    <PageWrap
      title="Community"
      subtitle="Discuss doubts, share opportunities, find mentors"
      action={
    <Btn onClick={() => setShowCreateModal(true)}>
        + New Thread
    </Btn>
}
    >
      <div className="mb-3">
        <FilterChips chips={["All","Doubts","Hackathon","Mentorship","Projects"]} active={filter} onChange={setFilter} />
      </div>

      <div className="grid gap-3" style={{ gridTemplateColumns: "340px 1fr" }}>
        {/* Thread list */}
        <div>
          {posts.map((t) => (
            <button
              key={t._id}
              onClick={() => setActiveThread(t)}
              className={`w-full text-left p-3 rounded-xl mb-1.5 border transition-all duration-150 cursor-pointer
                ${activeThread?._id === t._id
                  ? "border-blue-500/40 bg-blue-500/5"
                  : "border-black/10 bg-[#f5efdc] hover:border-white/15"
                }`}
            >
              <div className="flex gap-1.5 mb-1.5">
                <Pill color={t.tagColor}>{t.tag}</Pill>
                {t.subject && <Pill color="gray">{t.subject}</Pill>}
              </div>
              <div className="flex items-center gap-2 mb-2">

    <Avatar
        src={t.author?.avatar}
        initials={t.author?.name
            ?.split(" ")
            .map(word => word[0])
            .join("")}
    />

    <div>

        <div className="text-sm font-medium">
            {t.author?.name}
        </div>

        <div className="text-[11px] text-[#5a6a85]">
            {new Date(t.createdAt).toLocaleDateString()}
        </div>

    </div>

</div>

<div className="text-sm font-medium leading-snug mb-1">
    {t.title}
</div>

              <p className="text-xs text-[#5a6a85] line-clamp-2 mb-2">
                {t.content}
              </p>

              <div className="flex items-center gap-2 text-[11px] text-[#5a6a85]">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpvote(t._id);
                  }}
                  className="text-xs hover:text-green-600"
              >
                👍{t.upvotes.length}
              </button>

                <button
                 onClick={(e) => {
                  e.stopPropagation();
                  handleDownvote(t._id);
                  }}
                 className="text-xs hover:text-red-600"
                >
                  👎{t.downvotes.length}
                </button>

                <span>{new Date(t.createdAt).toLocaleDateString()}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Thread detail */}
        <div className="bg-[#f5efdc] border border-black/10 rounded-xl p-4">
          {/* Thread header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex gap-1.5 mb-1.5">
                <Pill color={activeThread.tagColor}>{activeThread.tag}</Pill>
                {activeThread.subject && <Pill color="gray">{activeThread.subject} · Sem 5</Pill>}
              </div>
              <h2 className="font-['Syne',sans-serif] text-base font-semibold leading-snug">{activeThread.title}</h2>
              <p className="text-xs text-[#5a6a85] mt-1.5">
                Posted by {activeThread?.author?.name}
              </p>

              <p className="text-sm mt-4 leading-relaxed">
                {activeThread?.content}
              </p>

              <div className="flex gap-3 mt-4">

    <Btn
        variant="ghost"
        onClick={() => handleUpvote(activeThread._id)}
    >
        👍 {activeThread.upvotes.length}
    </Btn>

    <Btn
        variant="ghost"
        onClick={() => handleDownvote(activeThread._id)}
    >
        👎 {activeThread.downvotes.length}
    </Btn>

</div>

            </div>
            <div className="flex gap-1.5 shrink-0">
              <Btn variant="ghost" size="sm" onClick={() => onNavigate("doubts")}>Ask AI 🧠</Btn>
              <Btn variant="ghost" size="sm" onClick={() => onNavigate("messages")}>💌 DM</Btn>
              {activeThread.tag === "Hackathon" && (
                <Btn variant="ghost" size="sm" onClick={() => onNavigate("projects")}>Post to Projects ↗</Btn>
              )}
            </div>
          </div>

          

          {/* Reply box */}
          <div className="bg-[#ece4c8] border border-black/10 rounded-xl px-3 py-2.5 text-sm text-[#5a6a85] cursor-text mt-2">
            Write a reply…
          </div>
        </div>
      </div>

      {showCreateModal && (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

        <div className="bg-[#f5efdc] rounded-xl p-6 w-full max-w-lg">

            <h2 className="text-xl font-semibold mb-5">
                Create New Thread
            </h2>

            <input
                type="text"
                placeholder="Title"
                value={newPost.title}
                onChange={(e) =>
                    setNewPost({
                        ...newPost,
                        title: e.target.value,
                    })
                }
                className="w-full mb-4 border rounded-lg px-3 py-2"
            />

            <textarea
                rows={6}
                placeholder="What's on your mind?"
                value={newPost.content}
                onChange={(e) =>
                    setNewPost({
                        ...newPost,
                        content: e.target.value,
                    })
                }
                className="w-full border rounded-lg px-3 py-2"
            />

            <div className="flex justify-end gap-3 mt-5">

                <Btn
                    variant="ghost"
                    onClick={() => setShowCreateModal(false)}
                >
                    Cancel
                </Btn>

                <Btn
                    disabled={creating}
                    onClick={handleCreatePost}
                >
                    {creating ? "Posting..." : "Post"}
                </Btn>

            </div>

        </div>

    </div>

)}
    </PageWrap>
  );
}