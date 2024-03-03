const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");
const { createHmac } = require("crypto"); //sử dụng để thực hiện các chức năng liên quan đến mật mã hóa và xử lý bảo mật
const userChema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: 32,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
userChema.virtual("hashedPassword").set(function (password) {
  this.salt = uuid();
  this.hashed_password = this.encryptPassword(password);
});

userChema.methods = {
  authenticate(password) {
    return this.encryptPassword(password) === this.hashed_password;
  },
  encrytPassword(password) {
    if (!password) return;
    try {
      createHmac("sha256", this.salt).update(password).digest("hex");
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = mongoose.model("users", userChema);

/** 
    @swagger
*/
