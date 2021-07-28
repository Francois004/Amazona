import express from 'express';
import userModel from '../models/userModel.js';
import getToken from '../util.js';

const router=express.Router();

router.post('/signin',async(req,res)=>{
    const signinUser=await userModel.findOne({
        email:req.body.email,
        password:req.body.password
    })
    if(signinUser){
      res.send({
          _id:signinUser.id,
          name:signinUser.name,
          email:signinUser.email,
          isAdmin:signinUser.isAdmin,
         // token:getToken(signinUser)
      })
    }else{
        res.status(401).send({msg:'Invalid Email or Password.'})
    }
})
router.post('/register',async(req,res)=>{
   const user=new userModel({
       name:req.body.name,
       email:req.body.email,
        password:req.body.password,

   })
  const newUser=await user.save();

   if(newUser){
    res.send({
        _id:newUser.id,
        name:newUser.name,
        email:newUser.email,
        isAdmin:newUser.isAdmin,
       // token:getToken(newUser)
    })
  }else{
      res.status(401).send({msg:'Invalid User data.'})
  }
  
})
router.get('/createadmin',async (req,res)=>{
 try {
    const user= new userModel({
        name:'Dosnere',
        email:'francoisdosnere@gmail.com',
        password:'1234',
        isAdmin:true,

    })
  const newUser=await user.save();
    
    res.send(newUser);
 } 
 catch(error){
    
 res.send({msg:error})
 }
})

// get all users
 router.get('/',async(req, res)=>{
     try{
       const users= await userModel.find({})
       res.send(users)
     }
     catch(err){
  console.log(err)
     }
 })

export default router;