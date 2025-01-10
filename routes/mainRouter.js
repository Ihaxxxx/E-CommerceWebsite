const express = require("express")
const router = express.Router()
const userModel = require("../models/customerModel")
const productModel = require("../models/productModel")
const path = require('path')
const app = express()
app.use(express.static(path.join(__dirname,"public")))


router.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, "../views/customer/ShopPage.html"));
})

router.get("/loginPage",(req,res)=>{
    res.sendFile(path.join(__dirname, "../views/customer/loginPage.html"));
})

router.get("/SignUp",(req,res)=>{
    res.sendFile(path.join(__dirname, "../views/customer/signupPage.html"));
})

router.get("/shop",(req,res)=>{
    res.sendFile(path.join(__dirname, "../views/customer/ShopPage.html"));
})
router.get("/cart",(req,res)=>{
    res.sendFile(path.join(__dirname, "../views/customer/Cart.html"));
})

module.exports = router
