const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middleware/auth.middleware");
const validate = require("../../middleware/validate.middleware");
const authorize = require("../../middleware/authorize");
const upload = require("../../middleware/upload.middleware");

const createResourceSchema = require("../../validations/resource.validation");

const resourceController = require("./resource.controller");


//GET
router.get("/", resourceController.getAllResources);
router.get("/my/recent",authMiddleware, resourceController.getMyRecentResources);

//POST
router.post("/", authMiddleware, upload.single("file"), resourceController.createResource);

router.get("/:id", resourceController.getResourceById);
router.get("/:id/download", resourceController.downloadResource);




module.exports = router;