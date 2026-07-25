const asyncHandler = require("../../middleware/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");

const pyqService = require("./pyq.service");

const uploadPyq = asyncHandler(async (req, res) => {

    console.log(req.body);
    console.log(req.file);
    const pyq = await pyqService.uploadPyq(
        req.user._id,
        req.file,
        req.body
    );

    res.status(201).json(
        new ApiResponse(
            201,
            "PYQ uploaded successfully. Awaiting admin approval.",
            pyq
        )
    );

});

const getAllPyqs = asyncHandler(async (req, res) => {

    const result =
        await pyqService.getAllPyqs(req.query);

    res.status(200).json(

        new ApiResponse(

            200,

            "PYQs fetched successfully",

            result

        )

    );

});

const getPyqById = asyncHandler(async (req, res) => {

    const pyq = await pyqService.getPyqById(
        req.params.id
    );

    res.status(200).json(

        new ApiResponse(

            200,

            "PYQ fetched successfully",

            pyq

        )

    );

});

const getPendingPyqs = asyncHandler(async (req, res) => {

    const pyqs = await pyqService.getPendingPyqs();

    res.status(200).json(
        new ApiResponse(
            200,
            "Pending PYQs fetched successfully",
            pyqs
        )
    );

});

const approvePyq = asyncHandler(async (req, res) => {

    const pyq = await pyqService.approvePyq(
        req.params.id
    );

    res.status(200).json(
        new ApiResponse(
            200,
            "PYQ approved successfully",
            pyq
        )
    );

});

const deletePyq = asyncHandler(async (req, res) => {

    await pyqService.deletePyq(
        req.params.id
    );

    res.status(200).json(
        new ApiResponse(
            200,
            "PYQ deleted successfully"
        )
    );

});

module.exports = {
    uploadPyq,
    getAllPyqs,
    getPyqById,
    getPendingPyqs,
    approvePyq,
    deletePyq
};