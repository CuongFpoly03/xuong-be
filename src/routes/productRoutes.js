const express = require('express');
const productController = require("../controllers/productController")
const route = express.Router();
route.get("/", productController.list);
route.get("/:Id", productController.getOne);
route.post("/add", productController.create);
route.delete("/delete/:id",productController.remove)
route.put("/update/:id",productController.update)


module.exports= route;