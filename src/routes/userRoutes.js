const express = require("express");
const route  = express.Router();
const userController = require("../controllers/userController")
//info user
route.get("/:Id",userController.userId );
route.delete("/delete/:Id",userController.deleteUser );
route.get("/",userController.getAll );
module.exports = route