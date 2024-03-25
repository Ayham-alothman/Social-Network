const {savePostControllar,deletePostControllar,getOwnPostsControllar} =require('../controllar/post.controllar')
const  auth=require('../protect/athu');
const Router=require('express').Router();

Router.post('/',auth.istoken,savePostControllar);
Router.delete('/',auth.istoken,deletePostControllar);
Router.get('/',auth.istoken,getOwnPostsControllar);


module.exports=Router;