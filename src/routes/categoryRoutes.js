const express = require("express");
const route  = express.Router();
const {isAdmin, isAuth} = require("../controllers/authController")
const {list, create, read, update, remove} = require("../controllers/categoryController");
const { userId } = require("../controllers/userController");
route.get("/", list);
route.get("/:slug", read);
route.patch("/:slug", update)
route.post("/:userId", isAuth, isAdmin, create);
route.delete("/:slug",remove )
route.param("userId", userId)

module.exports = route