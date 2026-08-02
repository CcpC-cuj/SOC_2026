import API from "./axios";

// Create Project
export const createProject = (data) => {
    return API.post("/projects", data);
};
 
// Get All Projects
export const getProjects = () => {
    return API.get("/projects");
};

// Get Single Project
export const getProject = (projectId) => {
    return API.get(`/projects/${projectId}`);
};

// Join Project using Invite Code
export const joinProject = (inviteCode) => {
    return API.post(`/projects/join/${inviteCode}`);
};

// Approve Join Request
export const approveRequest = (projectId, userId) => {
    return API.patch(`/projects/${projectId}/approve/${userId}`);
};

// Reject Join Request
export const rejectRequest = (projectId, userId) => {
    return API.patch(`/projects/${projectId}/reject/${userId}`);
};

// Get Pending Requests of Logged-in Owner
export const getPendingRequests = () => {
    return API.get("/projects/my-requests");
};

// Delete Project
export const deleteProject = (projectId) => {
    return API.delete(`/projects/${projectId}`);
};