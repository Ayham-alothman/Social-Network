const express= require('express');
const router = express.Router();

const con =require('../controllar/login.controllar')

router.get('/',con.viewlogin)
router.post('/',con.conlogin)

module.exports=router;