const express = require("express");
// const attributeController = require("../controllers/atributeController");
const valueAttributeController = require("../controllers/atributeController");
const routes = express.Router();

// //atribute
// routes.get("/", attributeController.getAllAttributes);
// routes.post("/add", attributeController.createAttribute);
// routes.get("/:id", attributeController.getAttributeById);
// routes.delete("/delete/:id", attributeController.deleteAttribute);
// routes.put("/update/:id", attributeController.updateAttribute);
//valueattribute
routes.get("/", valueAttributeController.getAllValueAttributes);
routes.post("/add", valueAttributeController.createValueAttribute);
routes.get("/:id", valueAttributeController.getValueAttributeById);
routes.delete("/delete/:id", valueAttributeController.deleteValueAttribute);
routes.put("/update/:id", valueAttributeController.updateValueAttribute);
module.exports = routes;
