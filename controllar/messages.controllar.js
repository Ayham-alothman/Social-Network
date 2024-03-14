const {getMessages}=require('../model/message.model');

function getMessagesControllar(req,res){
 if(req.params.chatid){
    getMessages(req.params.chatid)
    .then((d)=>{res.status(200).json({messagess:d})})
    .catch((e)=>{res.status(403).json({erorr:e})});
 }
 else if(!req.params.chatid){
    res.status(400).json({"erorr":"there data mising may chatid"})
 }
}

module.exports={getMessagesControllar}