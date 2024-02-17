
const { header } = require('express/lib/response')
const jwt=require('jsonwebtoken')
const con =require('../model/login.model')

viewlogin=(req,res)=>{
    console.log('ser')
res.status(200).render('login',{id:false,token:false})


}


conlogin=(req,res)=>{
    
    
console.log(req.body)
con.surelogin(req.body).then((data)=>{
console.log('true')
let ob={
    id:data._id,name:data.name,email:data.email,friends:data.friends,
    sendreq:data.sendrequest,receivereq:data.receivererequest
}
    console.log(process.env.SecrtKey);
    const token=jwt.sign(ob,process.env.SecrtKey)
    console.log(token)
   
    res.status(200).setHeader('Access-Control-Expose-Headers','*')
    .setHeader('content-type','application/json')
    .setHeader('token',token).end();

   // res.status(200).cookie('token',token).redirect('/');

}).catch((err)=>{console.log(err);res.status(400).end()})

}//end function

module.exports={viewlogin,conlogin}