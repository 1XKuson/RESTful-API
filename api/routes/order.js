const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); // Import body-parser
router.use(express.json());

// import models 
const Product = require("../model/product");
const Order = require("../model/order");

router.get("/", (req, res) => {
  Order.find()
    .select('product quantity _id')
    .populate('product','name')
    .exec()
    .then(docs =>{
      res.status(200).json({
        count : docs.length,
        orders : docs.map( doc => {
          return {
            _id : doc._id,
            product : doc.product,
            quantity : doc.quantity,
            request :{
              type : 'GET',
              url : 'http://localhost:8080/order/'+doc._id
            }
          }
        }),
      
      });
    })
    .catch(err => {
      res.status(500).json({
        error : err
      });
    })
});

router.post("/", (req, res, next) => {
  const productId = req.body.productId
  const quantity = req.body.quantity
  Product.findById({_id: productId})
    .then(product => {
      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        });
      }
      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        quantity: quantity,
        product: productId
      });
      return order.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Order stored",
        createdOrder: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity
        },
        request: {
          type: "GET",
          url: "http://localhost:8080/orders/" + result._id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:orderID", (req, res) => {
  const orderID = req.params.orderID;
  Order.findById({_id :orderID})
    .populate('product')
    .exec()
    .then(order =>{
      res.status(200).json({
        order: order,
        request: {
          type : "GET",
          url: "http://localhost:8080/order/" 
        }
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    })
});

router.delete("/:orderID", (req, res) => {
  const orderID  = req.params.orderID
  Order.delete({_id : orderID})
    .exec()
    .then(result => {
      res.status(200).json({
        message :"Order deleted",
        request: {
          type : "POST",
          url: "http://localhost:8080/order/",
          body: { 
            productId: "ID", 
            quantity: "Number" 
          }
        }
      })
    })
    .catch()
});

module.exports = router;
