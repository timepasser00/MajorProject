const express = require("express");
const { signUp, logIn ,findUserType} = require("../controller/home");
const router = express.Router();

router.post("/signUp", signUp);
router.post("/logIn", logIn);
router.post("/findUserType", findUserType);
module.exports = router;
