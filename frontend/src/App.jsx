//import { useState } from 'react'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Report from './pages/Report';
import Issues from './pages/Issues';
import Admindashboard from './pages/Admindashboard';
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <>
    <div>
         <BrowserRouter>
         <Navbar/>
         <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/register' element={<Registration/>}></Route>
          <Route path='/signin' element={<Login/>}></Route>
          <Route path='/report' element={<ProtectedRoute><Report/></ProtectedRoute>}></Route>
          <Route path='report/issues' element={<ProtectedRoute><Issues/></ProtectedRoute>}></Route>
          <Route path='/admin/dashboard' element={<ProtectedRoute><Admindashboard/></ProtectedRoute>}></Route>
         </Routes>
         </BrowserRouter>
        
    </div>
     <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
}

export default App;
