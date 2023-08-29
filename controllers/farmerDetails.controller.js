const express = require("express")
const farmerModel = require("../models/farmerModels")
let jwt = require("jsonwebtoken")



const registerFarmer = (req, res)=>{
    console.log(req.body);
    farmerModel.findOne({email:req.body.email}, (err, result) => {});
    let form = new farmerModel(req.body);
    form.save((err) => {
      if (err) {
        console.log(err);
        res.send({ message: "unable to register", status: false, err });
  
        console.log("operation failed");
      } else {
        console.log("successful");
        res.send({
          message: "Registered Successfully",
          details: (req.body.businessName, req.body.email, req.body._id),
          status: true,
        });
      }
    });

}

const authenticateFarmer =(req, res)=>{
let {email, password } = req.body;
farmerModel.findOne({email:req.body.email}, (err, user) => {
  if (err) {
    res.send({ message: "server error", status:false});
    console.log("error guyy");
  } else {
    if (user) {
      user.validatePassword(password, (err, same) => {
        if (err) {
          res.send({ message: "Server error", status:false});
        } else {
          if (same) {
            let secret = process.env.SECRET
            let token = jwt.sign({email}, secret, {expiresIn:'1h'})
            res.send({
              user,
              message: "farmer logged in successfully",
              status: true,
              token
            });
            console.log("correct");
          } else {
            res.send({ message: "wrong password", status:false});
            console.log("wrong");
          }
        }
      });
    } else {
      res.send({ message:"wrong email"});
    }   
  }
});


}

module.exports={registerFarmer, authenticateFarmer}