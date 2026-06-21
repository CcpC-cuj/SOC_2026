const asyncHandler =require("../../middleware/asyncHandler");

const ApiResponse = require("../../utils/ApiResponse");

const resourceService = require("./resource.service");

const createResource = asyncHandler(async(req, res)=>{
    const resource = await resourceService.createResource(req.body, req.user._id);

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
    const tag =req.query.tag || "";
    const faculty = req.query.faculty || "";

    const {resources, totalResources} = await resourceService
    .getAllResources(page, limit, search, subject, semester, tag, faculty);

    const totalPages = Math.ceil(totalResources/limit);

    res.status(200).json(
        new ApiResponse(200, "Resource fetched successfully",{
            resources,

            pgination:{
                page,
                limit,
                totalResources,
                totalPages
            }
        })
    );
});

const getResourceById = asyncHandler(async(req, res)=>{

    const resource = await resourceService.getResourceById(req.params.id);

    res.status(200).json(
        new ApiResponse(200, "Resource fetched successfully", resource)
    );
});

const approveResource = asyncHandler(async(req, res)=>{

    const resource = await resourceService.approveResource(req.params.id);

    res.status(200).json(
        new ApiResponse(200, "Resource approved", resource)
    );
});

const deleteResource = asyncHandler(async(req, res)=>{

    await resourceService.deleteResource(req.params.id);

    res.status(200).json(
        new ApiResponse(200, "Resource deleted successfully")
    );
});

const getPendingResources = asyncHandler(async(req, res)=>{

    const resources = await resourceService.getPendingResources();

    res.status(200).json(
        new ApiResponse(200, "Fetched Successfully", resources)
    );
});

module.exports = {
    createResource,
    getAllResources,
    getResourceById,
    approveResource,
    deleteResource,
    getPendingResources
};