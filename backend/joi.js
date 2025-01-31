const Joi = require("joi");

const validateUser = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required().messages({
      "string.min": "Password should have at least 4 characters",
      "string.empty": "Password cannot be empty haha",
      "any.required": "Password is required",
    }),
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = validateUser;
