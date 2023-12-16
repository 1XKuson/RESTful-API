const express = require("express");
const app = express();
const ProductRoutes = require("./api/routes/product");
const OrderRoutes = require("./api/routes/order");
//middleware
app.use("/products", ProductRoutes);
app.use("/order", OrderRoutes);
module.exports = app;
