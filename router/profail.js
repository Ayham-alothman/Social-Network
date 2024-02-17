const express =require('express');

const router=express.Router();

const auth=require('../protect/athu')

const con=require('../controllar/profail.cotrollar')

router.get('/:id',auth.istoken,con.getdata)


module.exports=router