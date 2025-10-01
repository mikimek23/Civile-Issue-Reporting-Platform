//import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Report from './pages/Report';
function App() {
  return (
    <>
    <div>
         <Navbar/>
         <BrowserRouter>
         <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/register' element={<Registration/>}></Route>
          <Route path='/register' element={<Registration/>}></Route>
          <Route path='/signin' element={<Login/>}></Route>
          <Route path='/report' element={<Report/>}></Route>
         </Routes>
         </BrowserRouter>
    </div>
    </>
  );
}

export default App;
