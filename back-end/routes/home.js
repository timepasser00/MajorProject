const express = require("express");
const { signUp, logIn ,findUserType,getId} = require("../controller/home");
const router = express.Router();

router.post("/signUp", signUp);
router.post("/logIn", logIn);
router.post("/findUserType", findUserType);
router.post("/getId/:walletAddress", getId);
module.exports = router;
