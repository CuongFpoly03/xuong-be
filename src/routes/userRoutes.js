const express = require("express");
const route  = express.Router();
const userController = require("../controllers/userController")
const {isAdmin, isAuth} = require("../controllers/authController")
//info user
route.post("/",userController.userId );
route.get("/:userId", userController.read);
//check admin 
route.get("/secret/:userId", isAuth, isAdmin, userController.read)
module.exports = route