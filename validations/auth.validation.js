const Joi = require("joi");

// define the validation rules using Joi
const AuthValidator = {
    body: Joi.object({
        name: Joi.string().min(3).trim(true).required(),
        email: Joi
            .string()
            .normalize()
            .email()
            .trim(true)
            .required(),
        password: Joi.string().min(6).trim(true).required(),
        nbOfAttempts: Joi.number().default(0),
        blocked: Joi.boolean().default(false),
    }),
};

module.exports = AuthValidator;