const express = require("express");
const route = express.Router();
const Uploadimage = require("../controllers/uploadController");
const { uploadImage } = require("../config/cloudinary");
const uploadControllers = new Uploadimage();
route.post(
  "/cloudy",
  uploadImage.single("image"),
  //upload.array("image", 10)
  uploadControllers.uploadSingleImage
);
route.delete("/clound/:id", uploadControllers.deleteImage);
module.exports = route;
