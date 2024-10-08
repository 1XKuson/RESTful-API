const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); // Import body-parser

const url = "mongodb://127.0.0.1:27017/TestAPI_DB";
mongoose.connect(url,{
}).catch(err => console.error(err));  


const ProductRoutes = require("./api/routes/product");
const OrderRoutes = require("./api/routes/order");
const UserRoutes = require("./api/routes/user");


app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//middleware
app.use("/products", ProductRoutes);
app.use("/order", OrderRoutes);
app.use("/user", UserRoutes);

// Handle routes that require
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error,req, res, next) => {
    res.status(error.status||500);
    res.json({
        error: {
            message : error.message
        }})
});
module.exports = app;
