var mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
  fullname : {
    type : String,
    minLength : 3 ,
    trim : true,
  },
  email:String,
  password : String,
  cart :[{
    type : mongoose.Schema.Types.ObjectId,
    ref:"product",
    default:[],
  }],
  activeOrder:[{
    type : mongoose.Schema.Types.ObjectId,
    ref:"order",
    default:[],
  }],
  pastOrders:[{
    type : mongoose.Schema.Types.ObjectId,
    ref:"order",
    default:[],
  }],
  contact : Number,
  verified : {
    type : Boolean,
    default : false
  }
});

module.exports = mongoose.model("customer",customerSchema)