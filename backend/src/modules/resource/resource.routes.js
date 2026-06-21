const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middleware/auth.middleware");
const validate = require("../../middleware/validate.middleware");
const authorize = require("../../middleware/authorize");

const createResourceSchema = require("../../validations/resource.validation");

const resourceController = require("./resource.controller");


//GET
router.get("/", resourceController.getAllResources);
router.get("/pending", authMiddleware
    , authorize("admin"), resourceController.getPendingResources);


//POST
router.post("/", authMiddleware, validate(createResourceSchema), resourceController.createResource);

//PATCH
router.patch("/:id/approve",authMiddleware, authorize("admin"),resourceController.approveResource);

//DELETE
router.delete("/:id",authMiddleware, authorize("admin"), resourceController.deleteResource);

router.get("/:id", resourceController.getResourceById);



module.exports = router;