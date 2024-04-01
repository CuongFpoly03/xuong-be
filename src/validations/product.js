const Joi = require("joi");

const validateCreateAndUpdate = Joi.object({
  namePro: Joi.string().required().min(3).max(20).messages({
    "string.empty": "Vui lòng nhập tên sản phẩm",
    "string.min": "Tên sản phẩm phải có ít nhất 3 ký tự",
    "string.max": "Tên sản phẩm không được vượt quá 20 ký tự",
  }),
  imgPro: Joi.string().required().messages({
    "string.empty": "Vui lòng nhập đường dẫn hình ảnh",
    "array.base": "Vui lòng nhập đường dẫn hình ảnh",
    "array.min": "Vui lòng nhập ít nhất một đường dẫn hình ảnh",
  }),
  pricePro: Joi.number().required().min(1).messages({
    "number.empty": "Vui lòng nhập giá sản phẩm",
    "number.min": "Giá sản phẩm phải lớn hơn hoặc bằng 1",
  }),
  quantityPro: Joi.number().required().min(1).messages({
    "number.empty": "Vui lòng nhập số lượng sản phẩm",
    "number.min": "Số lượng sản phẩm phải lớn hơn hoặc bằng 1",
  }),
  descriptionPro: Joi.string().required().messages({
    "string.empty": "Vui lòng nhập descriptionPro",
  }),
  category: Joi.string().required().messages({
    "string.empty": "Vui lòng nhập danh mục sản phẩm",
  }),
  user: Joi.string().required().messages({
    "string.empty": "Vui lòng nhập user",
  }),
});

module.exports = { validateCreateAndUpdate };
