

const mongo =require('mongodb').MongoClient;

const obid =require('mongodb').ObjectId;



// id => idchat
//collaction message {
// _id,
//  chat:{id=>  [iduser1=>{},iduser2=>{}]              }
//   content,
//     data
//
//
//     }
 
//message
const url= 'mongodb://127.0.0.1:27017';

getallmessagesmodel=(idchat)=>{

return new Promise((res,rej)=>{


  mongo.connect(url,(err,client)=>{
    if(err) throw err
      const db= client.db('chatapp');
      
    db.collection('messages').aggregate([{$lookup:{from:'chat',localField:'chatid',
    foreignField:'_id',as:'datachatid'}},
    {$lookup:{from:'users',localField:'datachatid.users',
    foreignField:'_id',as:'infouser'}}
  ]).toArray().then((d)=>{
    let  newarr =[];

    for(let ele of d){
     if(ele.chatid==idchat){
       newarr.push(ele)
     }   
     
    }
      res(newarr)
    })

     
      })//end mongo




}) //end return promise
       


}//end function


module.exports={getallmessagesmodel}
 
