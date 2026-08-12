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

const downloadPyq = asyncHandler(async(req, res)=>{
    const result = await pyqService.downloadPyq(req.params.id);
    res.status(200).json(
        new ApiResponse(200, "File start Dowloading", result)
    );
});


module.exports = {
    uploadPyq,
    getAllPyqs,
    getPyqById,
    downloadPyq,
};