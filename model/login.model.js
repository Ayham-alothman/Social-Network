const mongo=require('mongodb').MongoClient;
const bcrypt =require('bcrypt');

surelogin=(indata)=>{
return new Promise((resolve,reject)=>{

mongo.connect(process.env.Url,(err,client)=>{

if(err) throw err

let db=client.db('chatapp');

db.collection('users').findOne({email:indata.email}).then((data)=>{
  if(data){
      
     bcrypt.compare(indata.password,data.password).then((da)=>{console.log(da)
         if(da){resolve(data)}
         else if(!da){reject('the password is worng');} }).catch((err)=>{Error(err)})
  
  
  }
  else{reject('the email not exsist')}
}).catch((err)=>{ Error(err); }) 


    })//end function mongo
 
  })// end function promise
}//end function

module.exports={surelogin}