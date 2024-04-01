const Product = require("../models/productModel");
const { validateCreateAndUpdate } = require("../validations/product");
// const slugify = require("slugify"); //chuyển đổi một chuỗi thành một chuỗi

const list = async (req, res) => {
  try {
      const Products = await Product.find().populate('category').populate('user');
      res.status(200).json(Products);
  } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
  }
};
const getOne = async (req, res) => {
  try {
    const Idpro = req.params.Id;
    const product = await Product.findById(Idpro).populate('category').populate('user');
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
  const {error} = validateCreateAndUpdate.validate(req.body);
  if(error) {
    const errors = error.details.map((err) => err.message);
    return res.status(400).json({
      message: errors,
    })
  }
  const product = await Product.findOneAndUpdate({ _id: Id }, req.body, { new: true });
  if (!product) {
    return res.status(404).json({ err: "not/found" });
  }
  return res.status(200).json(product);
};

const create = async (req, res) => {
  try {
    // const {namePro, imgPro, pricePro, quantityPro, descriptionPro, category} = req.body;
    const {error} = validateCreateAndUpdate.validate(req.body);
    if(error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      })
    } 
    const product = await Product.create({ ...req.body, user: res.locals.id });
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


const relatedProduct = async (req, res) => {
  try {
      const product = await Product.find({
          category: req.params.cateId,
          _id: { $ne: req.params.productId },
      });
      return res.status(StatusCodes.OK).json(product);
  } catch (error) {}
};
module.exports = {
  list: list,
  getOne: getOne,
  update: update,
  create: create,
  remove: remove,
  relatedProduct: relatedProduct
};
