const { MongoClient } = require("mongodb");

const { promise } = require('bcrypt/promises');
const { ObjectId } = require('mongodb');
const url= 'mongodb://127.0.0.1:27017';

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

async function cnacelRequest(myid,id){
    const Client= await MongoClient.connect(process.env.Url);
    try{
        const Db= Client.db(`chatapp`);
        const Coll=await Db.collection(`users`);
        

    }
    catch(e){return e}
    finally{await Client.close()}
}//end cnacelRequest


addfriend=(id,myid)=>{
    //id=>ob{id,name,email,friends   } datafriend
    //myid=>ob{id,name,email,friends   }mydata


    return new Promise((resolve,reject)=>{
        resolve()
    mongo.connect(url,(err,client)=>{
    if(err) throw err;
    
    const db=client.db('chatapp');
   
    db.collection('users').updateMany({_id:ObjectId(id.id)},
    {$push:{receivererequest:myid}}).then(()=>{

        db.collection('users').updateMany({_id:ObjectId(myid.id)},
        {$push:{sendrequest:id}}).then((data)=>{resolve(data)}).catch((err)=>{reject(err)})

    }).catch((err)=>{reject(err)})   
 
}) //end connected   
     })//end promise
    }//end function

acceptrequest=(id,myid)=>{



    return new Promise((resolve,reject)=>{
        resolve()
        mongo.connect(url,(err,client)=>{
        if(err) throw err;
        
        const db=client.db('chatapp');

        db.collection('chat').insertOne({ users:[ObjectId(id),ObjectId(myid.id)]       })
        .then((dd)=>{
            console.log(dd)

            db.collection('users').findOne({_id:ObjectId(id)}).then((d)=>{
                console.log(dd)
                let datafriend={
              id:ObjectId(d._id).toString(),   
              name:d.name,
              email:d.email,
              friends:d.friends,
                  chatid:dd.insertedId,
               }
               let mydata={
                id:myid.id,
                name:myid.name,
                email:myid.email,
                friends:myid.friends,
                chatid:dd.insertedId,
          
                 }
               //##########################
        
               db.collection('users').updateMany({_id:ObjectId(myid.id)},
               {$pull:{receivererequest:{id:id}}}).then(()=>{
                   db.collection('users').updateMany({_id:ObjectId(myid.id)},
               {$push:{friends:datafriend}}).then(()=>{
                   db.collection('users').updateMany({_id:ObjectId(id)},
                   {$pull:{sendrequest:{id:myid.id}}}).then(()=>{
                       db.collection('users').updateMany({_id:ObjectId(id)},
                       {$push:{friends:mydata}})
        
        
                   })
        
               })
        
        
               }).catch((err)=>{console.log(err)})
        
               //##########################
        
              })
        





        })//end then insertone chat11



      

    }) //end connected   
})//end promise
}//end function accept

cancelrequest=(id,myid)=>{
    // id:1111221414241
    //myid of object

    mongo.connect(url,(err,client)=>{
const db=client.db('chatapp');

db.collection('users').updateOne({_id:ObjectId(myid.id)},{$pull:{sendrequest:{id:id}}}).then(()=>{

db.collection('users').updateOne({_id:ObjectId(id)},{$pull:{receivererequest:{id:myid.id}}}).
catch((err)=>{console.log(Error(err))})


}).catch((err)=>{console.log(Error(err))})



    })//end mongo


}//endfunction



cancelsubmite=(id,myid)=>{

    return new Promise((res,rej)=>{
        res()
        mongo.connect(url,(err,client)=>{
            const db=client.db('chatapp');
            
            db.collection('users').updateOne({_id:ObjectId(id)},{$pull:{sendrequest:{id:myid.id}}}).then(()=>{
            
            db.collection('users').updateOne({_id:ObjectId(myid.id)},{$pull:{receivererequest:{id:id}}}).
            catch((err)=>{console.log(Error(err))})
            
            
            }).catch((err)=>{console.log(Error(err))})
            
            
            
                })//end mongo





    })//end promise



}//endfunction

cancelrequest=(id,myid)=>{
return new Promise((res,rej)=>{
//console.log('#########')
//console.log(id)
//console.log(myid)
//console.log('#########')
res()


    mongo.connect(url,(err,client)=>{
        const db=client.db('chatapp');
        
        db.collection('users').updateOne({_id:ObjectId(myid.id)},{$pull:{sendrequest:{id:id}}}).then(()=>{
        
        db.collection('users').updateOne({_id:ObjectId(id)},{$pull:{receivererequest:{id:myid.id}}}).
        
        catch((err)=>{console.log(Error(err))})
        
        
        }).catch((err)=>{console.log(Error(err))})
        
        
        
            })//end mongo
        








})

}//endfunction

//##########

deletefriend=(id,myid)=>{
    

   return new Promise((res,rej)=>{

res()

        mongo.connect(url,(err,client)=>{
            const db=client.db('chatapp');
            
            db.collection('users').updateOne({_id:ObjectId(myid.id)},{$pull:{friends:{id:id}}}).then(()=>{
            
            db.collection('users').updateOne({_id:ObjectId(id)},{$pull:{friends:{id:myid.id}}}).
            catch((err)=>{console.log(Error(err))})
            
            
            }).catch((err)=>{console.log(Error(err))})
            
            
            
                })//end mongo





    })
    
    
    }//endfunction





//###########

getfriend=(myid)=>{
    return new Promise((res,rej)=>{

        mongo.connect(url,(err,client)=>{
            const db=client.db('chatapp');
            
               db.collection('users').findOne({_id:ObjectId(myid)}).then((data)=>{
                  
                res(data.friends)
               })
            
            
                })//end mongo



    })


}//end functions



    module.exports={Add,addfriend,acceptrequest,cancelrequest,cancelsubmite,getfriend,deletefriend}