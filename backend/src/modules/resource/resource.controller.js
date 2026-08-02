const asyncHandler =require("../../middleware/asyncHandler");

const ApiResponse = require("../../utils/ApiResponse");

const resourceService = require("./resource.service");

const createResource = asyncHandler(async(req, res)=>{
    const resource = await resourceService.createResource(
        req.body,
        req.file, 
        req.user._id);

    res.status(201).json(
        new ApiResponse(201, "Resource Created Successfully", resource)
    );

});

const getAllResources = asyncHandler(async(req, res)=>{

    const page = Number(req.query.page) || 1;
    const limit =Number(req.query.limit) || 10;
    const search =req.query.search || "";
    const subject =req.query.subject || "";
    const semester =req.query.semester? Number(req.query.semester): null;
    const resourceType =req.query.resourceType || "";
    const faculty = req.query.faculty || "";

    const {resources} = await resourceService
    .getAllResources({page, limit, search, subject, semester, resourceType, faculty});

    res.status(200).json(
        new ApiResponse(200, "Resource fetched successfully",{
            resources,
        })
    );
});

const getResourceById = asyncHandler(async(req, res)=>{

    const resource = await resourceService.getResourceById(req.params.id);

    res.status(200).json(
        new ApiResponse(200, "Resource fetched successfully", resource)
    );
});

const getMyRecentResources = asyncHandler(async (req, res) => {
    const resources = await resourceService.getMyRecentResources(req.user.id);

    res.status(200).json(
        new ApiResponse(200,
        "Recent resources fetched successfully",
        resources)
    );
});

module.exports = {
    createResource,
    getAllResources,
    getResourceById,
    getMyRecentResources
};