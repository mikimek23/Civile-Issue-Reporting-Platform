const issues=require('../model/issuessample')
const users=require('../model/sample')
const multer= require('multer');
const path = require('path'); 

const storage=multer.diskStorage({
    destination:(req,file, cb)=>{
        cb(null, 'uploads/')
    },
    filename:(req, file, cb)=>{
         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload=multer({
    storage:storage,
    limits:{ fileSize: 1024 * 1024 * 5 },
    fileFilter:(req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Only JPG, JPEG, and PNG files are allowed!'), false);
        }
        cb(null, true);
    }
}).single('photourl')
//report
exports.report=async(req,res)=>{

    upload(req, res, async (err) => {
        if (err) {
            // Handle Multer errors (e.g., file size, file type)
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ success: false, message: err.message });
            } else if (err) {
                return res.status(400).json({ success: false, message: err.message });
            }
        }
    
    try {
     const {title,description,city,location, woreda, kebele, area, status}=req.body;
     const photourl = req.file ? req.file.path : null;
    const userid=req.id
    
    const foundUser= await users.findOne({_id:userid});
    const issueExist= await issues.findOne({location:location});
    if(issueExist){
        return res.status(400).json({
            success:false,
            message:"Issue already exist!!",
        })
        
    }
    
    await issues.create({
        title:title,
        description:description,
        photourl:photourl,
        location:`${city}/${location}/${woreda}/${kebele}/${area}`,
        status:status,
        userId: req.id,
        createdBy:foundUser.email
    })
    res.status(201).json({
        success:true,
        message:"thank you, you report successfully!!"})   
     
    } catch (error) {
       console.log(error.message) 
       res.status(500).json({
        success:false,
        message:"server error!!"})
    }
    
})
}
exports.issues=async(req, res)=>{
    try {
        const userid=req.id;
       const reports= await issues.find({userId:userid})
       res.json(reports)
        
    } catch (error) {
        console.log(error.message) 
       res.status(500).json({
        success:false,
        message:"server error!!"})
    }
}

//for admin

exports.reports=async(req,res)=>{
    try {
        
      const user=await users.findOne({_id:req.id})
        if(user.role !=="Admin"){
            return res.status(403).json('This page is only for admin')
        }
        const allReports= await issues.find()
        res.json(allReports)
    } catch (error) {
        console.log(error.message) 
       res.status(500).json({
        success:false,
        message:"server error!!"})
    
    }
}
//update issue
exports.updateIssue=async (req, res) => {
  try {
    const { status } = req.body;
    const updatedReport = await issues.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updatedReport);
  } catch (err) {
    res.status(500).json({ error: "Failed to update report status" });
  }
}
exports.deleteIssue=async (req, res) => {
  try {
    const deletedReport = await issues.findByIdAndDelete(req.params.id);
    if (!deletedReport) {
      return res.status(404).json({ error: "Report not found" });
    }
    res.json({ message: "Report deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err.message);
    res.status(500).json({ error: err.message });
  }
}