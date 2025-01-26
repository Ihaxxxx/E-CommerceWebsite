const customerModel = require("../models/customerModel")
const productModel = require("../models/productModel")
const orderModel = require("../models/orderModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { generateToken } = require("../utilities/generateToken")

module.exports.addToCart = async function (req, res) {
    try {
        let productId = req.body.productID
        let quantity = req.body.quantity
        const customer = await customerModel.findOneAndUpdate(
            { _id: req.user._id, 'cartDetails.product': productId },
            {
                $inc: { 'cartDetails.$.quantity': quantity },
            },
            { new: true, upsert: false }
        );
        if (!customer) {
            await customerModel.findOneAndUpdate(
              { _id: req.user._id },
              {
                $push: { cartDetails: { product: productId, quantity } },
              },
              { new: true }
            );
          }
        res.status(200).send('Product added to cart successfully');
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occurred while updating the cart');
    }
}

module.exports.CartDetails = async function(req,res) {
  let customer =  await customerModel.findOne({id:req.user_id}).populate('cartDetails.product')
  res.json(customer.cartDetails)
}

module.exports.removeCart = async function(req,res) {
  let customer = await customerModel.findOneAndUpdate(
    { id: req.user_id },
    { $pull: { "cartDetails": { product: req.body.id } } },
    { new: true }
  );
}

module.exports.increaseQuantity = async function(req,res) {
  let customer = await customerModel.findOneAndUpdate(
    { id: req.user_id, "cartDetails.product": req.body.id },
    { "cartDetails.$.quantity": req.body.quantity },
    { new: true }
  );
}

module.exports.decreaseQuantity = async function(req,res) {
  let customer = await customerModel.findOneAndUpdate(
    { id: req.user_id, "cartDetails.product": req.body.id },
    { "cartDetails.$.quantity": req.body.quantity },
    { new: true }
  );
}

module.exports.placeOrder = async function(req,res) {
  let {address,email,city,state,orderDescription} = req.body
  let customer = await customerModel.findOne({id:req.user_id}).populate('cartDetails.product')

  let productDetails = customer.cartDetails.map(cartItem => ({
    product: cartItem.product._id,
    quantity: cartItem.quantity,
  }));
  

  let order = await orderModel.create({
    customerID : req.body.id,
    address,
    email,
    city,
    state,
    orderDescription,
    productDetails
  })
  customer.cartDetails = [];
  customer.activeOrder.push(order._id);
  await customer.save();
  res.json({success:true})
}


module.exports.getOrderDetails = async function (req,res) {
  let customer = await customerModel.findOne({id:req.user_id}).populate('activeOrder')
  res.json(customer.activeOrder)
}