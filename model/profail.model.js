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



getdataid=(id,myid)=>{
        
return new Promise((resolve,reject)=>{
mongo.connect(process.env.Url,(err,client)=>{
if(err) throw err;
if(id.length!=24){reject(`id user do't found`);return 0;}

const db=client.db('chatapp');

db.collection('users').findOne({_id:ObjectId(id)})
.then((data)=>{
    let objectData={name:data.name}
if(id===myid.id){resolve( {state:1,data:objectData} );}
else if(data.friends.find(ele=>{ if(ele.id==myid.id){return true} })){resolve({state:2,data:objectData})}

else if(data.receivererequest.find(ele=>{if(ele.id==myid.id){return true}})){resolve({state:3,data:objectData})}

else if(data.sendrequest.find(ele=>{ if(ele.id==myid.id){return true}})){resolve({state:4,data:objectData})}

else{ resolve({state:5,data:objectData}) }

})
.catch((err)=>{reject(`id user do't found`)})


})
})
}

module.exports={getdataid,getRelation}