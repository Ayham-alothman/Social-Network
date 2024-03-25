const {savePost,deletePost,getOwnPosts}=require('../model/post.model');

function savePostControllar(req,res){
    if(req.body.own){
        savePost(req.body)
        .then(()=>{res.status(200).end()})
        .catch((e)=>{res.status(403).json({erorr:e})})
    }
    else if(!req.body.own){res.status(400).json({erorr:'miss data'})}
    
}
    
function deletePostControllar(req,res){
    if(req.body.idpost&&req.user.id){
        deletePost(req.body.idpost,req.user.id)
        .then(()=>{res.status(200).end()})
        .catch((e)=>{res.status(403).json({erorr:e})})
    }
    else if(!req.body.idpost||!req.user.id){
        res.status(400).json({erorr:'miss data'})
    }
}

function getOwnPostsControllar(req,res){
    if(req.user.id){
        getOwnPosts(req.user.id)
        .then((d)=>{res.status(200).json({posts:d})})
        .catch((e)=>{console.log(e);res.status(403).json({erorr:e})})
    }
}

module.exports={savePostControllar,deletePostControllar,getOwnPostsControllar}