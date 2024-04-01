

const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the category.
 *         name:
 *           type: string
 *           description: The name of the category.
 *           minLength: 3
 *           maxLength: 32
 *           example: Electronics
 */

/**
 * @swagger
 * /categorys:
 *   get:
 *     summary: Get all categories
 *     description: Retrieve a list of all categories.
 *     tags: 
 *       - categorys
 *     responses:
 *       '200':
 *         description: A list of categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: '#/components/schemas/Category'
 */


router.get("/", categoryController.list);

/**
 * @swagger
 * /categorys/{Id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [categorys]
 *     parameters:
 *       - in: path
 *         name: Id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the category
 *     responses:
 *       '200':
 *         description: A category object
 */
router.get("/:Id", categoryController.getOne);

/**
 * @swagger
 * /categorys/add:
 *   post:
 *     summary: Create a new category
 *     tags: [categorys]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       '201':
 *         description: Created
 */
router.post("/add", categoryController.create);

/**
 * @swagger
 * /categorys/delete/{Id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [categorys]
 *     parameters:
 *       - in: path
 *         name: Id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the category
 *     responses:
 *       '200':
 *         description: OK
 */

router.delete("/delete/:Id", categoryController.remove);

/**
 * @swagger
 * /categorys/update/{Id}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [categorys]
 *     parameters:
 *       - in: path
 *         name: Id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/Category'
 *     responses:
 *       '200':
 *         description: OK
 */
router.put("/update/:Id", categoryController.update);

module.exports = router;
