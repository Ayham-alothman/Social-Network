  module.exports=   io=>{
   

    io.on('connection', socket=>{
      
        
           socket.on('isonline',(id)=>{
          
        io.allonline[id]=true;
        
        io.emit('add')
        
          socket.on('disconnect',()=>{
            io.allonline[id]=false;
            io.emit('dis')
      
          })//end disconnected
      
      
      })//end online
      
                  
   })//end functions on
}//end function