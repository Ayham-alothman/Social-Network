const express= require('express');
const router=express.Router();
const auth=require('../protect/athu')
const con =require('../controllar/friend.controllar');
const {cancelRequestContollar}=require('../controllar/friend.controllar')
router.post('/add',auth.istoken,con.addfriend)
router.post('/submite',auth.istoken,con.acceptrequest)

router.post('/cancel',auth.istoken,cancelRequestContollar)
router.post('/cancelsubmite',auth.istoken,con.cancelsubmite)

router.post('/delete',auth.istoken,con.deletefriend)

module.exports=router;
