const mongo=require('mongodb').MongoClient;
const bcrypt= require('bcrypt')



insertdatatousers=(indata)=>{console.log(indata)
return new Promise((resolve,reject)=>{

    mongo.connect('mongodb://127.0.0.1:27017',(err,client)=>{
      
          
        const db=client.db('chatapp')
        db.collection('users').findOne({email:indata.email}).then((data)=>{
         if(data){reject(`the email is exsist`)}
         else{
          

          if(indata.password&&indata.password){
            db.collection('users').insertOne({name:indata.name,
              password:bcrypt.hashSync(indata.password,10),email:indata.email,friends:[]
              ,sendrequest:[],receivererequest:[] }).then((data)=>{
               resolve(`done register account have number ${data.insertedId}`)
                 console.log('done')
              
              }).catch((err)=>{  console.log(Error(err))   })
          }
          else if(!indata.password||!indata.password){reject(`do't habe  any password or name `)}
          

         }

        }).catch((err)=>{console.log(Error(err))})
        


        
        })//end end  fnction mongo

}) //end promise

}//end function


module.exports={insertdatatousers}