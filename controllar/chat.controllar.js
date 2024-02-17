const alldatamessage=require('../model/chat.model').getallmessagesmodel

getallmessages=(req,res)=>{


   let idchat=req.params.chatid;

   alldatamessage(idchat).then((messages)=>{
       let mymessage=[];
       let messagesfriend=[];

    for(let mes of messages){
   if(mes.sender==req.user.id){
    mymessage.push(mes);
   }
   else{
    messagesfriend.push(mes);

   }


    }
    console.log(`###############`)
console.log(mymessage)
console.log(`###############`)
console.log(messagesfriend)
console.log(`###############`)     
      
      
         //res.render('chat',{
         //chatid:idchat,
         //mesages:false,
         //id:req.user.id,
         //   })

      
   })

   
   
   
   // module.getallmessagesmodel(idchat)


}//end funcion

module.exports={
    getallmessages,
}