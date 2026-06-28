const { z } = require("zod");

const updateProfileSchema =
z.object({

    name:
        z.string()
        .min(3)
        .optional(),

    bio:
        z.string()
        .max(500)
        .optional(),

    branch:
        z.string()
        .optional(),

    semester:
        z.coerce.number()
        .min(1)
        .max(8)
        .optional(),

    github:
        z.string()
        .optional(),

    linkedin:
        z.string()
        .optional(),

    portfolio:
        z.string()
        .optional(),

    skills:
        z.array(
            z.string()
        ).optional(),

    achievements:
        z.array(
            z.string()
        ).optional()

}).strict();

module.exports = updateProfileSchema;