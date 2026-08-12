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
    "/:id",
    pyqController.getPyqById
);

router.get(
    "/:id/download",
    pyqController.downloadPyq
);

module.exports = router;