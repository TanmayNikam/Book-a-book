require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require("cors")
// const { body, validationResult } = require('express-validator');


const uri = `mongodb+srv://tan_pro1:${process.env.DB_PASSWORD}@cluster0.h9hmd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`


mongoose.connect(uri,{ useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex:true},()=>{ 
    console.log("Database connected successfully!");
})



//middlewares
app.use(morgan('dev')) 
app.use(express.json())
app.use(cookieParser())
app.use(cors())

//routes middlewares 
const authRouter = require("./routes/auth.js");
const userRouter = require("./routes/user.js")
const categoryRoutes = require("./routes/category.js")
const productRoutes = require("./routes/product.js")
const paymentRoutes = require("./routes/payment.js")
app.use("/api",authRouter)
app.use("/api",userRouter)
app.use("/api",categoryRoutes)
app.use("/api",productRoutes)
app.use("/api",paymentRoutes)



const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Server started and running on port ${port}`);
})