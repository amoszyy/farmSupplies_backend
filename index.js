const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()
app.use(cors())
const bodyParser = require("body-parser")
app.use(bodyParser.json({limit:"50mb"}))
app.use(express.urlencoded({extended:true, limit:"50mb"}))
app.use(express.json())


const PORT = process.env.PORT
const URI = process.env.MONGO_URI
mongoose.connect(URI, (err)=>{
    if(err){
        console.log("an error occured")
        console.log(err)
    } else{
        console.log("mongoose has connected successfully")
    }
})
const farmerRouter = require("./routes/farmerRoutes.controller")
app.use("/farmerdetails", farmerRouter)

app.listen(PORT, ()=>{
    console.log("app is listening at " + PORT)
})

