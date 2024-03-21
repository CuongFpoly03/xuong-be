const userModel = require("../models/userModel");

const userId = async (req, res, next) => {
  try {
    const id = req.params.Id;
    const user = await userModel.findById(id);
    if (!user) {
      res.status(404).json({ err: "not/found" });
    }
    req.profile = user;
    next();
  } catch (error) {
    res.status(400).json({
      text: "user khong ton tai !",
    });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await userModel.create(req.body);
    if (!user) {
      res.status(404).json({ err: "not/found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      message: "Tạo danh mục không thành công",
    });
  }
};

const read = (req, res) => {
  const user = req.profile;
  user.hashed_password = undefined;
  user.salt = undefined;
  res.json(user);
};
module.exports = {
  userId: userId,
  createUser: createUser,
  read: read,
};
