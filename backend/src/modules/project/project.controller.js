    const asyncHandler = require("../../middleware/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");

const projectService = require("../project/project.service");


// Create Project
const createProject = asyncHandler(async (req, res) => {

    const project = await projectService.createProject(
        req.user._id,
        req.body
    );

    res.status(201).json(
        new ApiResponse(
            201,
            "Project created successfully",-
            project
        )
    );

});

const getPendingRequests = asyncHandler(async (req, res) => {

    const projects = await projectService.getPendingRequests(
        req.user._id
    );

    res.status(200).json(
        new ApiResponse(
            200,
            "Pending requests fetched successfully",
            projects
        )
    );

});


// Get All Projects
const getAllProjects = asyncHandler(async (req, res) => {

    const projects = await projectService.getAllProjects();

    res.status(200).json(
        new ApiResponse(
            200,
            "Projects fetched successfully",
            projects
        )
    );

});


// Get Single Project
const getProjectById = asyncHandler(async (req, res) => {

    const project = await projectService.getProjectById(
        req.params.id
    );

    res.status(200).json(
        new ApiResponse(
            200,
            "Project fetched successfully",
            project
        )
    );

});


// Join Project
const joinProject = asyncHandler(async (req, res) => {

    const project = await projectService.joinProject(
        req.params.inviteCode,
        req.user._id
    );

    res.status(200).json(
        new ApiResponse(
            200,
            "Join request sent successfully",
            project
        )
    );

});


// Accept Join Request
const acceptRequest = asyncHandler(async (req, res) => {

    const project = await projectService.approveRequest(
         req.params.id,
    req.params.userId,
    req.user._id
    );

    res.status(200).json(
        new ApiResponse(
            200,
            "Request accepted successfully",
            project
        )
    );

});


// Reject Join Request
const rejectRequest = asyncHandler(async (req, res) => {

    const project = await projectService.rejectRequest(
        req.params.id,
        req.user._id,
        req.params.userId
    );

    res.status(200).json(
        new ApiResponse(
            200,
            "Request rejected successfully",
            project
        )
    );

});


// Delete Project
const deleteProject = asyncHandler(async (req, res) => {

    await projectService.deleteProject(
        req.params.id,
        req.user._id
    );

    res.status(200).json(
        new ApiResponse(
            200,
            "Project deleted successfully"
        )
    );

});


module.exports = {
    createProject,
    getAllProjects,
    getProjectById,
    joinProject,
    acceptRequest,
    rejectRequest,
    deleteProject,
    getPendingRequests
};