
import {Clock,Camera, MapPin, ShieldCheck, Bell, ListCheck, BarChart, Facebook, Twitter, Linkedin, XIcon, TwitterIcon} from 'lucide-react'
const Home = () => {
  const platforms=[
    {icon:<Camera size={100} color='green'/>,
      title:"Report", 
      description:"Easily report issues in your community by uploding a photo, adding a short description, and tagging the exact location on the map."
    },
    {icon:<Clock size={100} color='red'/>,
      title:"Track", 
      description:"Stay updated on the progress of your complaint with real-time status updates from pending to resolved."
    },
    {icon:<ShieldCheck size={100} color='blue'/> ,
      title:"Resolve", 
      description:"Authorities receive your reports directly, take action, and update the system once the issue is resolved."
    }
  ];

  const Features=[
    {icon:<MapPin size={100} color='red'/>,
      title:"Geo-tagging With Google Map", 
      description:"Pinpoint the exact location of civic issues using interactive maps for precise reporting."
    },
    {icon:<Bell size={100} color='gold'/>,
      title:"Real-time Status Updates", 
      description:"Get instant Updates as your report moves from submission to resolution."
    },
    {icon:<ListCheck size={100} color='white' className='bg-black'/> ,
      title:"Transparent Issue Traking", 
      description:"Follow every step of the process, ensuring accountability and openness."
    },
    {icon:<BarChart size={100} color='green'/> ,
      title:"Admin dashboard With Analytics", 
      description:"Authorities can manage reports efficiently with charts, statistics, and performance insights."
    }
  ]
  
  return (
    <div className=' min-h-screen'>
    <section className=" shadow-lg pt-24 pb-16 ">

      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        
        
        <div className=" text-center justify-center items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-700 mb-4">
            Report Civic Issues <span className="text-green-600">Easily</span>
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Empowering citizens with transparent and efficient civic issue reporting.  
            Report problems, track progress, and make your community better.
          </p>
          <div className="flex justify-center md:justify-center gap-4 mt-6">
            <a
              href="/report"
              className="bg-green-600 text-white px-2 py-3  rounded-lg shadow hover:bg-green-700 lg:px-6 lg:py-3 md:px-6 md:py-3"
            > Report an Issue
            </a>
            <a
              href="report/issues"
              className="border border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-blue-50"
            >
              View Issues
            </a>
          </div>
        </div>
        <div className="flex-1">
          
        </div>
      </div>
    </section>

    {/*How it works*/}
    <section className=" shadow-lg pt-24 pb-16  w-full mt-20 ">

      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        
        
        <div className="flex-1 text-center md:text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-700 mb-4">
            How It <span className="text-green-600">Works </span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 ">
            {platforms.map((platform, index) => (
              <div key={index} className="text-center bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">{platform.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{platform.title}</h3>
                <p className="text-gray-600">{platform.description}</p>
              </div>
            ))}
          </div>
          </div>
      </div>
    </section>
    {/*features*/}
    <section className=" shadow-lg pt-24 pb-16  w-full mt-20 ">

      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        
        
        <div className="flex-1 text-center md:text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-700 mb-4">
            Key <span className="text-green-600">Features</span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 ">
            {Features.map((feature, index) => (
              <div key={index} className="text-center bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
          </div>
      </div>
    </section>
    {/*About/impact*/}
    <section className=" shadow-lg pt-24 pb-16 ">

      <div className="container mx-auto px-6 flex flex-col  items-center gap-10">
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-700 mb-4 text-center">
            Why <span className="text-green-600">Civil Report</span> Matters
          </h1>
        <div className="flex-1 text-justify md:text-center ">
          
          <p className="text-lg text-gray-600 mb-6">
            Our platform empowers citizens to raise civic issues quickly and ensures authorities respond transparently.By connecting 
            communites with public services, we create accountability and improve response times.
          </p>
          </div>
          <div className='grid md:grid-cols-3 gap-8'>
        
            <div>
              <h3 className='text-2xl font-bold text-green-600'>75%</h3>
              <p className='text-gray-600'>Issues with location data resolved faster</p>
            </div>
            <div>
              <h3 className='text-2xl font-bold text-green-600'>60%</h3>
              <p className='text-gray-600'>Higher citizen trust with real-time tracking</p>
            </div>
            <div>
              <h3 className='text-2xl font-bold text-green-600'>40%</h3>
              <p className='text-gray-600'>Improved efficiency via admin dashboards</p>
            </div>
            
            
          </div>
        
      </div>
    </section>

    {/*footer*/}
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        
        
        <div className="flex flex-wrap gap-6 mb-4 md:mb-0">
          <a href="/about" className="hover:text-white">About</a>
          <a href="/contact" className="hover:text-white">Contact</a>
          <a href="/terms" className="hover:text-white">Terms of Use</a>
          <a href="/privacy" className="hover:text-white">Privacy Policy</a>
        </div>

        
        <div className="flex gap-4 mb-4 md:mb-0">
          <a href="#" className="hover:text-white"><Facebook  size={20}/></a>
          <a href="#" className="hover:text-white"><TwitterIcon size={20}/></a>
          <a href="#" className="hover:text-white"><Linkedin  size={20}/></a>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-6">
        © 2025 Civil Report. All rights reserved.
      </div>
    </footer>
    </div>
  )
}

export default Home