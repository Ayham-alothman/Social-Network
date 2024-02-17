const mongo=require('mongodb').MongoClient;

const obid=require('mongodb').ObjectId;

const url= 'mongodb://127.0.0.1:27017';


savemesages=(datasave)=>{


datasave.chatid=obid(datasave.chatid);
mongo.connect(url,(err,client)=>{

  const db= client.db('chatapp')
   
  db.collection('messages').insertOne(datasave)


})//end mongo


}//end function


module.exports={savemesages}