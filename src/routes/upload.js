const express = require("express");
const route = express.Router();
const Uploadimage = require("../controllers/uploadController");
const { uploadImage } = require("../config/cloudinary");
const uploadControllers = new Uploadimage();
route.post(
  "/cloudy",
  // uploadImage.single("image"),
  uploadImage.array("images", 10),
  uploadControllers.uploadMultipleImages
);
route.delete("/clound/:id", uploadControllers.deleteImage);
module.exports = route;
