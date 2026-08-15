import { useEffect, useState } from "react";
import { Btn, PageWrap, Avatar } from "../ui";
import { getConversations } from "../../api/conversations";
import {
  getMessages,
  sendMessage,
} from "../../api/messages";

export default function Messages({ onNavigate }) {
  const [conversations, setConversations] = useState([]);
  const [activeConvo, setActiveConvo] = useState(null);
  const [messages, setMessages] = useState([]);

  const [messageText, setMessageText] = useState("");

  const [loadingConversations, setLoadingConversations] =
    useState(true);

  const [loadingMessages, setLoadingMessages] =
    useState(false);

  const [sending, setSending] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      setLoadingConversations(true);
      setError("");

      const data = await getConversations();

      setConversations(data);

      if (data.length > 0) {
        setActiveConvo(data[0]);
      }
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
        "Failed to load conversations"
      );
    } finally {
      setLoadingConversations(false);
    }
  };

  useEffect(() => {
    if (!activeConvo?._id) return;

    fetchMessages(activeConvo._id);
  }, [activeConvo]);

  const fetchMessages = async (conversationId) => {
    try {
      setLoadingMessages(true);
      setError("");

      const data = await getMessages(
        conversationId
      );

      setMessages(data);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
        "Failed to load messages"
      );
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleSendMessage = async () => {
    const content = messageText.trim();

    if (!content || !activeConvo || sending) {
      return;
    }

    try {
      setSending(true);
      setError("");

      const newMessage = await sendMessage(
        activeConvo._id,
        content
      );

      setMessages((prev) => [
        ...prev,
        newMessage,
      ]);

      setMessageText("");

      setConversations((prev) =>
        prev.map((conversation) =>
          conversation._id === activeConvo._id
            ? {
                ...conversation,
                lastMessage: newMessage,
                updatedAt: newMessage.createdAt,
              }
            : conversation
        )
      );

    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
        "Failed to send message"
      );
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getOtherUser = (conversation) => {
    const currentUserId =
      JSON.parse(
        localStorage.getItem("user")
      )?._id;

    return conversation?.participants?.find(
      (user) =>
        user._id !== currentUserId
    );
  };

  const getInitials = (name = "") => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const formatTime = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  if (loadingConversations) {
    return (
      <PageWrap
        title="Messages"
        subtitle="Direct conversations"
      >
        <div className="text-center py-10 text-[#5a6a85]">
          Loading conversations...
        </div>
      </PageWrap>
    );
  }

  return (
    <PageWrap
      title="Messages"
      subtitle="Direct conversations — share repos, discuss projects"
    >
      {error && (
        <div className="mb-3 rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2 text-sm text-red-600">
          {error}
        </div>
      )}

      <div
        className="flex bg-[#f5efdc] border border-black/10 rounded-xl overflow-hidden"
        style={{ minHeight: 500 }}
      >

        {/* Conversation List */}
        <div className="w-64 border-r border-black/10 flex flex-col shrink-0">

          <div className="p-2.5 border-b border-black/10">
            <input
              placeholder="🔍 Search conversations..."
              className="w-full bg-[#ece4c8] border border-black/10 rounded-lg px-2.5 py-1.5 text-xs text-[#1a2540] placeholder-[#5a6a85] outline-none"
            />
          </div>

          <div className="flex-1 overflow-y-auto">

            {conversations.length === 0 ? (
              <div className="p-5 text-center text-xs text-[#5a6a85]">
                No conversations yet.
              </div>
            ) : (
              conversations.map((conversation) => {

                const otherUser =
                  getOtherUser(conversation);

                return (
                  <button
                    key={conversation._id}
                    onClick={() =>
                      setActiveConvo(
                        conversation
                      )
                    }
                    className={`w-full flex items-center gap-2.5 p-2.5 border-b border-black/10 transition-colors cursor-pointer text-left ${
                      activeConvo?._id ===
                      conversation._id
                        ? "bg-[#ece4c8]"
                        : "bg-transparent hover:bg-white/3"
                    }`}
                  >

                    <Avatar
                      initials={getInitials(
                        otherUser?.name
                      )}
                      colorIndex={0}
                    />

                    <div className="flex-1 min-w-0">

                      <div className="text-xs font-medium text-[#1a2540]">
                        {otherUser?.name ||
                          "Unknown User"}
                      </div>

                      <div className="text-[11px] text-[#5a6a85] truncate mt-0.5">
                        {conversation
                          .lastMessage
                          ?.content ||
                          "No messages yet"}
                      </div>

                    </div>

                  </button>
                );
              })
            )}

          </div>
        </div>

        {/* Chat */}
        <div className="flex-1 flex flex-col">

          {!activeConvo ? (
            <div className="flex-1 flex items-center justify-center text-[#5a6a85] text-sm">
              Select a conversation to start chatting.
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="p-3 border-b border-black/10 flex items-center gap-2.5">

                {(() => {
                  const otherUser =
                    getOtherUser(activeConvo);

                  return (
                    <>
                      <Avatar
                        initials={getInitials(
                          otherUser?.name
                        )}
                        size="sm"
                        colorIndex={0}
                      />

                      <div>
                        <div className="text-sm font-medium text-[#1a2540]">
                          {otherUser?.name ||
                            "Unknown User"}
                        </div>

                        <div className="text-[11px] text-[#5a6a85]">
                          {otherUser?.email}
                        </div>
                      </div>
                    </>
                  );
                })()}

                <div className="ml-auto">
                  <Btn
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      onNavigate("profile")
                    }
                  >
                    👤 Profile
                  </Btn>
                </div>

              </div>

              {/* Messages */}
              <div className="flex-1 p-3.5 flex flex-col gap-2.5 overflow-y-auto">

                {loadingMessages ? (
                  <div className="text-center py-10 text-xs text-[#5a6a85]">
                    Loading messages...
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center text-xs text-[#5a6a85]">
                    No messages yet. Say hello 👋
                  </div>
                ) : (
                  messages.map((message) => {

                    const currentUser =
                      JSON.parse(
                        localStorage.getItem(
                          "user"
                        )
                      );

                    const isMine =
                      message.sender?._id ===
                      currentUser?._id;

                    return (
                      <div
                        key={message._id}
                        className={`flex gap-2 items-end ${
                          isMine
                            ? "flex-row-reverse"
                            : ""
                        }`}
                      >

                        {!isMine && (
                          <Avatar
                            initials={getInitials(
                              message.sender?.name
                            )}
                            size="sm"
                            colorIndex={0}
                          />
                        )}

                        <div>

                          <div
                            className={`px-3 py-2 rounded-xl text-sm leading-relaxed max-w-xs ${
                              isMine
                                ? "bg-blue-500 text-white rounded-br-sm"
                                : "bg-[#ece4c8] text-[#1a2540] rounded-bl-sm"
                            }`}
                          >
                            {message.content}
                          </div>

                          <div
                            className={`text-[10px] text-[#5a6a85] mt-1 ${
                              isMine
                                ? "text-right"
                                : ""
                            }`}
                          >
                            {formatTime(
                              message.createdAt
                            )}
                          </div>

                        </div>

                      </div>
                    );
                  })
                )}

              </div>

              {/* Composer */}
              <div className="p-2.5 border-t border-black/10 flex gap-2 items-center">

                <input
                  value={messageText}
                  onChange={(e) =>
                    setMessageText(
                      e.target.value
                    )
                  }
                  onKeyDown={handleKeyDown}
                  disabled={sending}
                  placeholder="Type a message..."
                  className="flex-1 bg-[#ece4c8] border border-black/10 rounded-full px-3 py-2 text-sm text-[#1a2540] placeholder-[#5a6a85] outline-none disabled:opacity-60"
                />

                <button
                  onClick={handleSendMessage}
                  disabled={
                    sending ||
                    !messageText.trim()
                  }
                  className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-base hover:bg-blue-600 transition-colors cursor-pointer border-0 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {sending ? "..." : "➤"}
                </button>

              </div>
            </>
          )}

        </div>

      </div>
    </PageWrap>
  );
}