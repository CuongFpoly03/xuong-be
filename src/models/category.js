const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "vui long nhap username",
      minlength: [3, "Too short"],
      maxlength: [32, "Too Long"],
    },
  },
  { timestamps: true, versionKey: false }
);
module.exports = mongoose.model("categorys", categorySchema);
