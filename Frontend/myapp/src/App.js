import React from 'react'
import Landing from './pages/Landing'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useState } from 'react'
import Connect from './pages/Connect'
import About from './pages/About'
export default function App() {

  const [Loggedin,setLogin]= useState(false);
  const [Signedup,setSignup]= useState(false);
  return (
    <div>
      <Navbar Loggedin={Loggedin} setLogin={setLogin}/>
      <Routes>
        <Route path='/' element = {<Landing/>}/>
        <Route path='/Home' element = {<Home/>}/>
        <Route path='/Login' element={<Login  Loggedin={Loggedin} setLogin={setLogin}/>}/>
        <Route path='/Signup' element={<Signup Signedup={Signedup} setSignup={setSignup}/>}/>
        <Route path='/Contact' element = {<Connect/>}/>
        <Route path='/About' element={<About/>}/>
      </Routes>
    </div>
  )
}
