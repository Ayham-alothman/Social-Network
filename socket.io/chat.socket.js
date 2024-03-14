const {saveMessages}=require('../model/message.model')
module.exports=(io)=>{
io.on('connection',socket=>{

  
socket.on('init',chatId=>{socket.join(chatId);});


socket.on('sendmessage',datamsg=>{
     saveMessages(datamsg)
     .then(()=>{
        socket.broadcast.to(datamsg.chatid).emit('receivemessage',datamsg);  
     })
     .catch((e)=>{console.log(e)})
    
   // socket.broadcast.to(datamsg.chatid).emit('newmsg',datamsg.value);




    
    })


})//end  connecation

}//end funcation