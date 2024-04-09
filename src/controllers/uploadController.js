const { cloudinary } = require("../config/cloudinary");

class Uploadimage {
  async uploadMultipleImages(req, res) {
    try {
      if (!req.files || req.files.length === 0) {
        throw new Error("No File Upload");
      }
      
      const imageUrls = [];
      for (const file of req.files) {
        imageUrls.push(file.path);
      }
      
      res.status(200).json({
        message: "Upload success !",
        imageUrls: imageUrls, // Array of image URLs
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
  async uploadSingleImage(req, res) {
    try {
      // console.log(req.file);
      if (!req.file) {
        throw new Error("No File Upload");
      }
      res.status(200).json({
        message: "Upload success !",
        imageUrl: req.file.path,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
  async deleteImage(req, res) {
    try {
      const { result } = await cloudinary.uploader.destroy(
        `${process.env.FOLDER_NAME}/${req.params.id}`
      );
      if (result !== "ok") {
        throw Error(result);
      }
      res.status(200).json({
        message: "Delete success !",
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
}

module.exports = Uploadimage;
