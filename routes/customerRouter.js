const express = require("express")
const router = express.Router()
const userModel = require("../models/customerModel")
const productModel = require("../models/productModel")
const path = require('path')
const app = express()
app.use(express.static(path.join(__dirname,"public")))


router.get("/", function (req, res) {
    res.send("hey")
})

module.exports = router;