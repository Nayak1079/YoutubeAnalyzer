import React from 'react'
import Landing from './pages/Landing'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'

export default function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element = {<Landing/>}/>
        <Route path='/Home' element = {<Home/>}/>
      </Routes>
    </div>
  )
}
