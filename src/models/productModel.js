const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    namePro: {
      type: String,
      trim: true,
      maxlength: 255,
      text: true,
      required: true,
    },
    imgPro: {
      type: Array,
    },
    pricePro: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    quantityPro: Number,
    descriptionPro: { type: String, require: true },
   
    category: {
      type: ObjectId,
      ref: "categorys",
    },
    user: {
      type: ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("products", productSchema);
