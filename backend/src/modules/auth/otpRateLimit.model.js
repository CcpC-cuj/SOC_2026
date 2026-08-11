const mongoose = require("mongoose");

const otpRateLimitSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        count: {
            type: Number,
            default: 0,
        },

        windowStart: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "OTPRateLimit",
    otpRateLimitSchema
);