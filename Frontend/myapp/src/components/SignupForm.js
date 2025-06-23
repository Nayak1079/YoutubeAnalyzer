import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

export default function SignupForm({ Signedup, setSignup }) {
  const [SignUpInfo, setSignupInfo] = useState({
    email: "",
    password: "",
    confirmpassword: ""
  });

  const navigate = useNavigate();

  function changeHandler(event) {
    setSignupInfo((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  }

  async function submitHandler(event) {
    event.preventDefault();

    if (SignUpInfo.password !== SignUpInfo.confirmpassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/Signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({
          email: SignUpInfo.email,
          password: SignUpInfo.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setSignup(true);
        navigate("/Login");
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      toast.error('Network error while signing up');
    }
  }

  return (
    <div className='flex flex-col items-center min-h-screen p-6'>
      <div className='flex flex-col items-center bg-white w-full sm:w-3/4 md:w-1/2 lg:w-1/3 max-w-lg mt-10 shadow-lg p-8'>
        <h2 className="text-2xl font-bold mb-6">Sign up</h2>

        <form onSubmit={submitHandler} className='w-full flex flex-col'>
          <label>
            <p className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 py-2">
              Email Address
            </p>
            <input
              required
              type='email'
              name='email'
              value={SignUpInfo.email}
              onChange={changeHandler}
              placeholder='Enter your Email Address'
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            />
          </label>

          <label>
            <p className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 py-2">
              Password
            </p>
            <input
              required
              type='password'
              name='password'
              value={SignUpInfo.password}
              onChange={changeHandler}
              placeholder='Enter Password'
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            />
          </label>

          <label>
            <p className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 py-2">
              Confirm Password
            </p>
            <input
              required
              type='password'
              name='confirmpassword'
              value={SignUpInfo.confirmpassword}
              onChange={changeHandler}
              placeholder='Confirm Password'
              className="mt-1 mb-8 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            />
          </label>

          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
