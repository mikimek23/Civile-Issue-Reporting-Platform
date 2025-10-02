const express=require('express')
const app=express();
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const cors=require('cors')
dotenv.config()
mongoose.connect('mongodb://localhost:27017/project-7');
const authRoute=require('./routes/authRoute')
//const reportRoute=require('./routes/reportRoute')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/uploads', express.static('uploads')); 

app.use('/auth',authRoute)
//app.use('/report',reportRoute)

const port=process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`)
})

