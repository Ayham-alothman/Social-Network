const express =require('express');
const router =express.Router();
const auth= require('../protect/athu')
const con =require('../controllar/home.controllar')
const jwt=require('../protect/jwt')


    router.get('/',auth.istoken,con.handelhome)

    router.post('/',con.handelhome)




module.exports=router;
