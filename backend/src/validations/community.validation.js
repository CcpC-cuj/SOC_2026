const { z } = require("zod");

const createPostSchema = z.object({

    title: z
        .string()
        .trim()
        .min(5, "Title must be at least 5 characters")
        .max(150, "Title cannot exceed 150 characters"),

    content: z
        .string()
        .trim()
        .min(10, "Content must be at least 10 characters")
        .max(5000, "Content cannot exceed 5000 characters")

});

module.exports = {
    createPostSchema
};