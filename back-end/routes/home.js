const express=require('express');
const {
    signUp
} = require('../controller/home')
const router=express.Router();

router.post('/home/signUp',signUp);

module.exports = router;