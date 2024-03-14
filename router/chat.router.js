const auth=require('../protect/athu')
const {getallmessages,getChatsControllar}=require('../controllar/chat.controllar')

const express=require('express');

const router=express.Router();

router.get('/:id',auth.istoken,getallmessages);
router.get('/',auth.istoken,getChatsControllar);


module.exports=router;

