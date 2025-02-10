import React from 'react'
import SignupForm from '../components/SignupForm'
export default function Signup({Signedup, setSignup}){
  return (
    <SignupForm Signedup={Signedup} setSignup={setSignup}/>
  )
}
