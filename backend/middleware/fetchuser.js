// var jwt=require('jsonwebtoken');
// const JWT_SECRET="Harryisagoodb$oy"
// const fetchuser=(req,res,next)=>{
//     //get the user from jwt and add id to req object
//     const token=req.header('auth-token');
//     if(!token){
//         res.status(401).send({error:"please icate using a valid token"})
//     }
//     try{
//         console.log(token+  JWT_SECRET)
//         console.log(jwt.verify(token,JWT_SECRET))
//         const data=jwt.verify(token,JWT_SECRET);
//         console.log("12")
//         req.user=data.user;
//         next();
//     }catch(error){
//         console.log("in catch block")
//         res.status(401).send({error:"please authenticate using a valid token"})
//     }
    
// }
// module.exports=fetchuser;
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Harryisagoodb$oy';

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header("auth-token");
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        console.log("in catch")
        res.status(401).send({ error: "Please authenticate using a v" })
    }

}


module.exports = fetchuser;