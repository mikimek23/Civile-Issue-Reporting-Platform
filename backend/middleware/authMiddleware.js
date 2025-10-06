const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
dotenv.config();
exports.authMiddleware=(req,res, next)=>{
    const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: "Not authorized" });
  }

  // Extract the token by splitting the header value
  const token = authHeader.split(' ')[1]; 

  if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
  }
    
    if(!token){return res.status(401).json({message:"not authorized"})
    } 

    jwt.verify(token, process.env.ACCESS_SECRET_KEY,(err, decoded)=>{
        if(err){return res.status(403).json({message:"you are unauthorize"})}
        req.id= decoded.id;
        next()
    } )
}