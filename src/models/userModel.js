const mongoose = require("mongoose");
// const { createHmac } = require("crypto"); //sử dụng để thực hiện các chức năng liên quan đến mật mã hóa và xử lý bảo mật
const userChema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      min: 6,
      max: 30,
      required: true
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("users", userChema);
