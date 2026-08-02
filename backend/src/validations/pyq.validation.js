const { z } = require("zod");

const createPyqSchema = z.object({

    subject: z
        .string()
        .trim()
        .min(2, "Subject is required"),

    semester: z.coerce
        .number()
        .int()
        .min(1, "Semester must be between 1 and 8")
        .max(10, "Semester must be between 1 and 10"),

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