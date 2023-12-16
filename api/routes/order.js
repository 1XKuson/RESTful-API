const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Order was successfully fetch ",
  });
});

router.post("/", (req, res, next) => {
  res.status(200).json({
    message: "Order was Created successfully",
  });
});

router.get("/:orderID", (req, res) => {
  res.status(200).json({
    message: "Order was successfully fetch with ID ",
    orderId: req.params.orderID,
  });
});

router.delete("/:orderID", (req, res) => {
  res.status(200).json({
    message: "Order was successfully Deleted with ID ",
    orderId: req.params.orderID,
  });
});

module.exports = router;
