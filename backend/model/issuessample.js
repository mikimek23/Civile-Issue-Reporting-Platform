const mongoose=require('mongoose')
const issue=new mongoose.Schema({
    title:String,
    description:String,
    photourl:String,
    location:String,
    status:{type:String, default:"pending"},
    userId:{type: mongoose.Schema.Types.ObjectId, ref:"sample"},
    createdBy:String

},{timestamps:true})


const issues=mongoose.model('issue',issue)

module.exports=issues