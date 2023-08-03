const express = require("express")
const {registerFarmer, authenticateFarmer} = require("../controllers/farmerDetails.controller");
const router = express.Router()
router.post("/farmersignup", registerFarmer)
module.exports = router;
