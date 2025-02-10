import React from 'react';

export default function Aboutus() {
  return (
    <div className="bg-gray-100 h-screen flex flex-row items-center justify-around px-16 gap-10">
      
      <div className="text-center md:text-left max-w-screen-md shadow-lg rounded-lg p-4 h-auto py-14  hover:transform hover:scale-105 transition duration-100 cursor-pointer animate-bounce">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-700 px-4 py-2 rounded-md leading-tight">
        CommentAnaly - YouTube Analyzer  
        </h1>
        <h2 className="text-2xl md:text-lg leading-tight font-semibold text-gray-900 mt-4">
            Understand Audience Sentiment Instantly!
        </h2>
        </div>
        <div>
        {/* Description */}
        <p className="text-lg md:text-xl text-gray-800 mt-6 max-w-screen-md">
          <span className="text-blue-800 font-semibold">YouTube Analyzer</span> is a sentiment analysis tool that evaluates 
          audience feedback by analyzing YouTube comments. Using <span className="text-blue-800 font-medium">VADER Sentiment Analysis</span>,  
          it classifies comments as <span className="text-green-600 font-semibold">Positive</span>, <span className="text-gray-800 font-semibold">Neutral</span>, or <span className="text-red-700 font-semibold">Negative</span>, 
          providing valuable insights for content creators, businesses, and researchers.
        </p>
        </div>
      
    </div>
  );
}
