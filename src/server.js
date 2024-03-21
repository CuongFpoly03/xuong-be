const express = require ("express");
const cors = require("cors") // ngăn chặn các yêu cầu http
const path = require('path');
// const {readFileSync} = require('fs');//cần đọc hoặc ghi dữ liệu từ/đến file trên hệ thống tệp (file system), bạn có thể sử dụng fs để thực hiện các thao tác này. 
const swaggerUI = require("swagger-ui-express");//được sử dụng để hiển thị và tương tác với tài liệu API
const swaggerJSDoc = require("swagger-jsdoc")//là một thư viện giúp tạo ra tài liệu API Swagger/OpenAPI thông qua các chú thích (jsdoc) trong mã nguồn của minh.
// const {dirname} = require("path");
const route = require("./routes/index")
const connectDB = require("./config/mongoose")
const morganLogger = require("./config/morgan");
require('dotenv').config();
const app = express();

const options = {
    definition: {
        openapi: "3.0.3",
        info : {
            title: "Library API",
            version: "1.0.0",
            description: "a simple express library API"
        },
        servers : [
            {
                url: "http://localhost:8080"
            }
        ]
    },
    apis: ["./routes/*.js", "./controllers/*.js", "./models/*.js"]
}

// su dung morganLogger
app.use(morganLogger);

//connect mongodb
connectDB();

//connect cors
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());

//connect routes
route(app);


//section option
const specs = swaggerJSDoc(options);
app.use("api/docs", swaggerUI.serve, swaggerUI.setup(specs))

//connect cors
app.use(cors);

const port = process.env.PORT || 9000
app.listen(port, () => {
    console.log("success !", port);
})  