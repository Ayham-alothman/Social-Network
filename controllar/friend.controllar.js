const {Add,cnacelRequest,acceprRequest,rejectRequest,deleteFriend}=require('../model/friend.model');




addfriend=(req,res)=>{


Add(req.user.id,req.body.id)
.then((d)=>{
    if(d==200){res.status(200).end()}
    else if(d==403){res.status(403).json(`there problem in request`)}
})
.catch((e)=>{res.status(403).json(e)})



}//end function


cancelRequestContollar=(req,res)=>{

    if(req.user.id&&req.body.id){
        cnacelRequest(req.user.id,req.body.id)
        .then((d)=>{console.log(d)
            if(d==200){console.log('set200');res.status(200).end();}
            else if(d!=200){res.status(403).end();}
        })
        .catch((e)=>{res.status(403).json(e)})
    }
    else if(!req.user.id||!req.body.id){
        res.status(400).json(`there miss data`)
    }

    
}


acceptrequest=(req,res)=>{
    if(req.user.id&&req.body.id){
        acceprRequest(req.user.id,req.body.id)
        .then((d)=>{
            if(d==200){res.status(200).end()}
            else if(d!=200){res.status(403).json(`there miss data`)}
        })
        .catch((e)=>{res.status(403).json(e)})
    }
    else if(!req.user.id||!req.body.id){res.status(400).json(`there miss data`)}


}//end fun


cancelsubmite=(req,res)=>{
    if(req.user.id&&req.body.id){
        rejectRequest(req.user.id,req.body.id)
        .then((d)=>{d==200? res.status(200).end()  :res.status(403).json(`there miss data`)})
        .catch((e)=>{res.status(403).json(e)})
    }
    else if(!req.user.id||req.body.id){
        res.status(403).json(`there miss data`)
    }

    

}

deletefriend=(req,res)=>{
 if(req.user.id&&req.body.id){
    deleteFriend(req.user.id,req.body.id)
    .then((d)=>{
        d==200? res.status(200).end():res.status(403).end();
    })
    .catch((e)=>{res.status(403).json(e)})
 }
 else if(!req.user.id||!req.body.id) {
    res.status(400).json(`there data missed`)
 }



}//end fun

module.exports={addfriend,acceptrequest,cancelsubmite,deletefriend,cancelRequestContollar}