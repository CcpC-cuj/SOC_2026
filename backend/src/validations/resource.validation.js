const { z } = require("zod");

const createResourceSchema = z.object({

    title: z
        .string()
        .min(3, "Title is required"),

    description: z
        .string()
        .optional(),

    subject: z
        .string()
        .min(1, "Subject is required"),

    semester: z
        .number()
        .min(1)
        .max(8),

    resourceType: z.enum([
        "notes",
        "assignment",
        "lab",
        "ppt",
        "tutorial"
    ]),

    faculty: z.object({
        name: z.string().optional(),
        department: z.string().optional()
    }),

    tags: z.array(
        z.string()
    ).default([]),

    fileUrl: z.url()
});

module.exports = createResourceSchema;