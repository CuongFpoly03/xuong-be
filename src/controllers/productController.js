const slugify = require("slugify");
const productModel = require("../models/productModel");

const create = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.name);
    const product = await new productModel(req.body).save();
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "tao san pham khong thanh cong",
    });
  }
};

const list = async (req, res) => {
  try {
    const product = await productModel.find({}).exec();
    res.json(product);
  } catch (error) {
    console.log(error);
  }
};

const read = async (req, res) => {
    try {
        const product = await productModel.findOne({ _id: req.params.productId }).exec();
        if (!product) {
            res.status(404)
        }
        res.json(product);
    } catch (error) {
        console.log(error)
    }
}

const listRelated = async (req, res) => {
  const product = await productModel.findById(req.params.productId).exec();
  const related = await productModel
    .find({
      _id: { $ne: product._id },
      category: product.category,
    })
    .litmit(3)
    .populate("category")
    .exec();
  res.json(related);
};

const handleQuery = async (req, res, query) => {
  const products = await productModel
    .find({ $text: { $search: query } })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("postedBy", "_id name")
    .exec();
  res.json(products);
};
const handlePrice = async (req, res, price) => {
  try {
    let products = productModel
      .find({
        price: {
          gte: price[0],
          lte: price[1],
        },
      })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("postedBy", "_id name")
      .exec();
    res.json(products);
  } catch (error) {}
};

const handleCategory = async (req, res, category) => {
  try {
    let products = await productModel
      .find({ category })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("postedBy", "_id name");
    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

const searchFilters = async(req, res) => {
    const {query, price, category, color} = req.body;
    if(query){
        await handleQuery(req, res, query);
    }
    if(price != undefined){
        await handlePrice(req, res, price)
    }
    if(category){
        handleCategory(req, res, category)
    }
  
    if(color){
        handleColor(req, res, color)
    }
}

module.exports = {
  create: create,
  list: list,
  read: read,
  listRelated: listRelated,
  handleQuery: handleQuery,
  handlePrice: handlePrice,
  handleCategory: handleCategory,
  handleCategory: handleCategory,
  searchFilters: searchFilters
};
