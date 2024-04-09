const express = require('express');
const productController = require("../controllers/productController");
// const authController = require("../middlewares/auth")

const route = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the product.
 *         namePro:
 *           type: string
 *           description: The name of the product.
 *           maxLength: 255
 *           example: Smartphone
 *         imgPro:
 *           type: array
 *           items:
 *             type: string
 *           description: Array containing URLs of product images.
 *         pricePro:
 *           type: number
 *           description: The price of the product.
 *           format: float
 *           example: 499.99
 *         quantityPro:
 *           type: integer
 *           description: só lượng.
 *           example: 100
 *         descriptionPro:
 *           type: string
 *           description: Description of the product.
 *           example: mô tả về sản phẩm.
 *         category:
 *           type: string
 *           description: The ID of the category to which the product belongs.
 *           example: 6091e346f05f7e31c0ed7c48
 *         user:
 *           type: string
 *           description: The ID of the user who added the product.
 *           example: 6091e346f05f7e31c0ed7c49
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all products.
 *     tags: 
 *       - products
 *     responses:
 *       '200':
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

route.get("/", productController.list);
route.get("/list", productController.ProductListPage);
/**
 * @swagger
 * /products/{Id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [products]
 *     parameters:
 *       - in: path
 *         name: Id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product
 *     responses:
 *       '200':
 *         description: A product object
 */
route.get("/:Id", productController.getOne);
/**
 * @swagger
 * /products/add:
 *   post:
 *     summary: Create a new product
 *     tags: [products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       '201':
 *         description: Created
 */
route.post("/add", productController.create);
/**
 * @swagger
 * /products/delete/{Id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [products]
 *     parameters:
 *       - in: path
 *         name: Id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product
 *     responses:
 *       '200':
 *         description: OK
 */
route.delete("/delete/:Id",productController.remove)
/**
 * @swagger
 * /products/update/{Id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [products]
 *     parameters:
 *       - in: path
 *         name: Id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       '200':
 *         description: OK
 */
route.put("/update/:Id",productController.update)
route.get("/relate/:cateId", productController.relatedProduct)



module.exports= route;