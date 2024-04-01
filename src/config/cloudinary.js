const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
cloudinary.config({
  cloud_name: "dciwglxbc",
  api_key: "137226731123776",
  api_secret: "SGTsM5UvNl1I2xwBkwUDk3pHgUQ",
});
const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpg", "jpeg", "png"],
  params: {
    folder: "Project-xuong",
  },
});
const uploadImage = multer({ storage });

module.exports = { cloudinary: cloudinary, uploadImage: uploadImage };