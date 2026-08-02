const asyncHandler = require("../../middleware/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");

const adminService = require("./admin.services");

const getDashboard = asyncHandler(async (req, res) => {

    const dashboard = await adminService.getDashboard();

    res.status(200).json(
        new ApiResponse(
            200,
            "Dashboard fetched successfully",
            dashboard
        )
    );
});

const getAllResumes = asyncHandler(async (req, res) => {

    const resumes = await adminService.getAllResumes();

    res.status(200).json(
        new ApiResponse(
            200,
            "Resumes fetched successfully",
            resumes
        )

    );

});

const getPendingPyqs = asyncHandler(async (req, res) => {

    const pyqs = await adminService.getPendingPyqs();

    res.status(200).json(
        new ApiResponse(
            200,
            "Pending PYQs fetched successfully",
            pyqs
        )
    );

});

const approvePyq = asyncHandler(async (req, res) => {

    const pyq = await adminService.approvePyq(
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

    await adminService.deletePyq(
        req.params.id
    );

    res.status(200).json(
        new ApiResponse(
            200,
            "PYQ deleted successfully"
        )
    );

});

const approveResource = asyncHandler(async(req, res)=>{

    const resource = await adminService.approveResource(req.params.id);

    res.status(200).json(
        new ApiResponse(200, "Resource approved", resource)
    );
});

const deleteResource = asyncHandler(async(req, res)=>{

    await adminService.deleteResource(req.params.id);

    res.status(200).json(
        new ApiResponse(200, "Resource deleted successfully")
    );
});

const getPendingResources = asyncHandler(async(req, res)=>{

    const resources = await adminService.getPendingResources();

    res.status(200).json(
        new ApiResponse(200, "Fetched Successfully", resources)
    );
});

module.exports = {
    getDashboard,
    getAllResumes,
    getPendingPyqs,
    approvePyq,
    deletePyq,
    approveResource,
    deleteResource,
    getPendingResources
};