const { TokenExpiredError } = require('jsonwebtoken');
const jwt=require('jsonwebtoken');
isUser=(req,res,next)=>{

if(req.session.myid){

   // let token=req.header('auth');
   
  //console.log(token);

    //let infouser=jwt.verify(token,process.env.keyjwt);
    //req.user=infouser;

    next()

}
else{
    res.redirect('/login')
}
}

isnotUser=(req,res,next)=>{session.myid
    if(!req.session.myid){
        next()
        
        }


}

isAdmin=(req,res,next)=>{
if(req.session.admin){

    next()
}


}
isnotAdmin=(req,res,next)=>{
    if(!req.session.admin){
    
        next()
    }
    
    
    }

    //##############


    istoken=(req,res,next)=>{
         if(req.header('authorization')){
            let infouser=jwt.verify(req.header('authorization'),process.env.SecrtKey);
            req.user=infouser;
            next()

         }
        else if(req.cookies.token){
            console.log((req));
        
            let token=req.cookies.token;

            
        
            let infouser=jwt.verify(token,process.env.keyjwt);
            req.user=infouser;
            

            
            next()
        
        }
        else{
            res.status(403).json(`do't found token`)
        }
        }
        


    module.exports={isUser,isnotUser,isAdmin,isnotAdmin,istoken}