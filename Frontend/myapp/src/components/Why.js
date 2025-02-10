import React from 'react'

export default function Why() {
  return (
    <div className='bg-gray-100 h-screen text-black text-center flex flex-col items-center p-10 gap-32'>
      <p className='text-7xl font-bold text-gray-800'>Why to use Comment Analyzer</p>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        <div className='bg-black bg-opacity-30 text-white p-10 rounded-lg shadow-lg cursor-pointer hover:scale-105 transform transition duration-200'>
         <p className='text-2xl font-bold '> ✅ Save Time</p>  
          <p>No need to read thousands of comments manually.</p>
        </div>
        <div className='bg-blue-700 bg-opacity-80 text-white p-10 rounded-lg shadow-lg  cursor-pointer hover:scale-105 transform transition duration-200'>
        <p  className='text-2xl font-bold '> ✅ Accurate Sentiment Analysis</p>   
          <p> Based on NLP and polarity scoring..</p>
        </div>
        <div className='bg-blue-700 bg-opacity-80 text-white p-10 rounded-lg shadow-lg  cursor-pointer hover:scale-105 transform transition duration-200'>
        <p  className='text-2xl font-bold '>  ✅ Easy-to-Use Interface </p> 
          <p>Just paste a link and get insights instantly.</p> 

        </div>
        <div className='bg-black bg-opacity-30 text-white p-10 rounded-lg shadow-lg  cursor-pointer hover:scale-105 transform transition duration-200'>
        <p  className='text-2xl font-bold '> ✅ Export & Share </p>  
          <p>Download a sentiment report with a single click.</p> 

        </div>
      </div>

    </div>
  )
}
