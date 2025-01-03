const express = require("express")
const router = express.Router()
const userModel = require("../models/customerModel")
const productModel = require("../models/productModel")
const path = require('path')
const app = express()
app.use(express.static(path.join(__dirname,"public")))


router.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, "../views/signupPage.html"));
})

router.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname, "../views/loginPage.html"));
})

module.exports = router
