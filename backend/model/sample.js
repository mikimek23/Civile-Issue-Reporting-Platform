const mongoose=require('mongoose')

const user=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:String
})

const Users=mongoose.model('users',user)

module.exports=Users