import React from 'react'
import What from "../images/what.jpg"
import how from '../images/how.jpg'
import Footer from '../components/Footer'
export default function About() {
    return (
        <div>
            <div className='mt-16 bg-gray-200 h-auto  flex flex-col items-center justify-center pb-20'>
                <h1 className='text-4xl md:text-5xl  m-10 font-bold text-gray-800'>About Us</h1>
                <div className='flex flex-col bg-white m-5 ml-10 mr-10 p-10 items-center justify-center w-4/5 rounded-xl shadow-lg  hover:scale-105 transform transition duration-300'>
                    <h1 className='text-2xl mb-8 font-bold'>What we do ?? </h1>
                    <div className='flex flex-col md:flex-row gap-30 '>

                        <div>
                            <img src={What} className='w-200 '></img>
                        </div>
                        <div className='text-gray-700 p-0 md:p-10'>

                            At <span className='font-bold'>CommentAnaly</span>, we provide insightful <a href='https://www.geeksforgeeks.org/what-is-sentiment-analysis/' className='text-blue-500' target='blank'>sentiment analysis</a> for YouTube video comments. Our platform is designed to help users understand the overall emotional tone of the comments on any YouTube video. By leveraging advanced natural language processing techniques, we analyze the comments to categorize them into positive, negative, and neutral sentiments. With a clear, visual representation in the form of a pie chart, we offer users valuable insights into the general public’s reaction to a video. Whether you're a content creator, marketer, or viewer, CommentAnaly helps you gauge public sentiment and make data-driven decisions.

                        </div>
                    </div>
                </div>

                <div className='flex flex-col bg-white m-5 ml-10 mr-10 p-10 items-center justify-center w-4/5  rounded-xl shadow-lg hover:scale-105 transform transition duration-300'>
                    <h1 className='text-2xl mb-8 font-bold'>How we do ?? </h1>
                    <div className='flex flex-col md:flex-row gap-30 '>

                        <div>
                            <img src={how} className='w-200'></img>
                        </div>
                        <div className='text-gray-700 p-0 md:p-10'>
                            Our system uses the <a href='https://www.geeksforgeeks.org/python-sentiment-analysis-using-vader/' className='text-blue-500' target='blank'>VADER</a> Sentiment Analyzer, a proven and reliable tool for sentiment analysis, specifically optimized for social media text. The analysis is powered by Flask on the backend, handling secure user authentication and interaction with our PostgreSQL database. Users can easily sign up and log in to access the platform, where they can input any YouTube video URL to start the analysis. Once a video’s comments are processed, we display the results through intuitive graphs and detailed sentiment breakdowns. The entire process is streamlined for simplicity and efficiency, allowing users to access actionable insights with just a few clicks.

                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}
