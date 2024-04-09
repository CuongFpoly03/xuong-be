const express = require("express");
const cartController = require("../controllers/cartController");
const routes = express.Router();

routes.get("/:userId", cartController.getCartByUserId);
routes.post("/addtocart", cartController.addItemToCart);
routes.post("/decrement", cartController.decreaseProductQuantity);
routes.post("/increment", cartController.increaseProductQuantity);
routes.post("/delete", cartController.removeFromCart);
routes.post("/update", cartController.updateProductQuantity);
routes.get("/", cartController.getAll);

module.exports = routes;
