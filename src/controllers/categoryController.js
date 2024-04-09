const Category = require("../models/category");
// const slugify = require("slugify"); //chuyển đổi một chuỗi thành một chuỗi

const list = async (req, res) => {
  const category = await Category.find({}).sort({ createAt: -1 }).exec();
  res.status(200).json(category);
};
const getOne = async (req, res) => {
  try {
    const idCate = req.params.Id;
    console.log(idCate);
    const cate = await Category.findById(idCate);
    if (!cate) {
      res.status(404).json({ err: "not/found" });
    }
    res.status(200).json(cate);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const update = async (req, res) => {
  const Id = req.params.Id;
  const category = await Category.findOneAndUpdate({_id: Id}, req.body, { new: true });
  if (!category) {
    res.status(404).json({ err: "not/found" });
  }
  res.status(200).json(category);
};
const create = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    if (!category) {
      res.status(404).json({ err: "not/found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({
      message: "Tạo danh mục không thành công",
    });
  }
};
const remove = async (req, res) => {
  try {
    const Id = req.params.Id;
    const category = await Category.findOneAndDelete(Id);
    if (!category) {
      res.status(404).json({ err: "not/found" });
    }
    res.status(200).json({ err: "delete success !" });
  } catch (error) {
    console.log("err");
  }
};

module.exports = {
  list: list,
  getOne: getOne,
  update: update,
  create: create,
  remove: remove,
};
