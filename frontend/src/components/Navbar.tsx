import { useState } from "react"


const Navbar = () => {
  const [open,setOpen]=useState(false);
  const navItems=[
    {name:"Home", path:'/'},
    {name:"Report", path:'/report'},
    {name:"View Issue", path:'/report/issue'}
  ];
  const isActive=(path)=>window.location.pathname===path;
  return (
<>
     <nav className="block w-full  px-4 py-2 mx-auto text-gray-700 bg-white shadow-md rounded-md lg:px-8 lg:py-3  fixed top-0">
      <div className="container mx-auto flex justify-between items-center">
       
        <div className="text-xl font-bold">Civil Report</div>

        
        <div className="hidden lg:flex space-x-4">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.path}
              className={
                `px-4 py-2 rounded-lg transition-colors
                ${isActive(item.path) ? 'bg-green-600 text-white' : 'hover:bg-gray-200 hover:text-gray-700'  // Inactive link hover styles
                }
              `}
            >
              {item.name}
            </a>
          ))}

          
          <a
            href="/signin"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Sign In
          </a>
        </div>
        <button className="relative  ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle text-xs font-medium  text-inherit transition-all   disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden "
      onClick={()=>setOpen(!open)}>
      <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 md:group">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </span>
    </button>
    {open && (
      <div className="md:hidden   w-30 text-center h-fit absolute right-0.5 top-10   mx-auto  bg-white shadow-md rounded-md pt-3  ">
        {navItems.map((item) => (
            <a
              key={item.name}
              href={item.path}
              className={
                `block px-4 py-2 rounded-lg transition-colors
                ${isActive(item.path) ? 'bg-green-600 text-white' : 'hover:bg-gray-200 hover:text-gray-700'  // Inactive link hover styles
                }
              `}
            >
              {item.name}
            </a>
          ))}
          <a
            href="/signin"
            className={`block bg-green-500 hover:bg-green-600 text-gray-700 px-4 py-2 rounded-lg transition-colors`
            
            }
          >
            Sign In
          </a>
      </div>
    )}
      </div>
       
    </nav>
</>
  )
}

export default Navbar