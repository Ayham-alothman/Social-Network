const model=require('../model/friend.model')



addfriend=(req,res)=>{

console.log('this funcion do not work  @@@@@@ rembar')

model.addfriend(req.body.id,ob).then(()=>{
//res.redirect('/profail/:id')

})

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