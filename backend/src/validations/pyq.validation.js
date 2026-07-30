const { z } = require("zod");

const createPyqSchema = z.object({

    title: z
        .string()
        .trim()
        .min(3, "Title must be at least 3 characters").optional(),

    subject: z
        .string()
        .trim()
        .min(2, "Subject is required"),

    semester: z.coerce
        .number()
        .int()
        .min(1, "Semester must be between 1 and 8")
        .max(8, "Semester must be between 1 and 8"),

    branch: z
        .string()
        .trim()
        .toUpperCase()
        .min(2, "Branch is required"),

    year: z.coerce
        .number()
        .int()
        .min(2000, "Invalid year")
        .max(
            new Date().getFullYear(),
            "Year cannot be in the future"
        ),

    examType: z.enum(
        [
            "sessional",
            "end-sem"
        ],
        {
            errorMap: () => ({
                message: "Invalid exam type"
            })
        }
    ),

    facultyName: z
        .string()
        .trim()
        .min(2, "Faculty name is required")

});

module.exports = {
    createPyqSchema
};