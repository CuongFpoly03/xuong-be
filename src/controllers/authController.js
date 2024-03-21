const userModel = require("../controllers/userController");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

const signup = async (req, res) => {
  try {
    const user = await userModel(req.body);
    res.status(200).json(user, { msg: "tạo tk thành công" });
  } catch (error) {
    res.json({
      msg: "tạo tk thanh cong !",
    });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).exec();
  if (!user) {
    res.status(400).json({
      msg: "tk khong ton tai",
    });
  }
  if (!user.authenticate(password)) {
    res.json({
      msg: "khong hop le",
    });
  }
  const tokens = jwt.sign({ _id: user._id }, "123456");
  res.cookie("token", tokens, { expire: new Date() + 9999 });
  res.json({
    tokens,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

const signout = (req, res) => {
  res.clearCookie("tokens");
  res.json({
    msg: "lgout thanh cong",
  });
};

const requireSignin = () => {
  expressJwt({
    //ma bm
    secret: "123456",
    // Sau khi decode xong thì tạo ra 1 thuộc tính req.auth và gán thông tin decode
    userProperty: "auth", // req.auth
    // t.toan decode token
    algorithms: ["HS256"],
  });
};

const isAuth = (req, res, next) => {
  // Kiểm tra điều kiện trả về true hoặc false
  let user = req.profile && req.auth && req.profile._id == req.auth._id;

  // Nếu false ( không phải thành viên hệ thống)
  if (!user) {
    res.json({
      msg: "truy cap bi tu choi",
    });
  }
  next();
};
const isAdmin = (req, res, next) => {
  console.log(req.profile.role);
  // nếu role == 0 ( nghĩa là quyền là member thì thông báo)
  if (req.profile.role === 0) {
    return res.status(403).json({
      msg: "Bạn không có quyền truy cập",
    });
  }
  next();
};

module.exports = {
  signup: signup,
  signin: signin,
  signout: signout,
  requireSignin: requireSignin,
  isAuth: isAuth,
  isAdmin: isAdmin,
};
