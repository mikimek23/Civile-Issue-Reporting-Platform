import React, { useState } from 'react'
import { toast } from "react-toastify";

import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { LogInIcon } from 'lucide-react';
const Login = () => {
 const [data, setData]=useState({
        email:'',
        password:''
    });
   const handleChange=(e)=>{
    const {id, value}=e.target;

    setData({...data, [id]:value})
   }

   const navigate=useNavigate()
   const handleSubmit=async(e) => {
   e.preventDefault()
   try {
    const result=await axios.post("http://localhost:5000/auth/login",data)

     toast.success(result.data.message);

    if(result.data.success){
      
      localStorage.setItem("token",result.data.token)
      localStorage.setItem("role",result.data.role)
      setTimeout(()=>{
        if(result.data.role==="Admin"){
          navigate('/admin/dashboard')
        }else{
          navigate('/')
        }
      },2000)
    }

   } catch (error) {
    if(error.response){
      toast.error(error.response.data.message)
    }else if(error.request){
      toast.error("Server not responsing. Please try again.")
    }else{
      toast.error("Server unreachable. Please try again.")
    }
    console.log(error.message)
    

   }
   }

    const LoginForm=[
        {label:"Email",type:"email",name:"email",id:"email", placeholder:"example@gmail.com", value:data.email},
        {label:"Password",type:"password",name:"password",id:"password", placeholder:"••••••••", value:data.password}
    ]
  return (
    <div>
        <section className="bg-gray-50 pt-20 pb-10">
  <div className="flex flex-col items-center justify-center px-6 py-8  mx-auto md:h-screen lg:py-0 md:w-1/2">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
          Civil Report    
      </a>
      <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className=" flex text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                <LogInIcon className="w-8 h-8 mr-2 text-green-600" />Sign In
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                  
                    {LoginForm.map((item, index)=>(
                        <div key={index}>
                        <label htmlFor={item.id} className="block mb-2 text-sm font-medium text-gray-900 mt-4 ">{item.label}</label>
                        <input type={item.type} id={item.id} name={item.name} placeholder={item.placeholder} value={item.value} onChange={handleChange} className="bg-gray-50 bor++der border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required/> 
                        </div>
                    ))}
                  <button type="submit" className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Sign In</button>
                  <p className="text-sm font-light text-gray-600 ">
                      I didn't have an account? <a href="/register" className="font-medium text-green-600 hover:underline ">Signup here</a>
                  </p>
                
              </form>
          </div>
      </div>
  </div>
</section>
    </div>
  )
}

export default Login