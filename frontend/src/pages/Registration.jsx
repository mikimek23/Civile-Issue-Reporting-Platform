import React, { useState } from 'react'
import { UserRoundPlus } from 'lucide-react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Registration = () => {

    const [data, setData]=useState({
        name:'',
        email:'',
        password:''
    });
    const [message,setMessage]=useState('')
    const [success,setSuccess]=useState()

   const handleChange=(e)=>{
    const {id, value}=e.target;

    setData({...data, [id]:value})
   }

   const navigate=useNavigate()
   const handleSubmit=async(e) => {
   e.preventDefault()
   try {
    const result=await axios.post("http://localhost:5000/auth/register",data)

    setMessage(result.data.message)
    setSuccess(result.data.success)
    if(result.data.success){
      localStorage.setItem("token",result.data.token)
      setTimeout(()=>navigate('/'),2000)
    }

   } catch (error) {
    if(error.response){
      setMessage(error.response.data.message)
      setSuccess(error.response.data.success)
    }else if(error.request){
      setMessage("Server not responsing. Please try again.")
      setSuccess(false)
    }else{
      setMessage("Server unreachable. Please try again.")
      setSuccess(false)
    }
    console.log(error)
   }
  
  
   }

    const RegistratinForm=[
        {label:"Full name",type:"text",name:"name",id:"name", placeholder:"Abebe", value:data.name},
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
                <UserRoundPlus className="w-8 h-8 mr-2 text-green-600" />Sign Up
              </h1>
              <p style={{ color: success ? "green" : "red", marginTop: "1rem" }} className='text-center'>
          {message}
        </p>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                  
                    {RegistratinForm.map((item, index)=>(
                        <div key={index}>
                        <label htmlFor={item.id} className="block mb-2 text-sm font-medium text-gray-900 mt-4 ">{item.label}</label>
                        <input type={item.type} id={item.id} name={item.name} placeholder={item.placeholder} value={item.value} onChange={handleChange} className="bg-gray-50 bor++der border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required/> 
                        </div>
                    ))}
                  
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" required/>
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="font-light text-gray-700 ">I accept the <a className="font-medium text-green-600 hover:underline " href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
                  <button type="submit" className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Sign Up</button>
                  <p className="text-sm font-light text-gray-600 ">
                      Already have an account? <a href="/signin" className="font-medium text-green-600 hover:underline ">Login here</a>
                  </p>
                
              </form>
          </div>
      </div>
  </div>
</section>
    </div>
  )
}

export default Registration