const express = require("express");
const cors = require("cors"); // ngăn chặn các yêu cầu http
// const path = require('path');
// const {readFileSync} = require('fs');//cần đọc hoặc ghi dữ liệu từ/đến file trên hệ thống tệp (file system), bạn có thể sử dụng fs để thực hiện các thao tác này.
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express"); //là một thư viện giúp tạo ra tài liệu API Swagger/OpenAPI thông qua các chú thích (jsdoc) trong mã nguồn của minh.
// const {dirname} = require("path");
const route = require("./src/routes/index");
const connectDB = require("./src/config/mongoose");
const morganLogger = require("./src/config/morgan");
const connectEngine = require("./src/config/engine");
const app = express();
require("dotenv").config();
connectEngine(app);
const options = {
  failOnErrors: true,
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NEW API',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);
// console.log(specs)
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));


// su dung morganLogger
app.use(morganLogger);

//connect mongodb
connectDB();

//connect cors
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//connect routes
route(app);

//connect cors
app.use(cors);

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log("success !", port);
});
