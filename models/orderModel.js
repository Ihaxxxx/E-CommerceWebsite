var mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    customerID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "customer"
    },
    orderNo : {
        type: Number,
        default: 0,
    },
    productDetails: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
        },
    ],
    orderDate: {
        type: Date,
        default: Date.now,
    },
    orderDescription:{
        type : String,
    },
    completed : {
        type : Boolean,
        default : false,
    },
    email:{
        type:String
    },
    address:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },

})



module.exports = mongoose.model("order",orderSchema)
