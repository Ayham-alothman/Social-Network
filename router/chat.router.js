const auth=require('../protect/athu')
const con=require('../controllar/chat.controllar')

const express=require('express');

const router=express.Router();

router.get('/:chatid',auth.istoken,con.getallmessages);


module.exports=router;

