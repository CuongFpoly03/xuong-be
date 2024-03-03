const Category = require("../models/category")
const Product = require("../models/productModel")
const  slugify = require ('slugify');//chuyển đổi một chuỗi thành một chuỗi 

const list = async (req, res) => {
    const category = await Category.find({}).sort({createAt: -1}).exec();
    res.json(category);
}
const read = async (req, res) => {
    console.log(req.params.slug);
    const category = await Category.find({ slug: req.params.slug }).exec();
    const products = await Product.find({ category })
        .populate('category')
        .exec();
    res.json({
        category,
        products
    });
}
const update = async (req, res) => {
    const { name } = req.body;
    const category = await Category.findOneAndUpdate(
        { slug: req.params.slug },
        { name, slug: slugify(name) },
        { new: true }
    );

    res.json(category);

}
const create = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await new Category({ name, slug: slugify(name) }).save();
        res.json(category);
    } catch (error) {
        res.status(400).json({
            message: "Tạo danh mục không thành công"
        })
    }
}
const remove = async (req, res) => {
    try {
        const category = await Category.findOneAndDelete({ slug: req.params.slug })
        res.json(category)
    } catch (error) {
        console.log('errr')
    }

}

module.exports = {
    list: list,
    read: read,
    update: update,
    create: create,
    remove: remove
}