
const jwt=require('jsonwebtoken');


 jwtt=()=>{
  

  return(req,res,next)=>{

    if(req.body.token){

    let infouser=jwt.verify(req.body.token,process.env.keyjwt);
    req.user=infouser;
    next();
    }//end if
    
    else{
        console.log(Error('the token worng'))
    }//end else

}//end retuurn

 }//end function
 
module.exports={jwtt}