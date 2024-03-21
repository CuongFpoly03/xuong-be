const express = require("express");
const route  = express.Router();
const userController = require("../controllers/userController")
const {isAdmin, isAuth} = require("../controllers/authController")
//info user
route.get("/:Id",userController.userId );
route.post("/add", userController.createUser);
//check admin 
route.get("/secret/:userId", isAuth, isAdmin, userController.read)
module.exports = route