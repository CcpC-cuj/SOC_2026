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
        .max(10),

    resourceType: z.enum([
        "notes",
        "assignment",
        "lab",
        "tutorial"
    ]),

    faculty: z.object({
        name: z.string().optional(),
        department: z.string().optional()
    }),
    
});

module.exports = createResourceSchema;