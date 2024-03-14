const {getChat,getChats}=require('../model/chat.model')
function getallmessages(req,res){

 getChat(req.user.id,req.params.id)
 .then((d)=>{res.status(200).json({idchat:d})})
 .catch((e)=>{res.status(403).json(e)})
   


}//end funcion

function getChatsControllar(req,res){
 if(req.user.id){
    getChats(req.user.id)
    .then((d)=>{
      const infoChats=[]
      for(let i=0;i<d.length;i++){
          infoChats.push({
            chatid:d[i]._id,
            name:d[i].infouser[0].name,
            userid:d[i].infouser[0]._id,
          });
      };
      res.status(200).json(infoChats)})
    .catch((e)=>{res.status(403).json({erorr:e})})
 }
}

module.exports={getChatsControllar,getallmessages}