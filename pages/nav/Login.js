import React, { useState, useRef } from 'react'
import Layout from '../Layout'
import { auth, db } from '../../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '../../styles/Login.module.css'

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
            <div className={styles.loginContainer}>
                <div className={styles.loginCenter}>
                <h2 className={styles.title}>Login</h2>
                <img className={styles.logoLogin} src='/media/FirstChoiceLogo2.png' alt='First Choice Logo' />
                    <form onSubmit={handleSubmit}>
                        <input className={styles.emailLoginMan} name='email' autoFocus ref={emailRef} placeholder='Enter email:'/>
                        <input className={styles.passwordLoginMan} name='password' autoFocus type='password' ref={PasswordRef} placeholder='Enter Password'/>
                        <input className={styles.submitLoginMan} type='submit' value='Submit'/>
                    </form>
                    <div className={styles.forgotPass}>
                        <Link href='/ResetPassword'>
                            Forgot password?
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
