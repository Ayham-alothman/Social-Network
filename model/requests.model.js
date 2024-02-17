
const mongo=require('mongodb').MongoClient;
const id=require('mongodb').ObjectId
const url= 'mongodb://127.0.0.1:27017';


getallrequest=(myid)=>{
    
return new Promise((res,rej)=>{


    mongo.connect(url,(err,client)=>{

if(err) throw err;

        const db=client.db('chatapp')
        
        db.collection('users').findOne({_id:id(myid)}).then((data)=>{
        
           res(data.receivererequest)  //"receivererequest"

           

    
        })
        .catch((err)=>{        rej(Error(err)) })
    
    
    
        })//end mongo



})///end promise


}//end function
module.exports={getallrequest}