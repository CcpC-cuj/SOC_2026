const mongoose = require("mongoose");
const { required } = require("../../validations/profile.validation");

const pyqSchema = new mongoose.Schema(
{
    title: {
        type: String,
        trim: true
    },

    subject: {
        type: String,
        required: true,
        trim: true
    },

    semester: {
        type: Number,
        required: true
    },

    branch: {
        type: String,
        required: true,
        uppercase: true
    },

    year: {
        type: Number,
        required: true
    },

    examType: {
        type: String,
        enum: [
            "sessional",
            "end-sem",
        ],
        required: true
    },

    facultyName: {
        type: String,
        required: true
    },

    fileUrl: {
        type: String,
        required: true
    },

    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    approved: {
        type: Boolean,
        default: false
    },

    downloads: {
        type: Number,
        default: 0
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("PYQ", pyqSchema);