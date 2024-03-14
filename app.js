const express = require('express');
const app = express();
app.use(express.json());

const cors=require('cors')


app.set('view engine','ejs')
app.set('views','view')

const dotenv=require('dotenv').config();
    
const body=require('body-parser');
   
    //app.use(body.json());

app.use(body.urlencoded({extended:true}));

app.use(cors({origin:'*'}))



const server= require('http').createServer(app)
const socket=require('socket.io');

const io=socket(server,{
    cors:{origin:'*'},
});

io.allonline={}

require('./socket.io/chat.socket')(io)
require('./socket.io/init.socket')(io)
require('./socket.io/isonline.socket')(io)
require('./socket.io/myonline.socket')(io)



 

//s require modulea
const signup=require('./router/signup.router')
const login=require('./router/login.router')
const profail=require('./router/profail')
const home=require('./router/home.router')
const friend=require('./router/friend.router');
const requests=require('./router/requests.router')
const chat=require('./router/chat.router');
const Messagees=require('./router/messages.router')
//e require module

//s excute module
app.use('/',home)
app.use('/signup',signup)
app.use('/login',login)
app.use('/profail',profail)
app.use('/friend',friend)
app.use('/request',requests)
app.use('/chat',chat)
app.use('/messages',Messagees);
app.use((req,res)=>{
    res.status(403).json({erorr:`do't found`})
})     

// ayham 65df1a0f8f90bca8fa45a446
// baraa 65df1a1d8f90bca8fa45a447
// bahaa 65e5b6d79167bd914b657493

const port= 4000;

server.listen(port,(err)=>{
if(err){console.log(Error(err))}

console.log(`the port acive on port number ${port}`)

})
