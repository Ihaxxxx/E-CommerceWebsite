const jwt = require('jsonwebtoken')
const userModel = require("../models/customerModel")

module.exports.isLoggedIn = async function(req,res,next){
    if (!req.cookies.token) {
        return res.redirect("/loginPage")
    }
    try {
        let decoded = jwt.verify(req.cookies.token,process.env.JWT_KEY)
        let user = await userModel.findOne({email:decoded.email}).select("-password")
        req.user = user
        next()
    } catch (err) {
        req.flash("error","something went wrong")
        res.redirect("/loginPage")
    }
}