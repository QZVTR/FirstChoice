import React, { useRef} from 'react'
import Layout from './Layout'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../firebase';
export default function ResetPassword() {

  const emailRef = useRef();


  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  }

  const forgotPasswordHandler = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    if (email) forgotPassword(email).then(() => (emailRef.current.value = ""))
  }

  return (
    <Layout>
      <div>Reset password</div>
      <form onSubmit={forgotPasswordHandler}>
        <label htmlFor='emailReset'>Please enter your email:</label>
        <input placeholder='Enter email:' name='emailReset' ref={emailRef}/>
        <input type='submit' value='Submit'/>
      </form>
    </Layout>
  )
}
