const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    namePro: {
      type: String,
      trim: true,
      required: true,
      maxlength: 255,
      text: true,
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
    colorPro: {
      type: String,
      enum: ["black", "brown", "white", "blue"],
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("products", productSchema);
