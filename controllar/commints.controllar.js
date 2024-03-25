const {saveCommintModel}=require('../model/commint.model');

function saveCommintControllar(req,res){console.log(req.body)
    if(req.user.id,req.body.postid,req.body.text){
        saveCommintModel(req.user.id,req.body.postid,req.body.text)
        .then(()=>{res.status(200).end();})
        .catch((e)=>{console.log(e);res.status(403).json({erorr:e})})
    }
    else{res.status(400).json({erorr:'there miss data'})}
}

module.exports={saveCommintControllar}