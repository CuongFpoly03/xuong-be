const Product = require("../models/productModel");
// const { validateCreateAndUpdate } = require("../validations/product");
// const slugify = require("slugify"); //chuyển đổi một chuỗi thành một chuỗi

const list = async (req, res) => {
  // console.log(req.body)
  try {
    const products = await Product.find().populate("category");
    // console.log(products)
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};


const PAGE_SIZE = 4;
const ProductListPage = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const skip = (page - 1) * PAGE_SIZE;
    const products = await Product.find().skip(skip).limit(PAGE_SIZE);
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// const ProductListPage = async (req, res) => {
//   const {
//     _page = 1,
//     _limit = 10,
//     _sort = "createdAt",
//     _order = "asc",
//     _expand,
//   } = req.query;
//   const options = {
//     page: _page,
//     limit: _limit,
//     sort: { [_sort]: _order === "desc" ? -1 : 1 },
//   };
//   const populateOptions = _expand ? [{ path: "category", select: "name" }] : [];
//   try {
//     const result = await Product.paginate(
//       { categoryId: null },
//       { ...options, populate: populateOptions }
//     );
//     if (result.docs.length === 0) throw new Error("No products found");
//     const response = {
//       data: result.docs,
//       pagination: {
//         currentPage: result.page,
//         totalPages: result.totalPages,
//         totalItems: result.totalDocs,
//       },
//     };
//     return res.status(200).json(response);
//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }
// };

const getOne = async (req, res) => {
  try {
    const Idpro = req.params.Id;
    const product = await Product.findById(Idpro)
      .populate("category")
      .populate("user");
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
  // const { error } = validateCreateAndUpdate.validate(req.body);
  // if (error) {
  //   const errors = error.details.map((err) => err.message);
  //   return res.status(400).json({
  //     message: errors,
  //   });
  // }
  const product = await Product.findOneAndUpdate({ _id: Id }, req.body, {
    new: true,
  });
  if (!product) {
    return res.status(404).json({ err: "not/found" });
  }
  return res.status(200).json(product);
};

const create = async (req, res) => {
  try {
    // const {namePro, imgPro, pricePro, quantityPro, descriptionPro, category} = req.body;
    // const { error } = validateCreateAndUpdate.validate(req.body, {
    //   abortEarly: false,
    // });
    // if (error) {
    //   const errors = error.details.map((err) => err.message);
    //   return res.status(400).json({
    //     message: errors,
    //   });
    // }
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
    const product = await Product.findOneAndDelete({ _id: Id }); // Sử dụng _id để tìm sản phẩm
    if (!product) {
      return res.status(404).json({ err: "Product not found" });
    }
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
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
  relatedProduct: relatedProduct,
  ProductListPage: ProductListPage,
};
