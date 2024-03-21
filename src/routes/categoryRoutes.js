const express = require("express");
const route  = express.Router();
const categoryController = require("../controllers/categoryController")
route.get("/", categoryController.list);
route.get("/:Id", categoryController.getOne);
route.post("/add", categoryController.create);
route.delete("/delete/:id",categoryController.remove)
route.put("/update/:id",categoryController.update)

module.exports = route