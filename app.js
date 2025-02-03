const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const path = require('path')
const ownersRouter = require('./routes/ownerRouter')
const productsRouter = require('./routes/productRouter')
const customerRouter = require('./routes/customerRouter')
const mainRouter = require('./routes/mainRouter')
const expressSession = require('express-session')
const flash = require("connect-flash")
const bodyParser = require('body-parser')
// const cors = require('cors')
require('dotenv').config();


const db = require("./config/mongoose-connection")


// app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(
    expressSession({
        resave : false,
        saveUninitialized : false,
        secret:process.env.EXPRESS_SESSION_SECRET,
    })
)

app.use(bodyParser.json({ limit: '64mb' }));
app.use(bodyParser.urlencoded({ limit: '64mb', extended: true }));

app.use(flash())
app.use(express.static(path.join(__dirname,"public")))

app.use("/",mainRouter)
app.use("/customer",customerRouter)
app.use("/owner",ownersRouter)
app.use("/product",productsRouter)

app.listen(3000)