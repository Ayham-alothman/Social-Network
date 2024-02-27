const model=require('../model/profail.model')


getdata=(req,res)=>{console.log(req.params.id);
    console.log(req.user);

model.getdataid(req.params.id,req.user)
.then((d)=>{console.log(d.status)

res.status(200).json(d);


})
.catch((err)=>{res.status(403).json(err);})

}


module.exports={getdata}
