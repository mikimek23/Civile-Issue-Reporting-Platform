import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { FileEdit} from 'lucide-react';

const Report = () => {
    
    const [data, setData]=useState({
        title:'',
        description:'',
        location:''
    });
    const [photoFile, setPhotoFile] = useState(null);
    const [message, setMessage]=useState('');
    const [success, setSuccess]=useState(false)

   const handleChange=(e)=>{
    const {id, value}=e.target;

    setData({...data, [id]:value})
   }
   const handleFileChange = (e) => {
    // Get the first file from the files list
    setPhotoFile(e.target.files[0]);
}

   const navigate=useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();

         if (!data.title || !data.description) {
            alert("Title and description are required!");
            return;
        }


        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token not found. Please log in.');
            navigate('/login')
            return;
        }

        const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('location', data.location);
    formData.append('photourl', photoFile); 

        try {
          console.log("Submitting data:", data);
            const response = await axios.post('http://localhost:5000/report', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            setSuccess(response.data.success)
            setMessage(response.data.message)
            if(response.data.success){
                setTimeout(()=>{
                    navigate('/')
                },2000)
            }
            ;

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
    };
  
    
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
                <FileEdit className="w-8 h-8 mr-2 text-green-600" />Report Issue
              </h1>
              <p style={{ color: success ? "green" : "red", marginTop: "1rem", fontSize:"1.5rem"}} className='text-center'>
          {message}
        </p>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                  <label htmlFor='title' className="block mb-2 text-sm font-medium text-gray-900 mt-4 ">Issue Type</label>
                <select id="title" name="title" value={data.title} onChange={handleChange} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-center' required>
                  <option value="">--select an issue--</option>
                  <option value="Water Supply">Water Supply</option>
                  <option value="Electricity">Electricity</option>
                  <option value="Road Damage">Road Damage</option>
                  <option value="Waste Management">Waste Management</option>
                  <option value="Other">Other</option>
                </select>

                  <label htmlFor='description' className="block mb-2 text-sm font-medium text-gray-900 mt-4 ">description</label>
                <textarea rows={5} cols={13} id="description" name="title" placeholder='description' value={data.description}  onChange={handleChange} className="bg-gray-50 bor++der border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required/>

                  <label htmlFor='photourl' className="block mb-2 text-sm font-medium text-gray-900 mt-4 ">image</label>
                <input type='file' id="photourl" name="photourl"  accept='.jpg, .jpeg, .png' onChange={handleFileChange}  className="bg-gray-50 bor++der border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required /> 

                  <label htmlFor='location' className="block mb-2 text-sm font-medium text-gray-900 mt-4 ">location</label>
                <input type='text' id="location" name="location" value={data.location} placeholder='location' onChange={handleChange} className="bg-gray-50 bor++der border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required/> 
                        
                    
                  <button type="submit" className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Report</button>
                  
              </form>
          </div>
      </div>
  </div>
</section>
    </div>
  )
}

export default Report