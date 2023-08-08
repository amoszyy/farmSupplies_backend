const express = require("express")
const farmerModel = require("../models/farmerModels")

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
          details: form,
          status: true,
        });
      }
    });

}

const authenticateFarmer =(req, res)=>{
let { password } = req.body;
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
            res.send({
              user,
              message: "farmer logged in successfully",
              status: true,
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