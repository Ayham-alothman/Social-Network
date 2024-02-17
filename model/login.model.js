const mongo=require('mongodb').MongoClient;
const bcrypt =require('bcrypt');
const url= 'mongodb://127.0.0.1:27017';

surelogin=(indata)=>{console.log(indata)
return new Promise((resolve,reject)=>{

mongo.connect(url,(err,client)=>{

if(err) throw err

let db=client.db('chatapp');

db.collection('users').findOne({email:indata.email}).then((data)=>{
if(data){
    
bcrypt.compare(indata.password,data.password).then((da)=>{if(da){
resolve(data)

}
reject('the password is worng')


}).
catch((err)=>{Error(err)})


}
else{reject('the email not exsist')}
}).catch((err)=>{

Error(err)

})



})//end function mongo

})// end function promise
}//end function

module.exports={surelogin}