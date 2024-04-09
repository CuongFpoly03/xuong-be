const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

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
      of: Object,
    },
    thumbnail: { type: String },
    pricePro: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    quantityPro: Number,
    color: String,
    size: String,
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
productSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("products", productSchema);
