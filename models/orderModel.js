var mongoose = require('mongoose');

const orderSchema = mongoose.Scheme({
    customerID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "customer"
    },
    orderNo : Number,
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
})



module.exports = mongoose.model("order",orderSchema)
