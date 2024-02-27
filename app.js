

const express = require('express');

const app = express();
const cors=require('cors');

const jwt=require('jsonwebtoken')

const cookies=require('cookie-parser');

app.use(express.json())

app.use(cookies())

//console.log(cookies.parse())





app.set('view engine','ejs')
app.set('views','view')

let dotenv=require('dotenv').config();

    const body=require('body-parser');
    
    //app.use(body.json());

    app.use(body.urlencoded({extended:true}));

app.use(cors({origin:'*'}))

const session=require('express-session');
app.use(session({
    secret: "my secret",
    saveUninitialized:false,
    resave:false
}))

 const server= require('http').createServer(app)
const socket=require('socket.io');

const io=socket(server);
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
const chat=require('./router/chat.router')
//e require module

//s excute module
app.use('/',home)
app.use('/signup',signup)
app.use('/login',login)
app.use('/profail',profail)
app.use('/friend',friend)
app.use('/request',requests)
app.use('/chat',chat)     
app.use('/try',(req,res)=>{
    console.log('try');
    
    res.end();
    
})  
//e excute module



const port= 4000;

server.listen(port,(err)=>{
if(err){console.log(Error(err))}

console.log(`the port acive on port number ${port}`)

})
