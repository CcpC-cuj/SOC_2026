const Project = require("../project/project.model");
const ApiError = require("../../utils/ApiError");
const generateInviteCode = require("../../utils/generateInviteCode");


// Create Project
const createProject = async (userId, projectData) => {

    let inviteCode = generateInviteCode();

    // Ensure invite code is unique
    while (await Project.findOne({ inviteCode })) {
        inviteCode = generateInviteCode();
    }

    const project = await Project.create({
        ...projectData,
        owner: userId,
        inviteCode,
        members: [userId]
    });

    return project;
};


// Get All Projects
const getAllProjects = async () => {

    const projects = await Project.find()
    .populate("owner", "name email")
    .populate("members", "name email")
    .populate("pendingRequests", "name email"); 
    return projects;
};


// Get Single Project
const getProjectById = async (projectId) => {

    const project = await Project.findById(projectId)
        .populate("owner", "name email")
        .populate("members", "name email")
        .populate("pendingRequests", "name email");

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    return project;
};


// Join Project using Invite Code
const joinProject = async (inviteCode, userId) => {

    const project = await Project.findOne({ inviteCode });

    if (!project) {
        throw new ApiError(404, "Invalid Invite Code");
    }

    if (project.status === "Closed") {
        throw new ApiError(400, "Recruitment Closed");
    }

    if (project.members.includes(userId)) {
        throw new ApiError(400, "Already a team member");
    }

    if (project.pendingRequests.includes(userId)) {
        throw new ApiError(400, "Request already sent");
    }

    project.pendingRequests.push(userId);

    await project.save();

    return project;
};


// Accept Join Request
const approveRequest = async (
    projectId,
    userId,
    ownerId
) => {

    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    console.log("Project Owner:", project.owner.toString());
    console.log("Logged-in User:", ownerId.toString());
    // Only owner can approve
    if (project.owner.toString() !== ownerId.toString()) {
        throw new ApiError(
            403,
            "Only owner can approve requests"
        );
    }

    // User must have requested to join
    if (!project.pendingRequests.includes(userId)) {
        throw new ApiError(
            400,
            "Join request not found"
        );
    }

    // Prevent duplicate members
    if (project.members.includes(userId)) {
        throw new ApiError(
            400,
            "User is already a member"
        );
    }

    // Remove from pending requests
    project.pendingRequests.pull(userId);

    // Add to members
    project.members.push(userId);

    // Close project if full
    if (project.members.length >= project.maxMembers) {
        project.status = "Closed";
    }

    await project.save();


    return await Project.findById(projectId)
        .populate("owner", "name email")
        .populate("members", "name email")
        .populate("pendingRequests", "name email");
};


const getPendingRequests = async (ownerId) => {

    const projects = await Project.find({
        owner: ownerId,
        pendingRequests: { $exists: true, $ne: [] }
    })
        .populate("pendingRequests", "name email")
        .populate("members", "name")
        .populate("owner", "name");

    return projects;

};



// Reject Join Request
const rejectRequest = async (projectId, ownerId, userId) => {

    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    if (project.owner.toString() !== ownerId.toString()) {
        throw new ApiError(403, "Only owner can reject requests");
    }

    project.pendingRequests.pull(userId);

    await project.save();

    return project;
};


// Delete Project
const deleteProject = async (projectId, ownerId) => {

    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    if (project.owner.toString() !== ownerId.toString()) {
        throw new ApiError(403, "Only owner can delete project");
    }

    await project.deleteOne();
};


module.exports = {
    createProject,
    getAllProjects,
    getProjectById,
    joinProject,
    approveRequest,
    rejectRequest,
    deleteProject,
    getPendingRequests
};
