var mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
  fullname: {
    type: String,
    minLength: 3,
    trim: true,
  },
  email: String,
  password: String,
  cartDetails:[
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
  activeOrder: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "order",
    default: [],
  }],
  pastOrders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "order",
    default: [],
  }],
  contact: Number,
  verified: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("customer", customerSchema)