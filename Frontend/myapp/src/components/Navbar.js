import React from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  
  return (
    <nav className="w-full bg-gray-100  fixed top-0 left-0 z-50 px-6 py-3 flex justify-between items-center">
      <Link to="/"><p className="text-2xl font-bold text-gray-800 cursor-pointer">CommentAnaly</p></Link>
      <Link to="/">
      <button className="px-5 py-2 bg-white border-black text-black border  hover:bg-gray-200">
        Get Started
      </button>
      </Link>
      
      
    </nav>
  );
}

