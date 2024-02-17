
handelhome=(req,res)=>{



//console.log(req.headers)d



res.render('home',{
    id:req.user.id,
    name:req.user.name,
    data:false
})

//res.send(req.user)
//res.render('home')
}

module.exports={handelhome} 