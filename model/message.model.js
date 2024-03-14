const {MongoClient}=require('mongodb');

async function getMessages(chatid){
    const Client=new MongoClient(process.env.Url);
    try{
        const Db=Client.db('chatapp');
        const Coll=await Db.collection('messages');
        const data=await Coll.find({chatid:chatid}).toArray();
        if(data){return data}
    }
    catch(e){return e}
    finally{await Client.close()}
}

async function saveMessages(content){
 const Client=new MongoClient(process.env.Url);
 try{
    const Db=Client.db('chatapp');
    const Coll=await Db.collection('messages');
    const Data=await Coll.insertOne(content);
    if(Data.acknowledged){return}
 }
 catch(e){return e}
 finally{await Client.close()}
}

module.exports={getMessages,saveMessages}