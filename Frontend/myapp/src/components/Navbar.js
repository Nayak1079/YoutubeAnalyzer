import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
export default function Navbar({ Loggedin, setLogin }) {

  return (
        <nav className="w-full bg-gray-100  fixed top-0 left-0 z-50 px-6 py-3 flex justify-between items-center">
          <Link to="/"><p className="text-2xl font-bold text-gray-800 cursor-pointer">CommentAnaly</p></Link>

          {!Loggedin &&
            <Link to="/Login">
              <button className="px-5 py-2 bg-white border-black text-black border  hover:bg-gray-200">
                Get Started
              </button>
            </Link>

          }
{
  Loggedin &&
  <div className="flex gap-20 flex-row text-gray-700">
    <NavLink className='hover:-translate-y-1 transform transition duration-200' to="/home"
      style={({ isActive }) => ({
        textDecoration: isActive ? 'underline' : 'none',
        textDecorationColor: isActive ? 'blue' : 'transparent',
        textUnderlineOffset: '4px' // Adjusts the distance of the underline from the text
      })}>
      Home
    </NavLink>
    
    <NavLink className='hover:-translate-y-1 transform transition duration-200' to="/Contact"
      style={({ isActive }) => ({
        textDecoration: isActive ? 'underline' : 'none',
        textDecorationColor: isActive ? 'blue' : 'transparent',
        textUnderlineOffset: '4px'
      })}>
      Contact
    </NavLink>
    
    <NavLink className='hover:-translate-y-1 transform transition duration-200' to="/About"
      style={({ isActive }) => ({
        textDecoration: isActive ? 'underline' : 'none',
        textDecorationColor: isActive ? 'blue' : 'transparent',
        textUnderlineOffset: '4px'
      })}>
      About
    </NavLink>
  </div>
}


          {Loggedin &&

            <Link to="/">
              <button className="px-5 py-2 bg-white border-black text-black border  hover:bg-gray-200" onClick={() => {
                setLogin(false)
              }}>
                Log Out
              </button>
            </Link>
            }
        </nav>
    
        );

  }

