const userModel = require("../models/userModel");


const userId = async(req, res) => {
    try {
        const user = await userModel.findById(id).exec(); //tim user dua vao id
        req.profile = user;
        next();
    } catch (error) {
        res.status(400).json({
            text: "user khong ton tai !"
        })
    }
} 

const read = (req, res)=> {
    const user = req.profile;
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
}
module.exports= {
    userId: userId,
    read: read
}