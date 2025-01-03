const express = require("express")
const router = express.Router()
const path = require('path')
const app = express()
const ownerModel = require("../models/ownerModel")

app.use(express.static(path.join(__dirname,"public")))

router.get("/",(req,res)=>{
    res.send("meow")
})


module.exports = router;
