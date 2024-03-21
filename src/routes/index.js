const category = require("./categoryRoutes")
const products = require("./productRoutes")
const users = require("./userRoutes")
const auths = require("./authRoutes")

const AllPro = (app) =>{
    app.use("/categorys", category)
    app.use("/products", products)
    app.use("/users", users)
    app.use("/auths", auths)
}

module.exports = AllPro