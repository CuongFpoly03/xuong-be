const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const cartSchema = mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "users",
      required: true,
    },
    products: [
      {
        productId: {
          type: ObjectId,
          ref: "products",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);
module.exports = mongoose.model("carts", cartSchema);
