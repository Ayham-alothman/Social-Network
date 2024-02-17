const mongo =require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');

const url= 'mongodb://127.0.0.1:27017';
getdataid=(id,myid)=>{
    
return new Promise((resolve,reject)=>{
mongo.connect(url,(err,client)=>{
if(err) throw err;

const db=client.db('chatapp');

db.collection('users').findOne({_id:ObjectId(id)}).then((data)=>{
let state;

if(id===myid.id){state='me'}
else if(data.friends.find(ele=>{
    if(ele.id==myid.id){
        return true
    }
})){state='friend'}

else if(data.receivererequest.find(ele=>{
    if(ele.id==myid.id){
        return true
    }
})){state='receiverequest'}

else if(data.sendrequest.find(ele=>{
    if(ele.id==myid.id){
        return true
    }
})){state='sendrequest'}

else{
    state='nofriend'
}




//if(data._id===myid){state='me'}
//if(data.friends.includes(myid)){state='friend'}
//
//if(data.receivererequest.includes(myid)){state=`receiverequest`;console.log('myid send id')}
//if(data.sendrequest.includes(myid)){state=`sendrequest`;console.log('id send myid')}
//if(!data.sendrequest.includes(myid)&&!data.receivererequest.includes(myid)
//&&!data.friends.includes(myid)){
//    state="nofriend"
//}
data.state=state;

resolve(data);

}).catch((err)=>{reject(Error(err))})


})
})
}

module.exports={getdataid}