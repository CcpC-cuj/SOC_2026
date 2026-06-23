const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
    
    title:{
        type: String,
        required: true,
        trim: true,
    },

    description:{
        type: String,
        required: true,
    },

    subject:{
        type: String,
        required: true,
        trim: true,
    },

    resourceType:{
        type: String,
        required: true,
        enum:[
            "notes",
            "assignment",
            "lab",
            "ppt",
            "tutorial"
        ]
    },

    faculty:{
        name:{
            type: String,
            trim: true,
        },

        department:{
            type: String,
            trim: true,
        }
    },

    tags:[{
        type: String,
        trim: true,
        lowercase: true,
    }],

    originalFileName: {
        type: String,
        required: true
    },


    fileUrl:{
        type: String,
        required: true,
    },

    uploadedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    approved:{
        type: Boolean,
        default: false,
    },

    downloads:{
        type: Number,
        default: 0,
    }
}, {timestamps: true});

module.exports = mongoose.model("Resource", resourceSchema);