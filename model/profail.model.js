const { ObjectId,MongoClient } = require('mongodb');



async function getRelation(myid,id){
    const Client=new MongoClient(process.env.Url);
    try{
        const Db=Client.db(`chatapp`);
        const Coll=Db.collection(`users`);
        const Query={_id:ObjectId(id)};
        const Dataid= await Coll.findOne(Query,{name:1,email:1});
        if(Dataid){
            if(Dataid._id==myid){return{state:1,name:Dataid.name}}
            else if(Dataid.friends.includes(myid)){return{state:2,name:Dataid.name}}
            else if(Dataid.receivererequest.includes(myid)){return{state:3,name:Dataid.name}}
            else if(Dataid.sendrequest.includes(myid)){return{state:4,name:Dataid.name}}
            else {return{state:5,name:Dataid.name}}

        }
        return null
    }
    catch(e){return e}
    finally{await Client.close();}


}//end 



module.exports={getRelation}