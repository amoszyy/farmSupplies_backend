const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()
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

app.listen(PORT, ()=>{
    console.log("app is listening at " + PORT)
})

