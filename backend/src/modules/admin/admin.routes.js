const express = require("express");

const router = express.Router();

const authMiddleware = require("../../middleware/auth.middleware");
const adminMiddleware = require("../../middleware/authorize");

const adminController = require("./admin.controller");

router.get(
    "/dashboard",
    authMiddleware,
    adminMiddleware("admin"),
    adminController.getDashboard
);

router.get(
    "/resumes",
    authMiddleware,
    adminMiddleware("admin"),
    adminController.getAllResumes
);

router.get(
    "/pyqs/pending",
    authMiddleware,
    adminMiddleware("admin"),
    adminController.getPendingPyqs
);

router.patch(
    "/pyqs/:id/approve",
    authMiddleware,
    adminMiddleware("admin"),
    adminController.approvePyq
);

router.delete(
    "/pyqs/:id",
    authMiddleware,
    adminMiddleware("admin"),
    adminController.deletePyq
);

router.get(
    "/resources/pending", 
    authMiddleware, 
    adminMiddleware("admin"), 
    adminController.getPendingResources
);

router.patch(
    "/resources/:id/approve",
    authMiddleware, 
    adminMiddleware("admin"),
    adminController.approveResource
);

router.delete(
    "/resources/:id",
    authMiddleware, 
    adminMiddleware("admin"), 
    adminController.deleteResource);



module.exports = router;