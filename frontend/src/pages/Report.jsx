import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { FileEdit} from 'lucide-react';
import { toast } from 'react-toastify';

const Report = () => {
    
    const [data, setData]=useState({
        title:'',
        description:'',
        city:'Addis Ababa',
        location:'',
        woreda:'',
        kebele:'',
        area:''
    });
    const [photoFile, setPhotoFile] = useState(null);

   const handleChange=(e)=>{
    const {id, value}=e.target;

    setData({...data, [id]:value})
   }
   const handleFileChange = (e) => {

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
    formData.append('city', data.city);
    formData.append('location', data.location);
    formData.append('woreda', data.woreda);
    formData.append('kebele', data.kebele);
    formData.append('area', data.area);
    formData.append('photourl', photoFile); 

        try {
          console.log("Submitting data:", data);
            const response = await axios.post('http://localhost:5000/report', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            toast.success(response.data.message)
            if(response.data.success){
                setTimeout(()=>{
                    navigate('/')
                },2000)
            }
            ;

        } catch (error) {
           if(error.response){
      toast.error(error.response.data.message)
    }else if(error.request){
      toast.error("Server not responsing. Please try again.")
    }else{
      toast.error("Server unreachable. Please try again.")
    }
    console.log(error)
        }
    };
  
    
  return (
    <div>
        <section className="bg-gray-50 pt-20 pb-10  ">
  <div className="  flex flex-col items-center justify-center px-6 py-8  mx-auto md:min-h-screen lg:py-0 md:w-1/2 ">
      
      <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className=" flex text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                <FileEdit className="w-8 h-8 mr-2 text-green-600" />Report Issue
              </h1>
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


                <fieldset className='border border-gray-400 p-5'>
        <legend>Location</legend>
        <label htmlFor='city' className="block mb-2 text-sm font-medium text-gray-900 mt-4 ">City</label>
                <input type='text' id="city" name="city" value={data.city} placeholder='city' onChange={handleChange} className="bg-gray-50 bor++der border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "  readonly/> 
        <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 mt-4 ">Sub-City</label>
        <select id="location" name="location" value={data.location} onChange={handleChange} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-center' required>
          <option value="">--select Sub-City--</option>
          <option value="Addis Ketema">Addis Ketema</option>
          <option value="Akaky Kaliti"> Akaky Kaliti</option> 
          <option value="Arada">Arada</option>
          <option value="Bole"> Bole</option> 
          <option value="Gullele">Gullele</option>
          <option value="Kirkos"> Kirkos</option>
          <option value="Kolfe Keranio">Kolfe Keranio</option>
          <option value="Lideta">Lideta</option>
          <option value="Nifas Silk-Lafto">Nifas Silk-Lafto</option>
          <option value="Yeka"> Yeka</option>
          <option value="Lemi kura">Lemi kura</option>
        </select>
        <label htmlFor='woreda' className="block mb-2 text-sm font-medium text-gray-900 mt-4 ">Woreda</label>
                <input type='text' id="woreda" name="woreda" value={data.woreda} placeholder='woreda' onChange={handleChange} className="bg-gray-50 bor++der border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required/> 
        <label htmlFor='kebele' className="block mb-2 text-sm font-medium text-gray-900 mt-4 ">Kebele</label>
                <input type='text' id="kebele" name="kebele" value={data.kebele} placeholder='kebele' onChange={handleChange} className="bg-gray-50 bor++der border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required/> 
                        
        <label htmlFor='area' className="block mb-2 text-sm font-medium text-gray-900 mt-4 ">area/district</label>
                <input type='text' id="area" name="area" value={data.area} placeholder='area/district' onChange={handleChange} className="bg-gray-50 bor++der border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required/> 
                        
    </fieldset>      
    
                  <label htmlFor='photourl' className="block mb-2 text-sm font-medium text-gray-900 mt-4 ">image</label>
                <input type='file' id="photourl" name="photourl"  accept='.jpg, .jpeg, .png' onChange={handleFileChange}  className="bg-gray-50 bor++der border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required /> 
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