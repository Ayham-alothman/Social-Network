const jwt=require('jsonwebtoken')
const model=require('../model/signup.model')

viewsignup=(req,res)=>{  res.render('signup')   }


senddatasignup=(req,res)=>{
let mydata={
name:req.body.name,
password:req.body.password,
email:req.body.email,

}
 const token= jwt.sign(mydata,process.env.SecrtKey)
model.insertdatatousers(mydata).then((d)=>{res.status(200).json(token)})
.catch((e)=>{res.status(403).json({e:e})})
}







module.exports={viewsignup,senddatasignup}