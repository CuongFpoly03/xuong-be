const userModel = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const { registerSchema, loginSchema } = require("../validations/auth");
const jwt = require("jsonwebtoken");
const register = async (req, res, next) => {
  try {
    const { email, password, username, address, phone } = req.body;
    // const { error } = registerSchema.validate(req.body);
    // if (error) {
    //   const errors = error.details.map((err) => err.message);
    //   return res.status(400).json({
    //     message: errors,
    //   });
    // }
    const userEmail = await userModel.findOne({ email });
    //check email
    if (userEmail) {
      return res.status(400).json({
        message: "email này đã tồn tại !",
      });
    }
    const salt = bcryptjs.genSaltSync(10);
    const hashPw = await bcryptjs.hash(password, salt);

    //create
    const user = await userModel.create({
      email,
      username,
      password: hashPw,
      address,
      phone
    });

    user.password = undefined;
    return res.status(201).json({
      message: "register successfully",
      data: user, 
    }); 
  } catch (error) {
    next(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = loginSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const checkuser = await userModel.findOne({ email });
    if (!checkuser) {
      return res.status(400).json({
        message: "email này k tồn tại !",
      });
    }
    // So sánh mật khẩu
    const comparePw = await bcryptjs.compare(password, checkuser.password);
    if (!comparePw)
      return res.status(400).json({
        message: "password không đúng !",
      });

    // Tạo token
    const token = jwt.sign({ _id: checkuser._id }, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });

    // Giải mã token để lấy id người dùng
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken._id;

    // Xóa trường password trước khi trả về response
    checkuser.password = undefined;

    return res.status(200).json({
      message: "Login successfully !",
      token,
      user: checkuser,
      userId: userId,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  register: register,
  login: login,
};
