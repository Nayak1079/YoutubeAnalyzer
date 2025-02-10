import React from 'react'
import Ansh from '../images/Ansh.jpg'
import Aditi from '../images/Aditi.jpg'
import Aman from '../images/Aman.jpg'
import nayak from '../images/nayak.jpg'
import Pandey from '../images/Pandey.jpg'
import Ritu from '../images/Ritu.jpg'
import Footer from '../components/Footer'

export default function Connect() {
    return (
        <div>
        <div className="bg-gray-100 text-black text-center flex flex-col items-center justify-center p-10 py-32">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-5xl">
                <div className="bg-blue-900 bg-opacity-40 text-white p-6 rounded-sm shadow-lg cursor-pointer hover:scale-105 transform transition duration-300 flex flex-col items-center space-y-4">
                    <img className="w-28 h-28 rounded-full border-2 border-white shadow-md object-cover" src={Ansh} alt="Ansh Srivastava" />
                    <h1 className="text-2xl font-bold">Ansh Srivastava</h1>
                    <h2 className="text-lg text-gray-200">Full Stack Developer</h2>
                    <p className="text-sm text-gray-300">KIIT University | 3rd Year</p>

                    <div className="flex space-x-4 mt-3">
                        <a href="https://github.com/AnshCinematic" target='blank' className="px-4 py-2 bg-black text-white text-sm shadow-md hover:bg-gray-600 transition">GitHub</a>
                        <a href="https://www.linkedin.com/in/ansh-srivastava-311a16247?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app " target='blank' className="px-4 py-2 bg-blue-700 text-white text-sm rounded-sm shadow-md hover:bg-blue-800 transition">LinkedIn</a>
                    </div>
                </div>

                <div className="bg-black  bg-opacity-30 text-white p-6 rounded-sm shadow-lg cursor-pointer hover:scale-105 transform transition duration-300 flex flex-col items-center space-y-4">
                    <img className="w-28 h-28 rounded-full border-2 border-white shadow-md object-cover" src={Aditi} alt="Ansh Srivastava" />
                    <h1 className="text-xl font-semibold">Aditi Kumari</h1>
                    <h2 className="text-lg text-gray-200">Frontend Developer</h2>
                    <p className="text-sm text-gray-300">KIIT University | 3rd Year</p>

                    <div className="flex space-x-4 mt-3">
                        <a href="https://github.com/kaditi1411" target='blank' className="px-4 py-2 bg-black text-sm text-white rounded-sm shadow-md hover:bg-gray-600 transition">GitHub</a>
                        <a href="https://www.linkedin.com/in/aditi-kumari-3b3a46230/" target='blank' className="px-4 py-2 bg-blue-700 text-sm text-white rounded-sm shadow-md hover:bg-blue-800 transition">LinkedIn</a>
                    </div>
                </div>

                <div className="bg-blue-900  bg-opacity-40 text-white p-6 rounded-sm shadow-lg cursor-pointer hover:scale-105 transform transition duration-300 flex flex-col items-center space-y-4">
                    <img className="w-28 h-28 rounded-full border-2 border-white shadow-md object-cover" src={Pandey} alt="Ansh Srivastava" />
                    <h1 className="text-xl font-semibold">Aditya Pandey</h1>
                    <h2 className="text-lg text-gray-200">Full Stack Developer</h2>
                    <p className="text-sm text-gray-300">KIIT University | 3rd Year</p>

                    <div className="flex space-x-4 mt-3">
                        <a href="https://github.com/Aditya2661" target='blank' className="px-4 py-2 bg-black text-sm text-white rounded-sm shadow-md hover:bg-gray-600 transition">GitHub</a>
                        <a href="https://www.linkedin.com/in/aditya-pandey-441826251?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app " target='blank' className="px-4 py-2 bg-blue-700 text-sm text-white rounded-sm shadow-md hover:bg-blue-800 transition">LinkedIn</a>
                    </div>
                </div>

                <div className="bg-black  bg-opacity-30 text-white p-6 rounded-sm shadow-lg cursor-pointer hover:scale-105 transform transition duration-300 flex flex-col items-center space-y-4">
                    <img className="w-28 h-28 rounded-full border-2 border-white shadow-md object-cover" src={Aman} alt="Ansh Srivastava" />
                    <h1 className="text-xl font-semibold">Aman Kumar</h1>
                    <h2 className="text-lg text-gray-200">Frontend Developer</h2>
                    <p className="text-sm text-gray-300">KIIT University | 3rd Year</p>

                    <div className="flex space-x-4 mt-3">
                        <a href="https://github.com/amansingh023-art" target='blank' className="px-4 py-2 bg-black text-sm text-white rounded-sm shadow-md hover:bg-gray-600 transition">GitHub</a>
                        <a href="https://www.linkedin.com/in/amankumar023" target='blank' className="px-4 py-2 bg-blue-700 text-sm text-white rounded-sm shadow-md hover:bg-blue-800 transition">LinkedIn</a>
                    </div>
                </div>

                <div className="bg-blue-900  bg-opacity-40 text-white p-6 rounded-sm shadow-lg cursor-pointer hover:scale-105 transform transition duration-300 flex flex-col items-center space-y-4">
                    <img className="w-28 h-28 rounded-full border-2 border-white shadow-md object-cover" src={nayak} alt="Ansh Srivastava" />
                    <h1 className="text-xl font-semibold">Sujal Nayak</h1>
                    <h2 className="text-lg text-gray-200">Full Stack Developer</h2>
                    <p className="text-sm text-gray-300">KIIT University | 3rd Year</p>

                    <div className="flex space-x-4 mt-3">
                        <a href="https://github.com/Nayak1079" target='blank' className="px-4 py-2 bg-black text-sm text-white rounded-sm shadow-md hover:bg-gray-600 transition">GitHub</a>
                        <a href="https://www.linkedin.com/in/sujal-nayak-33405a249/" target='blank' className="px-4 py-2  bg-blue-700 text-sm text-white rounded-sm shadow-md hover:bg-blue-800 transition">LinkedIn</a>
                    </div>
                </div>



                <div className="bg-black bg-opacity-30 text-white p-6 rounded-sm shadow-lg cursor-pointer hover:scale-105 transform transition duration-300 flex flex-col items-center space-y-4">
                    <img className="w-28 h-28 rounded-full border-2 border-white shadow-md object-cover" src={Ritu} alt="Ansh Srivastava" />
                    <h1 className="text-xl font-semibold">Ritu Jha</h1>
                    <h2 className="text-lg text-gray-200">Frontend Developer</h2>
                    <p className="text-sm text-gray-300">KIIT University | 3rd Year</p>

                    <div className="flex space-x-4 mt-3">
                        <a href="#" target='blank' className="px-4 py-2 bg-black text-sm text-white rounded-sm shadow-md hover:bg-gray-600 transition">GitHub</a>
                        <a href="#" target='blank' className="px-4 py-2 bg-blue-700 text-sm text-white rounded-sm shadow-md hover:bg-blue-800 transition">LinkedIn</a>
                    </div>
                </div>

            </div>    
        </div>
        <Footer/>
        </div>
    )
}
