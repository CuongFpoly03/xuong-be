const { uploadImage } = require("../config/cloudinary");
const multer = require("multer");

const uploadMultipleImages = (req, res, next) => {
  // Sử dụng `array` thay vì `single` để upload nhiều ảnh
  uploadImage.array("images", 10)(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Xử lý lỗi từ multer
      return res.status(400).json({ message: err.message });
    } else if (err) {
      // Xử lý các lỗi khác
      return res.status(500).json({ message: err.message });
    }
    next();
  });
};

module.exports = { uploadMultipleImages: uploadMultipleImages };
