const express = require('express')
const router = express.Router()
const app = express()
const productModel = require("../models/productModel")
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(express.static(path.join(__dirname,"public")))

router.get("/",(req,res)=>{
    res.json("hey")
})

router.post("/addproduct",async(req,res)=>{
    try {
        let {image,name,price,discount,description} = req.body
        let product = await productModel.create({
            image,
            name,
            price,
            discount,
            description,
        })
        console.log(product)
    } catch (error) {
        console.log(error)
    }

})

router.get("/seeproductsadminside",async(req,res)=>{
    try {
        let products = await productModel.find()
        res.json(products)
    } catch (error) {
        console.log(error)
    }
})

router.get("/edit",async(req,res)=>{
    res.sendFile(path.join(__dirname, "../views/admin/EditProduct.html"));
})

router.post("/getproductdata",async(req,res)=>{
    let id = req.body.id
    let product =await productModel.findById(id)
    res.json(product)
})

router.post("/editProductChanges",async(req,res)=>{
    let {image,name,price,discount,description} = req.body
    let product = await productModel.findOneAndUpdate({_id:req.body.id},{
        image,
        name,
        price,
        discount,
        description,
    })
    res.json({success:true})
})



module.exports = router;
