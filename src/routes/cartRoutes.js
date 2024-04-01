const express = require("express");
const cartController = require("../controllers/cartController");
const routes = express.Router();

routes.get("/:userId", cartController.getOneCart);
routes.post("/addtocart", cartController.addToCart);
routes.delete("/delete", cartController.deleteCart);
routes.put("/update", cartController.updateCart);

module.exports = routes;
