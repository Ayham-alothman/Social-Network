const model=require('../model/friend.model');
const {Add}=require('../model/friend.model');




addfriend=(req,res)=>{
//console.log(req.body.id);
//console.log(req.user.id)

Add(req.user.id,req.body.id)
.then((d)=>{
    if(d==200){res.status(200).end()}
    else if(d==403){res.status(403).json(`there problem in request`)}
})
.catch((e)=>{res.status(403).json(e)})



}//end function


acceptrequest=(req,res)=>{
//    req.body.friends.split(',')
//    let ob={
//id:req.user.id,
//name:req.user.name,
//email:req.user.email,
//friends:req.user.friends,   
//    }
//
// console.log(req.body) 


model.acceptrequest(req.body.id,req.user).then(()=>{

    res.redirect(`/profail/${req.body.id}`)
})

}

cancelrequest=(req,res)=>{



    model.cancelrequest(req.body.id,req.user).then(()=>{
        res.redirect(`/profail/${req.body.id}`)

    })


}

cancelsubmite=(req,res)=>{

    model.cancelsubmite(req.body.id,req.user).then(()=>{
        res.redirect(`/profail/${req.body.id}`)

    })


}

deletefriend=(req,res)=>{
 
model.deletefriend(req.body.id,req.user).then(()=>{

    res.redirect(`/profail/${req.body.id}`)
})


}

module.exports={addfriend,acceptrequest,cancelrequest,cancelsubmite,deletefriend}