const asyncHandler = require("../../middleware/asyncHandler");

const ApiResponse = require("../../utils/ApiResponse");

const dashboardService = require("./dashboard.service");

const getDashboard = asyncHandler(async (req, res) => {

        const dashboard =
            await dashboardService.getDashboard(
                req.user._id
            );

        res.status(200).json(
            new ApiResponse(
                200,
                "Dashboard fetched successfully",
                dashboard
            )

        );

    }

);

module.exports = {
    getDashboard
};