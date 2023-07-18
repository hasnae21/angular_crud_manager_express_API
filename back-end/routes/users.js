const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const UsersModel = require('../models/user.model');


/* GET users listing. */
router.get('/get-users', function(req, res, next) {
  
  UsersModel.find().then((data)=>{
    res.send({status:200,results:data})
  }).catch((err)=>{
    res.send(err)
  })
});
router.post('/login-user', function(req, res, next) {
  

  UsersModel.findOne({email:req.body.email,password:req.body.password}).then((data)=>{
    if(data != null){
    res.send({status:true,results:data})
  }else{
    res.send({status:false})
  }
    console.log(data);
  }).catch((err)=>{
    res.send(err)
  })
});
/* GET one user listing. */
router.get('/get-user/:id', function(req, res, next) {
  var idParams = req.params.id;
  UsersModel.find({ userId: idParams })
    .then((data) => {
      if (data) {
        res.status(200).json({ status: 200, results: data });
      } else {
        res.status(404).json({ status: 404, message: 'User not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ status: 500, error: err.message });
    });
});


/* ADD user listing. */

router.post('/add-user', function(req, res) {


  UsersModel.find().then((data)=>{
   const idInc =  data.length
    console.log(data.length)
 

  console.log(req.body);
  if (!req.body.username && !req.body.email && !req.body.password && !req.body.fullName && !req.body.birthday) {
    return res.status(400).json({ status: 400, message: "Missing required fields" });
  }

  let newUser = new UsersModel({
    userId: idInc+1,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    fullName: req.body.fullName,
    birthday: req.body.birthday,
    createdAt: Date.now()
  });

  newUser.save()
    .then((newUser) => {
      res.status(200).json({ status: 200, message: "User has been added", userObj: newUser });
    })
    .catch((err) => {
      res.status(500).json({ status: 500, error: err.message });
    });
  })
  });


/* UPDATE user listing. */


router.put('/edit-user/:id', function(req, res) {
  console.log(req.params.id);
  var value = req.body
  console.log(value);
  var userId ={userId:req.params.id}
  console.log(userId);
   UsersModel.findOneAndUpdate(userId,value)
   .then((data)=>{
     res.send({status:200,results:data})
   })
 .catch((err)=>{
     res.send(err)
   })
   console.log("user id:",userId);
  
     
 });
/* DELETE user listing.*/

router.delete('/delete-user/:id', function(req, res) {
   
   
   
  var userId ={userId:req.params.id}
  // console.log(studentId);
   UsersModel.deleteOne(userId)
   .then((data)=>{
     res.send({status:200,results:data})
   })
 .catch((err)=>{
     res.send(err)
   })
   
  
     
 });

module.exports = router;
