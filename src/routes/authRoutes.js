const express = require("express");
const route  = express.Router();
const authController = require('../controllers/authController')
// const {registerSchema, loginSchema} = require("../validations/auth")
route.post("/signup",authController.register)
route.post("/signin", authController.login)

module.exports = route