const fs = require("fs");

const PYQ = require("./pyq.model");

const ApiError = require("../../utils/ApiError");
const uploadToCloudinary = require("../../utils/uploadToCloudinary");

const uploadPyq = async (userId, file, pyqData) => {

    if (!file) {
        throw new ApiError(400, "PDF file is required");
    }

    try {

        const uploadResult = await uploadToCloudinary(
            file.path,
            "soc/pyqs",
            "raw"
        );

        const pyq = await PYQ.create({
            ...pyqData,
            fileUrl: uploadResult.secure_url,
            uploadedBy: userId
        });

        return pyq;

    }
    finally {

        if (file?.path && fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }

    }

};

const getAllPyqs = async (query) => {

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {
        approved: true
    };

    if (query.search) {
        filter.$or = [
            {
                title: {
                    $regex: query.search,
                    $options: "i"
                }
            },
            {
                subject: {
                    $regex: query.search,
                    $options: "i"
                }
            },
            {
                facultyName: {
                    $regex: query.search,
                    $options: "i"
                }
            }
        ];
    }

    if (query.semester) {
        filter.semester = Number(query.semester);
    }

    if (query.branch) {
        filter.branch = query.branch.toUpperCase();
    }

    if (query.year) {
        filter.year = Number(query.year);
    }

    if (query.examType) {
        filter.examType = query.examType;
    }

    const [pyqs, totalPyqs] = await Promise.all([

        PYQ.find(filter)
            .populate("uploadedBy", "name")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),

        PYQ.countDocuments(filter)

    ]);

    return {

        pyqs,

        pagination: {

            page,

            limit,

            totalPyqs,

            totalPages: Math.ceil(totalPyqs / limit)

        }

    };

};

const getPyqById = async (pyqId) => {

    const pyq = await PYQ.findOne({
        _id: pyqId,
        approved: true
    }).populate(
        "uploadedBy",
        "name"
    );

    if (!pyq) {
        throw new ApiError(404, "PYQ not found");
    }

    return pyq;

};

const getPendingPyqs = async () => {

    return await PYQ.find({ approved: false })
        .populate("uploadedBy", "name email rollNumber")
        .sort({ createdAt: -1 });

};

const approvePyq = async (pyqId) => {

    const pyq = await PYQ.findById(pyqId);

    if (!pyq) {
        throw new ApiError(404, "PYQ not found");
    }

    pyq.approved = true;

    await pyq.save();

    return pyq;

};

const deletePyq = async (pyqId) => {

    const pyq = await PYQ.findById(pyqId);

    if (!pyq) {
        throw new ApiError(404, "PYQ not found");
    }

    await pyq.deleteOne();

    return;

};

module.exports = {
    uploadPyq,
    getAllPyqs,
    getPyqById,
    getPendingPyqs,
    approvePyq,
    deletePyq
};