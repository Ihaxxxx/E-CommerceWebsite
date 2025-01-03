const express = require("express")
const router = express.Router()
const path = require('path')
const app = express()
app.use(express.static(path.join(__dirname,"public")))

const {registerUser,loginUser,logout} = require("../controllers/userAuthorisation")



router.get("/", function (req, res) {
    res.send("hey")
})

router.post("/register", registerUser)
router.get("/logout",logout)
router.post("/login", loginUser)


module.exports = router;