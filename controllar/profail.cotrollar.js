const model=require('../model/profail.model')


getdata=(req,res)=>{

model.getdataid(req.params.id,req.user).then((d)=>{

let data={
    id:d._id,
    name:d.name,
    email:d.email,
    friends:d.friends,
    state:d.state
};


let mydata={
    id:req.user.id,
    name:req.user.name,
    email:req.user.email,
    friends:req.user.friends,
}

res.render('profail',{data:data,mydata:mydata})
}).catch((err)=>{console.log(err)})

}


module.exports={getdata}
//