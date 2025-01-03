const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const path = require('path')
// const ownersRouter = require('./routes/ownerRouter')
// const productsRouter = require('./routes/productsRouter')
const customerRouter = require('./routes/customerRouter')
const mainRouter = require('./routes/mainRouter')
const expressSession = require('express-session')
const flash = require("connect-flash")

const db = require("./config/mongoose-connection")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
// app.use(
//     expressSession({
//         resave : false,
//         saveUninitialized : false,
//         secret:process.env.EXPRESS_SESSION_SECRET,
//     })
// )

app.use(flash())
app.use(express.static(path.join(__dirname,"public")))

app.use("/",mainRouter)
app.use("/customer",customerRouter)

app.listen(3000)