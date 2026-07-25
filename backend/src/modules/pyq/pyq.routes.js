const express = require("express");

const router = express.Router();

const authMiddleware = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/authorize");
const validate = require("../../middleware/validate.middleware");
const upload = require("../../middleware/upload.middleware");

const pyqController = require("./pyq.controller");
const { createPyqSchema } = require("../../validations/pyq.validation");

router.get(
    "/",
    pyqController.getAllPyqs
);

router.post(
    "/",
    authMiddleware,
    upload.single("file"),
    validate(createPyqSchema),
    pyqController.uploadPyq
);

router.get(
    "/pending",
    authMiddleware,
    authorize("admin"),
    pyqController.getPendingPyqs
);

router.patch(
    "/:id/approve",
    authMiddleware,
    authorize("admin"),
    pyqController.approvePyq
);

router.delete(
    "/:id",
    authMiddleware,
    authorize("admin"),
    pyqController.deletePyq
);

router.get(
    "/:id",
    pyqController.getPyqById
);

module.exports = router;