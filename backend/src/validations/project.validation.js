const { z } = require("zod");

const createProjectSchema = z.object({

    title: z.string()
        .trim()
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title cannot exceed 100 characters"),

    description: z.string()
        .trim()
        .min(10, "Description must be at least 10 characters"),

    maxMembers: z.number()
        .int("Max members must be an integer")
        .min(2, "Minimum team size is 2")
        .max(10, "Maximum team size is 10"),

    repoLink: z.string()
        .url("Invalid repository URL")
        .optional()
        .or(z.literal("")),

    tags: z.array(z.string())
        .optional()

});

module.exports = {
    createProjectSchema
};