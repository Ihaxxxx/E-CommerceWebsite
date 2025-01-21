const customerModel = require("../models/customerModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { generateToken } = require("../utilities/generateToken")


module.exports.registerUser = async function (req, res) {
    try {
        let { email, fullname, password } = req.body;
        // console.log(email)
        let user = await customerModel.findOne({ email: email })
        if (user) {
            res.json({success:false})
            return
        }
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.send(err.message)
                else {
                    const user = await customerModel.create({
                        email,
                        fullname,
                        password: hash,
                    })
                    let token = generateToken(user)
                    res.cookie("token", token)
                    res.json({success:true})
                }
            })
        })
    } catch (error) {
        console.log("nigga")
        console.log(error.message)
    }
}


module.exports.loginUser = async function (req, res) {
    let { email, password } = req.body
    let user = await customerModel.findOne({ email: email })
    if (!user) return res.json({success:false})
    bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
            let token = generateToken(user)
            res.cookie("token", token)
            res.json({success:true})
            // res.redirect("/shop")
        } else {
            res.json({success:false})
        }
    })
}


module.exports.logout = async function (req, res) {
    res.cookie("token","")
    res.redirect("/loginPage")
}

