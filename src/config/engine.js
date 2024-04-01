const express = require("express");

const connectEngine = (app) => {
    app.use(express.static('./src/index.js'));
    app.set("view engine", "ejs");
    app.set("views", "./src/views")
}

module.exports = connectEngine;