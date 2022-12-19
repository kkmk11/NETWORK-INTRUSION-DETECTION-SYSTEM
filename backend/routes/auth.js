// const express=require('express');
// const User=require('../modals/User');
// const router=express.Router();
// const bcrypt=require('bcryptjs')
// const {body,validationResult}=require('express-validator');
// var jwt=require('jsonwebtoken')
// var fetchuser=require('../middleware/fetchuser')
// const JWT_SECRET="Harryisagoodb$oy"
// //create a user using post  "/api/auth/" doesnt require auth and end point
// router.post('/createuser',[
//     body('name').isLength({min:3}),
//     body('email').isEmail(),
//     body('password').isLength({min:8}),
// ],async(req,res)=>{
//     const errors=validationResult(req);
//     if(!errors.isEmpty()){
//         return res.status(400).json({errors:errors.array()});
//     }
//     try{
//     let user=await User.findOne({email:req.body.email});
//     if(user){
//         return res.status(400).json({error:"sorry a user with this email alresdy exists"})
//     }
//     const salt=await bcrypt.genSalt(10);
//     secPass=await bcrypt.hash(req.body.password,salt);
//     user=await User.create({
//         name:req.body.name,
//         email:req.body.email,
//         password:secPass,
//     })
    
//     // .then(user=>res.json(user))
//     // .catch(err=>{console.log(err)
//     // res.json({error:"please enter unique email",message: err.message})})
//     const data={
//         user:{
//             id:user.id
//         }
//     }
//     const authtoken=jwt.sign(data,JWT_SECRET);
//     res.json({authtoken})
//     }catch(error){
//         console.error(error.message);
//         res.status(500).send("some error occured");
//     }
// })
// router.post('/login',[
//     body('email','enter a valid email').isEmail(),            //validation
//     body('password','password cannot be blank').exists(),
// ],async(req,res)=>{
//     const errors=validationResult(req);
//     if(!errors.isEmpty()){
//         return res.status(400).json({errors:errors.array()});
//     }
//     const {email,password}=req.body;
//     try{
//         let user=await User.findOne({email});
//         if(!user){
//             return res.status(400).json({error:"please try to login with valid credentials"});
//         }
//         const passwordcomp=await bcrypt.compare(password,user.password);
//         if(!passwordcomp){
//             return res.status(400).json({error:"please try to login with valid credentials"});
//         }
//         const data={
//             user:{
//                 id:user.id
//             }
//         }
//         const authtoken=await jwt.sign(data,JWT_SECRET);
//         res.json({authtoken})
//     }catch(error){
//         console.error(error.message);
//         res.status(500).send("Internal server error");
//     }
// })
// //route:3
// router.post('/getuser',fetchuser,async(req,res)=>{
// try{
//     userId=req.user.id;
//     const user = await User.findById(userId).select("-password")
//     res.send(user)
// }catch(error){
//     console.error(error.message);
//     res.status(500).send("Internal server error");
// }
// })
// module.exports=router


const express = require('express');
const User = require('../modals/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Harryisagoodb$oy';

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  // If there are errors, return Bad request and the errors
  let success=false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success,errors: errors.array() });
  }
  try {
    // Check whether the user with this email exists already
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({success,error: "Sorry a user with this email already exists" })
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    });
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);

    success=true;
    // res.json(user)
    res.json({ success,authtoken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})


// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
let success=false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      success=false
      return res.status(400).json({ success,error: "Please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success=false
      return res.status(400).json({ success,error: "Please try to login with correct credentials" });
    }
    success=true
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({success, authtoken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }


});


// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser,  async (req, res) => {

  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})
router.post('/myinfo', fetchuser,  async (req, res) => {

  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

router.get('/predictKNN',(req,res)=>{
  const InpFilePath  = req.query.Home;
  const PyFilePath = "D:/NIDS/ML_Projects/Network-Intrusion-Detection-Using-Machine-Learning/KNN.py"
  const {spawn} = require('child_process');
  const childPython = spawn('python',[PyFilePath,InpFilePath]);

  childPython.stdout.on('data', (data)=>{
      res.send({"result":`${data}`}) 
  });

  childPython.on('close', (code)=>{
      console.error(`child process exited with code ${code}`)
  }) 
  
  childPython.on("end",()=>{
    console.log("python file ran successfully");
  })

  childPython.stderr.on('data',(data)=>{
    console.log(`stdout:${data}`)
  })
})
module.exports = router