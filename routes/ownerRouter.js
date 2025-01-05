const express = require("express")
const router = express.Router()
const path = require('path')
const app = express()
const ownerModel = require("../models/ownerModel")

app.use(express.static(path.join(__dirname,"public")))

router.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, "../views/admin/AdminDashboardPage.html"));
})
router.get("/addproducts",(req,res)=>{
    res.sendFile(path.join(__dirname, "../views/admin/AddProducts.html"));
})
router.get("/currentproducts",(req,res)=>{
    res.sendFile(path.join(__dirname, "../views/admin/CurrentProducts.html"));
})
router.get("/currentorders",(req,res)=>{
    res.sendFile(path.join(__dirname, "../views/admin/CurrentOrders.html"));
})
router.get("/pastorders",(req,res)=>{
    res.sendFile(path.join(__dirname, "../views/admin/PastOrders.html"));
})


module.exports = router;
