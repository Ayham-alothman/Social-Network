const model=require('../model/requests.model');

    sendrequest=(req,res)=>{
    model.getallrequest(req.user.id).then((data)=>{
      

        res.render('home',{
        data:data,
        id:req.user.id,
        name:req.user.name,
        

        })
    }) 

   
 

} //end function


module.exports={sendrequest}