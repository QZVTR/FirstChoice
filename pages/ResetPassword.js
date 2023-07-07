import React, { useRef, useState} from 'react'
import Layout from './Layout'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../firebase';
import { useRouter } from 'next/router';
export default function ResetPassword() {

  const emailRef = useRef();

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);

  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  }

  const forgotPasswordHandler = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    if (email) forgotPassword(email)
    .then(() => {
      emailRef.current.value = ""
      router.push('/nav/Login')
    })
    .catch((error) => {
      setErrorMessage('Email not found')
    })
  }

  return (
    <Layout>
      <div>Reset password</div>
      <form onSubmit={forgotPasswordHandler}>
        <label htmlFor='emailReset'>Please enter your email:</label>
        <input placeholder='Enter email:' name='emailReset' ref={emailRef}/>
        {errorMessage ? <div style={{ color: 'red' }}>{errorMessage}</div> : null}
        <input type='submit' value='Submit'/>
      </form>
    </Layout>
  )
}
