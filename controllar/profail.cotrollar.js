const model=require('../model/profail.model');
const {getRelation}=require('../model/profail.model')


getdata=(req,res)=>{console.log(req.user.id,req.params.id)
    if(req.user.id&&req.params.id){
        getRelation(req.user.id,req.params.id)
        .then((d)=>{console.log(d)
            d? res.status(200).json(d):res.status(403).json(`there missed some data `)
        })
        .catch((e)=>{res.status(403).json(e)})
    }
    else if(!req.user.id||!req.params.id){res.status(400).json(`there miss data `)}
  
}


module.exports={getdata}
