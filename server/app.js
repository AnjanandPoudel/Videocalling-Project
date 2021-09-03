const express=require('express');
const app =require("express")();
/* const server=require("http").createServer(app); */
const cors=require("cors");
const path=require('path');
const passport=require('passport')
const fs = require('fs');
require('dotenv').config({path: path.resolve(__dirname+'/.env')});
let mongoose=require('mongoose')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


let mongodburl=require('./config/keys').mongodb;


mongoose.connect(mongodburl,{ useNewUrlParser: true ,useUnifiedTopology: true ,useFindAndModify:false}).then(()=>{
  console.log('Connected to database')
})
.catch((err)=>console.log(err))
mongoose.set('useCreateIndex', true);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));


app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);





/* 
   app.all('*',(req,res,next)=>{
     if (req.secure){
       next()
     }
     else{
      res.redirect(307, 'https://' + req.hostname + ':' + secport + req.url);
     }
   }) */
   const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
  };
  
  let secport=process.env.PORT || 3443;
  let securl=process.env.HOST || '192.168.1.110';
  
   const https = require('https');
   const secureServer= https.createServer(options,app).listen(secport, '192.168.1.110' , ()=>{
     console.log('Listening secure port in port no:',secport)
   })



const io=require ("socket.io")(secureServer,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
});

app.use(cors());

const nodeenv="production"
__dirname=path.resolve();

console.log(__dirname)

if (process.env.NODE_ENV ==="production"){
   app.use(express.static(path.join(__dirname, 'client/build'))); //  "public" off of current is root
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"client","build","index.html"));

  })
}
else{
  app.get ("/", (req,res)=>{
    res.statuscode=200;
    res.setHeader('Content-Type','application/json');
    res.send('it is running');
});
}



io.on('connection', (socket)=>
{
  console.log('heyyyyyy')
    socket.emit('me',socket.id);
  
    socket.on('disconnect',()=>{
      socket.broadcast.emit('callended');
    })
  
    socket.on('calluser',({userToCall,signalData,from,name})=>{
      console.log('calling the user in backend ')
      io.to(userToCall).emit('calluser',{signal:signalData,from,name})
    })
  
    socket.on("answercall",data=>{
      io.to(data.to).emit('callaccepted',data.signal)
    })
  
  
  })
  


 
   
  
/* server.listen(PORT,()=>console.log(`Server listening in port ${PORT}`))
 */



