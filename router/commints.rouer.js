const {saveCommintControllar}=require('..//controllar/commints.controllar')
const Router =require('express').Router();
const auth=require('../protect/athu')

Router.post('/',auth.istoken,saveCommintControllar);
module.exports=Router;
