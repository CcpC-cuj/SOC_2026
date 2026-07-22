const { z } = require("zod");

const registerSchema = z.object({

    name: z
        .string()
        .min(
            3,
            "Name must be at least 3 characters"
        ),

    email: z
        .email(
            "Invalid email format"
        ),

    password: z
        .string()
        .min(
            6,
            "Password must be at least 6 characters"
        ),
    rollNumber: z
        .string()
        .trim()
        .toUpperCase()
        .regex(
            /^CUJ\d{2}[A-Z]{2}\d{4}$/,
            "Roll number must be in the format CUJ23UG0001"
        ),
    
    collegeEmail: z
        .union([
            z.literal(""),
            z.string()
                .trim()
                .email("Invalid email address")
                .endsWith(
                    "@cuj.ac.in",
                    "College email must end with @cuj.ac.in"
                )
        ])
        .optional(),

    semester:
        z.coerce.number()
        .min(1)
        .max(8),

});

const loginSchema = z.object({

    rollNumber: z
        .string()
        .trim()
        .toUpperCase()
        .regex(
            /^CUJ\d{2}[A-Z]{2}\d{4}$/,
            "Roll number must be in the format CUJ23UG0001"
        ),

    password: z
        .string()
        .min(
            1,
            "Password is required"
        )

});

module.exports = {
    registerSchema,
    loginSchema
};