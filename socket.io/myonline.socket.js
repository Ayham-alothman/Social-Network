
    const getallfriend=require('../model/friend.model').getfriend
module.exports= io=>{    
    io.on('connection', socket=>{


        socket.on('getallonline',(id)=>{
            //console.log(`the request getallonline`)
            //console.log(io.allonline)
              
            getallfriend(id).then((data)=>{
     

                let online=data.filter((ele)=>{
                    if(io.allonline[ele.id]==true){
                        
                    return ele
                    
                    }
                    
                    })//end fulter
                   //console.log(`online now `);
                   //console.log(online);
                   socket.emit("friendonline",online)
    

            })//end function getallfriend653

         
          })//end getallonline

    
    })// end function on 

    }//end functions