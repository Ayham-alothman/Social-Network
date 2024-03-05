const {getFriends}=require('../model/friend.model')
   
module.exports= io=>{    
    io.on('connection',socket=>{    
        socket.on('onlineFriends',(id)=>{
            if(id&&id.length>10){
                getFriends(id)
                .then((d)=>{
                    d=d.filter((e)=>{
                        if(io.allonline[e._id]==true){return e;}
                    });
                    socket.emit(`friendsOnline`,d);
                })
                .catch((e)=>{console.log(e)})

            }
        })
    })// end function on 

}//end functions