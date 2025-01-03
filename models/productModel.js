var mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    image:{
        type : Array
    },
    name: String,
    price:Number,
    dicount:{
        type : Number,
        default : 0 ,
    },
    productUploadedDate: { type: Date, default: Date.now },
    inventory : Number
});

module.exports = mongoose.model("product",productSchema)