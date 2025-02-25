import React, { useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import PieChart from '../components/Piechar';
import loader from '../images/loader.gif';
import rotater from '../images/rotater.gif';
import Footer from '../components/Footer';
export default function Home() {

  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showGraph, setShowGraph] = useState(false);

  const handleSubmit = async (e) => {
    if (url === '') {
      toast.error("Please enter a valid URL");
    }
    else {
      toast.success("Analyzing the video. Please wait...");
    }
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://127.0.0.1:5000/Home', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || 'An error occurred');
      }
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <div className="bg-gray-100 h-screen flex flex-col md:flex-row items-center justify-around px-6">
      <div className="text-center md:text-left max-w-lg">
        <h1 className="text-6xl md:text-7xl font-extrabold text-gray-800 drop-shadow-lg cursor-pointer hover:translate-x-3 transform transition duration-200">
          YouTube Analyzer
        </h1>
        <p className="text-lg md:text-xl text-gray-800 mt-5 opacity-90">
          Discover <span className='font-bold animate-pulse'>sentiments</span>  hidden in your YouTube videos.
        </p>
      </div>

      {loading && (
        <div className='fixed flex flex-col items-center justify-center z-50'>
          <img src={rotater} alt="loader" className="w-80" />
          <p>Analyzing your video...</p>
          <p>This may take some time. Please Wait...</p>
        </div>  
      )}

      <div className="bg-gray-100 p-8 rounded-xl flex flex-col gap-5 w-full max-w-xl mt-10 md:mt-0">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-gray-700 font-semibold text-3xl">Paste the URL</label>
          <input
            type="text"
            name="link"
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter YouTube video URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 shadow-md">
            {loading ? 'Analyzing...' : 'Analyze Now ✨'}
          </button>
        </form>

        {error && <div className="text-red-500 mt-3">{error} </div>}

        {result && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold">Sentiment Analysis Results</h2>
            <p>Total Comments: {result["Total comments analyzed"]}</p>
            <p>Total <span className='text-green-700 font-bold'>Positive</span> Comments: {result["Total positive comments"]}</p>
            <p>Total <span className='text-red-800 font-bold'>Negative</span> Comments: {result["Total negative comments"]}</p>
            <p>Total <span className='text-gray-600 font-bold'>Neutral</span> Comments: {result["Total neutral comments"]}</p>
            <p><span className='text-green-700 font-bold'>Positive</span> Comments Percentage: {result["Positive comments percentage"]}%</p>
            <p><span className='text-red-800 font-bold'>Negative</span> Comments Percentage: {result["Negative comments percentage"]}%</p>
            <p><span className='text-gray-600 font-bold'>Neutral</span> Comments Percentage: {result["Neutral comments percentage"]}%</p>
            <button className="bg-blue-600 text-white  font-medium w-58 py-2 px-5 mt-3  hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
             onClick={() =>{setShowGraph(true)}}>
              Show Graph
            </button>
          </div>
        )}
      </div>
      {showGraph && 
    
        <div className= "fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-90 z-50 gap-4">

        {/* button for closing the graph */}
        <button className="absolute top-5 right-5 text-white text-2xl" onClick={() => setShowGraph(false)}>✕</button>
          <h2 className="text-2xl font-bold text-white text-3xl">Sentiment Analysis Graph</h2>

          {/* Graphic representation of the sentiment analysis results. */}
          <div className='bg-white p-5 rounded-sm '>
          {/* <PieChart positive={result["Total positive comments"]} negative={result["Total negative comments"]} neutral={result["Total neutral comments"]} /> */}
          <PieChart 
    positive={result["Total positive comments"]} 
    negative={result["Total negative comments"]} 
    neutral={result["Total neutral comments"]} 
    videoTitle={result["videoTitle"]} 
    totalComments={result["Total comments analyzed"]} 
/>

          </div>

        </div>  
      }
    </div>
    <Footer/>
    </div>
  );
}
