const express = require("express");
const {signin, signup} = require("../controllers/authController")
const route  = express.Router();

route.post("/signup", signup)
route.post("/signin", signin)


module.exports = route