import React, { useState, useRef } from 'react'
import Layout from '../Layout'
import { auth, db } from '../../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/router'
export default function Login() {
    const [signedIn, setSignedIn] = useState(false);

    const emailRef = useRef()
    const PasswordRef = useRef()
    const router = useRouter();

    const SignInManual = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredentail) => {
            const user = userCredentail.user;
            console.log(user);
            setSignedIn(true);
            router.push('/')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode + errorMessage);
        })
    }


    const handleSubmit = e => {
        e.preventDefault();
        SignInManual(emailRef.current.value, PasswordRef.current.value)
    }

    return (
        <Layout>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                    <input className='emailLoginMan' name='email' autoFocus ref={emailRef} placeholder='Enter email:'/>
                    <input className='passwordLoginMan' name='password' autoFocus type='password' ref={PasswordRef} placeholder='Enter Password'/>
                    <input className='submitLoginMan' type='submit' value='Submit'/>
            </form>
        </Layout>
    )
}
