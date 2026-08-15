import API from "./axios";

export const getMessages = async (conversationId) => {
  const response = await API.get(
    `/messages/${conversationId}`
  );

  return response.data.data;
};

export const sendMessage = async (
  conversationId,
  content
) => {
  const response = await API.post("/messages", {
    conversationId,
    content,
  });

  return response.data.data;
};