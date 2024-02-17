const ID=require('mongodb').ObjectId


const savemassage= require('../model/savemessages.model').savemesages


module.exports=(io)=>{
io.on('connection',socket=>{

 //#############   
socket.on('init',data=>{
socket.join(data)

})
//#############
socket.on('msg',datamsg=>{
        
    socket.broadcast.to(datamsg.chatid).emit('newmsg',datamsg.value);

let msg={
chatid:datamsg.chatid,
content:datamsg.value,
sender:ID(datamsg.id),
date:new Date(new Date().getTime()),

}
savemassage(msg);

    
    })


})//end  connecation

}//end funcation