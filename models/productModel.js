var mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    image:{
        type : Array
    },
    name: String,
    price:Number,
    discount:{
        type : Number,
        default : 0 ,
    },
    productUploadedDate: { type: Date, default: Date.now },
    inventory :{
        type : Number,
        default : null,
    },
    description : String,
});

module.exports = mongoose.model("product",productSchema)