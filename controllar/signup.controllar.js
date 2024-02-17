const model=require('../model/signup.model')

viewsignup=(req,res)=>{

res.render('signup')

}


senddatasignup=(req,res)=>{
let mydata={
name:req.body.name,
password:req.body.password,
email:req.body.email,

}
model.insertdatatousers(mydata)
}







module.exports={viewsignup,senddatasignup}