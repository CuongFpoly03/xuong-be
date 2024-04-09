const express = require("express");
const orderController = require("../controllers/order");
const routes = express.Router();

routes.get("/", orderController.getAllOrders);
routes.post("/add", orderController.createOrder);
routes.get("/:id", orderController.getOrderById);
routes.delete("/delete/:id", orderController.deleteOrder);
routes.put("/update/:id", orderController.updateOrder);

module.exports = routes;
