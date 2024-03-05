  module.exports=   io=>{
   

    io.on('connection', socket=>{
      
        
           socket.on('isonline',(id)=>{ 
          
           io.allonline[id]=true;
           console.log(io.allonline);
           io.emit(`newuser`);
           
           
        
           socket.on('disconnect',()=>{console.log(`out`)
           console.log(io.allonline);
            delete io.allonline[id];
            console.log(io.allonline);
            io.emit('dis')
      
          })//end disconnected
      
      
      })//end online
      
                  
   })//end functions on
}//end function

