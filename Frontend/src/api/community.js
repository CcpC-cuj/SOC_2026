import API from "./axios";

export const getAllPosts = async (page = 1, limit = 10) => {
    const { data } = await API.get(`/community?page=${page}&limit=${limit}`);
    return data.data;
};

export const toggleUpvote = async (postId) => {
    const { data } = await API.patch(`/community/${postId}/upvote`);
    return data.data;
};

export const toggleDownvote = async (postId) => {
    const { data } = await API.patch(`/community/${postId}/downvote`);
    return data.data;
};

export const createPost = async (postData) => {
    const { data } = await API.post("/community", postData);
    return data.data;
};