const { Collection } = require('mongo');
const {MongoClient,ObjectId} =require('mongodb');

async function getChat(myid,iduser){
  const Client=new MongoClient(process.env.Url);
  try{
    const Db=Client.db('chatapp');
    const Coll=await Db.collection('chats');
    const Data1=await Coll.findOne({users:{$all:[myid,iduser]}});
    const Data2=await Coll.findOne({users:{$all:[iduser,myid]}});
    if(Data1||Data2){
      return Data1._id||Data2._id
    }
    else if(!Data1&&!Data2){
     const Chat= await Coll.insertOne({users:[myid,iduser]});
     return Chat.insertedId;
    }


  }
  catch(e){return e}
  finally{await Client.close()}
}//end fun


async function getChats (iduser){
  const Client = new MongoClient(process.env.Url);
  
  try{
    const Db= Client.db('chatapp');
    const Coll=await Db.collection('chats');
    const pipline=[
      {$unwind:'$users'},
      {$match:{users: { $not: { $eq: iduser } }}},
      {$project:{users:{$toObjectId:'$users'}}},
      {$lookup:{from:'users',localField:'users',foreignField:'_id',as:'infouser'}},
      {$project:{users:0}}
    ];
    const Data=await Coll.aggregate(pipline).toArray();
    
    return Data;
  }
  catch(e){return e}
  finally{await Client.close()}
} 


module.exports={getChats,getChat}
 
