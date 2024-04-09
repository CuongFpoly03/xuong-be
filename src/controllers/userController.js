const userModel = require("../models/userModel");

const getAll = async(req, res) => {
  try {
    const user = await userModel.find();
    if(!user) {
      return res.status(404).json('not/found');
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({"err" : error.message})
  }
}

const userId = async (req, res, next) => {
  try {
    const id = req.params.Id;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ err: "not/found" });
    }
    return res.status(200).json({message: "success !", user})
  } catch (error) {
    res.status(400).json({
      text: "user khong ton tai !",
    });
  }
};


const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.Id;
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ err: "not/found" });
    }
    return res.status(200).json({message: "success !"})
  } catch (error) {
    res.status(400).json({
      text: "user khong ton tai !",
    });
  }
};

module.exports = {
  userId: userId,
  getAll: getAll,
  deleteUser: deleteUser
};
