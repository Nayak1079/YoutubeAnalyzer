import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function LoginForm({ Loggedin, setLogin }) {
  const [LoginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  function changeHandler(event) {
    setLoginInfo((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  async function submitHandler(event) {
    event.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(LoginInfo),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setLogin(true);
        navigate("/Home");
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      toast.error("Network error while logging in");
    }
  }

  return (
    <div className='flex flex-col items-center bg-white w-full sm:w-3/4 md:w-1/2 lg:w-1/3 max-w-lg mt-10 shadow-lg p-8'>
      <h1 className='text-2xl font-bold mb-6'>Login</h1>
      <form className='w-full flex flex-col' onSubmit={submitHandler}>
        <label>
          <p className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 py-2">
            Email Address
          </p>
          <input
            required
            type='email'
            name='email'
            value={LoginInfo.email}
            onChange={changeHandler}
            placeholder='Enter your Email Address'
            className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
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
            value={LoginInfo.password}
            onChange={changeHandler}
            placeholder='Enter Password'
            className='mt-1 mb-8 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
          />
        </label>

        <div className='flex flex-row justify-between mb-3 text-sm'>
          <div className='flex flex-row gap-1'>
            <p>New here?</p>
            <Link to="/Signup" className='text-blue-800'>Signup</Link>
          </div>
          <Link to="/Signup" className='text-blue-800'>Forgot password?</Link>
        </div>

        <button
          type='submit'
          className='bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400'
        >
          Login
        </button>
      </form>
    </div>
  );
}
