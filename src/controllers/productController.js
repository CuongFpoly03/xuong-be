const Product = require("../models/productModel");
// const slugify = require("slugify"); //chuyển đổi một chuỗi thành một chuỗi

const list = async (req, res) => {
  const Products = await Product.find({}).sort({ createAt: -1 }).exec();
  res.status(200).json(Products);
};
const getOne = async (req, res) => {
  try {
    const Idpro = req.params.Id;
    const product = await Product.findById(Idpro);
    if (!product) {
      res.status(404).json({ err: "not/found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const update = async (req, res) => {
  const Id = req.params.Id;
  const product = await Product.findOneAndUpdate(Id, req.body, { new: true });
  if (!product) {
    res.status(404).json({ err: "not/found" });
  }
  res.status(200).json(product);
};
const create = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    if (!product) {
      res.status(404).json({ err: "not/found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({
      message: "Tạo danh mục không thành công",
    });
  }
};
const remove = async (req, res) => {
  try {
    const Id = req.params.Id;
    const product = await Product.findOneAndDelete(Id);
    if (!product) {
      res.status(404).json({ err: "not/found" });
    }
    res.status(200).json({ err: "delete success !" });
  } catch (error) {
    console.log("errr");
  }
};

module.exports = {
  list: list,
  getOne: getOne,
  update: update,
  create: create,
  remove: remove,
};
