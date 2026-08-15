import API from "./axios";

export const getConversations = async () => {
  const response = await API.get("/conversations");

  return response.data.data;
};

export const createConversation = async (userId) => {
  const response = await API.post("/conversations", {
    userId,
  });

  return response.data.data;
};