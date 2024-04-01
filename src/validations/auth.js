const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Vui lòng nhập đúng email !",
  }),
  password: Joi.string().min(6).max(30).required(),
  role: Joi.string(),
  username: Joi.string().required().messages({
    "any.required": "Vui lòng nhập username !",
    "string.min": "Username > 3 ký tự",
    "string.max": "Username < 30 ký tự",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Vui lòng nhập email đúng đinh dạng !"
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Vui lòng nhập pw > 6kt !"
  }),
});

module.exports = {
  registerSchema: registerSchema,
  loginSchema: loginSchema,
};
