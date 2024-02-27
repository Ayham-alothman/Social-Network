const mongo =require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');


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

module.exports={getdataid}