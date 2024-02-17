const express=require('express');

const router=express.Router();

const con =require('../controllar/requests.controllar')
const auth=require('../protect/athu')

router.get('/',auth.istoken,con.sendrequest)




module.exports=router