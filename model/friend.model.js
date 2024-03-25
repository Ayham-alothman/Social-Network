const { MongoClient,ObjectId } = require("mongodb");


async function Add(myid,id){
    const Client = new MongoClient(process.env.Url);
   try{
    const Db= Client.db('chatapp');
    const Coll=  Db.collection('users');
    const query={_id:ObjectId(id)};
    const Result=await Coll.findOne(query);
    if(Result){
       
        if(Result.friends.includes(myid)||Result.sendrequest.includes(myid)||Result.receivererequest.includes(myid)){
            
            return 403;
        }          
        await Coll.updateOne({_id:ObjectId(id)},{$push:{receivererequest:myid}});
        await Coll.updateOne({_id:ObjectId(myid)},{$push:{sendrequest:id}});
        
        return 200;
        
    }
    
   }
   catch(e){return e}
   finally{ await Client.close()}

    
}//end Add

async function cnacelRequest(myid,id){console.log(process.env.Url)
    const Client=  new MongoClient(process.env.Url);
    
    try{
        const Db= Client.db('chatapp');
        const Coll=  Db.collection('users');
        const queryMyid={_id:ObjectId(myid)};
        const queryid={_id:ObjectId(id)};
        const dataMyid=await Coll.findOne(queryMyid);
        const dataid=await Coll.findOne(queryid);
        if(dataMyid&&dataid&&dataMyid.sendrequest.includes(id)&&dataid.receivererequest.includes(myid)){
            await Coll.updateOne({_id:ObjectId(myid)},{$pull:{sendrequest:id}});
            await Coll.updateOne({_id:ObjectId(id)},{$pull:{receivererequest:myid}});
            return 200
        }
        return 403
        

    }
    catch(e){return e}
    finally{await Client.close()}
}//end cnacelRequest


async function acceprRequest(myid,id){
    const Client=new MongoClient(process.env.Url);
    
    try{
        const Db=Client.db(`chatapp`);
        const Coll=Db.collection(`users`);
        const queryMyid={_id:ObjectId(myid)};
        const queryId={_id:ObjectId(id)};
        const dataMyid=await Coll.findOne(queryMyid);
        const dataId=await Coll.findOne(queryId);
        if(dataMyid&&dataId&&(dataMyid.receivererequest.includes(id)&&!dataMyid.friends.includes(id))&&(dataId.sendrequest.includes(myid)&&!dataId.friends.includes(myid))){
            await Coll.updateOne(queryMyid,{$pull:{receivererequest:id}});
            await Coll.updateOne(queryId,{$pull:{sendrequest:myid}});
            await Coll.updateOne(queryMyid,{$push:{friends:id}});
            await Coll.updateOne(queryId,{$push:{friends:myid}});
            return 200;  

        }
        return 403
    }
    catch(e){return e;}
    finally{await Client.close()}
}

async function rejectRequest(myid,id){
    const Client=new MongoClient(process.env.Url);
    try{
        const Db=Client.db(`chatapp`);
        const Coll=Db.collection(`users`);
        const queryMyid={_id:ObjectId(myid)};
        const queryId={_id:ObjectId(id)};
        const dataMyid= await Coll.findOne(queryMyid);
        const dataId= await Coll.findOne(queryId);
        if(dataMyid&&dataId&&dataMyid.receivererequest.includes(id)&&dataId.sendrequest.includes(myid)){
            await Coll.updateOne(queryMyid,{$pull:{receivererequest:id}});
            await Coll.updateOne(queryId,{$pull:{sendrequest:myid}});
            return 200;
        }
        return 403;

    }
    catch(e){return e;}
    finally{await Client.close(); }
}//end reject fun

async function deleteFriend(myid,id){
    const Client=new MongoClient(process.env.Url);
    try{
        const Db=Client.db(`chatapp`);
        const Coll= await Db.collection(`users`);
        const queryMyid={_id:ObjectId(myid)};
        const queryId={_id:ObjectId(id)};
        const dataMyid=await Coll.findOne(queryMyid);
        const dataId=await Coll.findOne(queryId);
        if(dataId&&dataMyid&&dataId.friends.includes(myid)&&dataMyid.friends.includes(id)){
            await Coll.updateOne(queryMyid,{$pull:{friends:id}});
            await Coll.updateOne(queryId,{$pull:{friends:myid}});
            return 200;
        }
        return 403;
    }
    catch(e){return e}
    finally{await Client.close()}
}//end fun

async function getFriends(id){
    const Client=new MongoClient(`mongodb://127.0.0.1:27017`);
    try{
        const Db=await Client.db(`chatapp`);
        const Coll=await Db.collection(`users`);
        const pipLine=[
             {$match:{_id:ObjectId(id)}}
            ,{$unwind:'$friends'}
            ,{$project:{friends:{$toObjectId:"$friends"},_id:0}}
            ,{$lookup:{from:'users',localField:'friends',foreignField:'_id',as:'dataFriend'}}
            ,{$project:{friends:0}}];

        const Data= await Coll.aggregate(pipLine).toArray();
        const dataFriends=[];
        for(let i=0;i<Data.length;i++){
            delete Data[i].dataFriend[0].password;
            delete Data[i].dataFriend[0].friends;
            delete Data[i].dataFriend[0].sendrequest;
            delete Data[i].dataFriend[0].receivererequest;
            Data[i].dataFriend[0]._id=Data[i].dataFriend[0]._id.toString();
            
            dataFriends.push(Data[i].dataFriend[0])

        }
        return dataFriends

    }
    catch(e){ throw e}
    finally{await Client.close();}
}//end fun





    module.exports={Add,cnacelRequest,acceprRequest,rejectRequest,deleteFriend,getFriends}