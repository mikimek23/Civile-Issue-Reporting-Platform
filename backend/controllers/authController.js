const users=require('../model/sample')
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')
//register
exports.register=async(req, res)=>{
    try {
        const {name, email, password,role}=req.body;
        const foundUser=await users.findOne({email:email});
        if(foundUser){
            return res.status(400).json({
                success:false,
                message:"User already exist!",
                token:null
            })
        }
        const hashedPassword=await bcrypt.hash(password, 10)
        const user= await users.create({
            name:name,
            email:email,
            password:hashedPassword,
            role:role?role:"user"
        })
        const token=jwt.sign({id: user.id, role: user.role}, process.env.ACCESS_SECRET_KEY,{expiresIn:'1d'})
        res.status(201).json({
            success:true,
            message:"user register successfully",
            token,
            role:user.role
        })
    } catch (error) {
      console.log(error.message)
      res.status(500).json({
        success:false,
        message:"server side error!",
        token:null
    })
    }
}

//log in
exports.login=async(req, res)=>{
    try {
        const {email, password}=req.body
        const foundUser=await users.findOne({email:email});
        if(!foundUser){
            return res.status(401).json({
                success:false,
                message:"Incorrect email or password!!",
                token:null
            })
        }
        const isVerify=await bcrypt.compare(password, foundUser.password)
        if(!isVerify){
            return res.status(400).json({
                success:false,
                message:"Incorrect email or password",
                token:null
            })
        }
        const token=jwt.sign({id:foundUser.id, role: foundUser.role},process.env.ACCESS_SECRET_KEY,{expiresIn:"1d"})
        res.status(200).json({
            success:true,
            message:`Welcome ${foundUser.name}`,
            token,
            role:foundUser.role
        })
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success:false,
            message:"Server error",
            token:null
        })
        
    }

}