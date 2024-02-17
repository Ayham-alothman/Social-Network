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

        if(req.cookies.token){
        
            let token=req.cookies.token;

            //console.log(`*******************
            //${token}
            //***********************`)
           
          //console.log(token);
        
            let infouser=jwt.verify(token,process.env.keyjwt);
            req.user=infouser;
            

            
            next()
        
        }
        else{
            res.redirect('/login')
        }
        }
        


    module.exports={isUser,isnotUser,isAdmin,isnotAdmin,istoken}