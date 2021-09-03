var express = require('express');
var router = express.Router();

let Users=require('../models/usermodel');
let passport =require('passport');
let authenticate=require('../authenticate');
const  cors  = require('./cors');
const { facebook } = require('../config/keys');


/* GET users listing. */
router.get('/',cors.corsWithOptions,authenticate.verifyUser, function(req, res, next) {
  if(authenticate.verifyAdminBoolean){
    Users.find({})
    .then(user=>{
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json(user)
    })
  }
  else{
    let err=new Error('I guess u are not authorized enough to pull out this request. Only Admins can do this. '+'(username: '+req.user.username+')'+req.user)
    err.status=403;
    return next(err)
  }
 
})

router.delete('/',cors.corsWithOptions,authenticate.verifyUser, function(req, res, next) {
  if(authenticate.verifyAdminBoolean){
    Users.deleteMany({})
    .then(user=>{
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json(user)
    })
  }
  else{
    let err=new Error('I guess u are not authorized enough to pull out this request. Only Admins can do this. '+'(username: '+req.user.username+')'+req.user)
    err.status=403;
    return next(err)
  }
})

router.route('/')
.all(cors.corsWithOptions,(req,res,next)=>{
  res.statusCode=403;
  res.setHeader('Content-Type','application/json');
  res.json({err:"Not available mate"})
})



router.post('/signup',cors.corsWithOptions,(req,res,next)=>{
  //take username and password as para and register a new user then return the user 
  //(password hashing , username unique all conditions are checked automatically)
  Users.register(new Users({username:req.body.username}),req.body.password,(err,user)=>{
    if(err){
      res.statusCode=500;
      res.setHeader('Content-Type','application/json');
      res.json({err:err})
    }
    else{
      if(req.body.firstName){
        user.firstName=req.body.firstName
      }
      if(req.body.lastName){
        user.lastName=req.body.lastName
      }
      user.save((err,user)=>{
        if(err){
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return ;
        }
          passport.authenticate('local')(req,res,()=>{
          res.statusCode=200;
          res.setHeader('Content-Type','application/json');
          res.json({status:'Registration successful ',success:true,user:user})
        })
      })
     
    }
  })
})
router.route('/signup')
.all(cors.corsWithOptions,(req,res,next)=>{
  res.statusCode=403;
  res.setHeader('Content-Type','application/json');
  res.json({err:"Not available mate"})
})


router.get('/facebook/token',cors.corsWithOptions,passport.authenticate('facebook-token'),(req,res,next)=>{
  if(req.user){
    let token=authenticate.getToken({_id:req.user._id});
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json({success:true,token:token,status:"You are logged in",user:req.user})
  }
  else{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json({success:false,status:"You are not logged in",user:req.body})
  }
})
router.route('/facebook/token').all(cors.corsWithOptions,(req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json("error says backend 87 users")
})

/* 

router.get('/facebook',cors.corsWithOptions,passport.authenticate('facebook'),(req,res,next)=>{
  if(req.user){
    let token=authenticate.getToken({_id:req.user._id});
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json({success:true,token:token,status:"You are logged in"})
  }
  else{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json({success:false,status:"You are not logged in",user:req})
  }
})
router.route('/facebook/token').all(cors.corsWithOptions,(req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json("error says backend 87 users")
})

 */


router.post('/login',cors.corsWithOptions,passport.authenticate('local'),(req,res)=>{
  console.log('hello')
  console.log(req.body)
  // passport.authenticate('local') will automatically check the user's authentication 
  //passport.authenticate will put req.user 's value
  var token=authenticate.getToken({_id:req.user._id}) // if you choose you can also include other user's information
  res.statusCode=200;
  res.setHeader('Content-Type','application/json');
  res.json({status:'Login successful ',success:true,token:token,userId:req.user._id})
})
router.route('/login')
.all(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
  res.statusCode=403;
  res.setHeader('Content-Type','application/json');
  res.json({err:"Not available mate"})
})



/* router.post('/l',cors.corsWithOptions,(req,res)=>{
  console.log('hello')
  res.statusCode=200
  res.setHeader('Content-Type','application/json');
  res.json({status:'Login successful ',success:true})
  // passport.authenticate('local') will automatically check the user's authentication 
  //passport.authenticate will put req.user 's value
  console.log(req.body)
})
router.route('/l')
.all(cors.corsWithOptions,(req,res,next)=>{
  res.statusCode=403;
  res.setHeader('Content-Type','application/json');
  res.json({err:"Not available mate"})
})
 */

router.route('/logout')
.all(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
  res.statusCode=403;
  res.setHeader('Content-Type','application/json');
  res.json({err:"Not available mate"});
})






router.get('/:userId',cors.corsWithOptions,authenticate.verifyUser, function(req, res, next) {
  if(authenticate.verifyAdminBoolean){
    Users.findById(req.params.userId)
    .then(user=>{
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json(user)
    })
  }
  else{
    let err=new Error('I guess u are not authorized enough to pull out this request. Only Admins can do this. '+'(username: '+req.user.username+')'+req.user)
    err.status=403;
    return next(err)
  }
})
router.route('/:userId')
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
  if(authenticate.verifyAdminBoolean){
    Users.findByIdAndRemove(req.params.userId)
    .then(user=>{
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json(user)
    })
  }
  else{
    let err=new Error('I guess u are not authorized enough to pull out this request. Only Admins can do this. '+'(username: '+req.user.username+')'+req.user)
    err.status=403;
    return next(err)
  }
})
router.route('/:userId')
.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
  if(authenticate.verifyAdminBoolean){
    Users.findByIdAndUpdate(req.params.userId,{$set:req.body},{new:true})
    .then(user=>{
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json(user)
    })
  }
  else{
    let err=new Error('I guess u are not authorized enough to pull out this request. Only Admins can do this. '+'(username: '+req.user.username+')'+req.user)
    err.status=403;
    return next(err)
  }
})
.all(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
  res.statusCode=403;
  res.setHeader('Content-Type','application/json');
  res.json("Not available mate")
})

 

module.exports = router;
