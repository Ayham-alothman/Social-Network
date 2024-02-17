module.exports= io=>{

  io.on('connection',socket=>{
    
//#################
    socket.on('notfiction',data=>{
      
    socket.join(data)


    })//end notfictions
//#################
   socket.on('addfriend',(data)=>{
     console.log('!!!!!!!!!!!!!!!!!')
      const addfriend= require('../model/friend.model').addfriend;
      //1p datafriend 2p mydata
      
      addfriend(data.datafriend,data.mydata).then(()=>{
     
          
        socket.broadcast.to(data.datafriend.id).emit('not',data.mydata)
           

        socket.emit('reload');
       })
  
  })//socket on




  })//end functions io  on  

}//end functions