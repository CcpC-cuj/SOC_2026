const express = require("express");

const router = express.Router();

const authMiddleware = require("../../middleware/auth.middleware");
const validate = require("../../middleware/validate.middleware");

const projectController = require("./project.controller");

const {
    createProjectSchema
} = require("../../validations/project.validation");


// Create Project
router.post(
    "/",
    authMiddleware,
    validate(createProjectSchema),
    projectController.createProject
);


// Get All Projects
router.get(
    "/",
    projectController.getAllProjects
);

router.get(
    "/my-requests",
    authMiddleware,
    projectController.getPendingRequests
);  


// Get Single Project
router.get(
    "/:id",
    projectController.getProjectById
);


// Join Project using Invite Code
router.post(
    "/join/:inviteCode",
    authMiddleware,
    projectController.joinProject
);


// Accept Join Request
router.patch(
    "/:id/approve/:userId",
    authMiddleware,
    projectController.acceptRequest
);




// Reject Join Request
router.patch(
    "/:id/reject/:userId",
    authMiddleware,
    projectController.rejectRequest
);


// Delete Project
router.delete(
    "/:id",
    authMiddleware,
    projectController.deleteProject
);

module.exports = router;