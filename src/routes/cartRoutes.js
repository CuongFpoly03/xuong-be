const express = require("express");
const cartController = require("../controllers/cartController")
const routes  = express.Router();

routes.post("/", cartController);

module.exports = routes