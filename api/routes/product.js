const express = require("express");
const router = express.Router();
const mongoose = require("mongoose"); // Add this line
const Product = require('./model/product');
const bodyParser = require("body-parser"); // Import body-parser

const { Console } = require("console");
// Replace body-parser with express.json()
router.use(express.json());

// don't use /products because it is appear in app.use in app.js
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET request to /products",
  });
});

router.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  product
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /products",
        createdProduct: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  if (id === "special") {
    res.status(200).json({
      message: "You discovery product with ID ",
      id: id,
    });
  } else {
    res.status(200).json({
      message: "You ID is incorrect",
      id:id,
    });
  }
});

router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  if (id === "special") {
    res.status(200).json({
      message: "Update Product with ID",
      id: id,
    });
  } else {
    res.status(200).json({
      message: "You ID is incorrect",
    });
  }
});

router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  if (id === "special") {
    res.status(200).json({
      message: "Delete Product with ID",
      id: id,
    });
  } else {
    res.status(200).json({
      message: "You ID is incorrect",
    });
  }
});
module.exports = router;
