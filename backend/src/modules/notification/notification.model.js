const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
    {
        recipient:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true
        },
        type:{
            type: String,
            enum:[
                "resource_approved",
                "pyq_approved",
                "resource_deleted",
                "pyq_deleted",
                "project_join_request",
                "project_request_approved"
            ],
            required: true
        },
        title:{
            type: String,
            required: true,
            trim: true
        },
        message:{
            type: String,
            required: true,
            trim: true
        },
        referenceId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null
        },

        referenceType: {
            type: String,
            enum: [
                "Resource",
                "PYQ",
                "Project"
            ],
            default: null
        },

        read: {
            type: Boolean,
            default: false
        }
    },
    {timestamps: true}
);

notificationSchema.index({
    recipient: 1,
    createdAt: -1
});

module.exports = mongoose.model(
    "Notification",
    notificationSchema
);