import React from 'react'
import LoginForm from '../components/LoginForm'

export default function Login ({Loggedin, setLogin}){
  return (
    <div className="flex items-center justify-center mt-20"><LoginForm  Loggedin={Loggedin} setLogin={setLogin}/></div>
  );
}
