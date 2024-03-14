
const {getMessagesControllar}=require('../controllar/messages.controllar')
const auth=require('../protect/athu')
const Router=require('express').Router();

Router.get('/:chatid',auth.istoken,getMessagesControllar)

module.exports=Router;