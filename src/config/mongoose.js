const  mongdb = require("mongoose");


const connectDB = async() => {
    try {
        await mongdb.connect("mongodb://localhost:27017/practice"   );
        console.log("Mongodb success !");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}
module.exports = connectDB;