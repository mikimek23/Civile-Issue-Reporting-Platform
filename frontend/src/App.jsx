//import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Report from './pages/Report';
import Issues from './pages/Issues';
import Admindashboard from './pages/Admindashboard';
function App() {
  return (
    <>
    <div>
      
          
         <Navbar/>
         <BrowserRouter>
         <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/signup' element={<Registration/>}></Route>
          <Route path='/signin' element={<Login/>}></Route>
          <Route path='/report' element={<Report/>}></Route>
          <Route path='report/issues' element={<Issues/>}></Route>
          <Route path='/admin/dashboard' element={<Admindashboard/>}></Route>
         </Routes>
         </BrowserRouter>
        
    </div>
    </>
  );
}

export default App;
