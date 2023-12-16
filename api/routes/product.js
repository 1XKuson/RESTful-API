const express = require("express");
const router = express.Router();

// don't use /products because it is appear in app.use in app.js

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET request to /products",
  });
});

router.post("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling POST request to /products",
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
