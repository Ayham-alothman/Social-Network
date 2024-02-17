const express=require('express');

const router = express.Router();

const check = require('express-validator').check();
    


const con=require('../controllar/signup.controllar')

router.get('/',con.viewsignup)
router.post('/',con.senddatasignup)

module.exports=router;