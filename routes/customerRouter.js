const express = require("express")
const router = express.Router()
const path = require('path')
const app = express()
app.use(express.static(path.join(__dirname,"public")))

const {registerUser,loginUser,logout} = require("../controllers/userAuthorisation")
const {addToCart,CartDetails} = require("../controllers/userDataController")
const { isLoggedIn } = require("../middlewares/isLoggedin")



router.get("/", function (req, res) {
    res.send("hey")
})

router.post("/register", registerUser)
router.get("/logout",logout)
router.get("/cartdetails",isLoggedIn,CartDetails)
router.post("/login", loginUser)

router.post("/addtocart",isLoggedIn,addToCart)

module.exports = router;