import React, { useState, useRef } from 'react'
import Layout from '../Layout'
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid'
import styles from '../../styles/Signup.module.css'

export default function SignUpCust() {
    
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const password2Ref = useRef(null);
    const router = useRouter();
    const [signedUp, setSignedUp] = useState(false);
    const [paymentCompleted, setPaymentCompleted] = useState(false);


    const signUp = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            //Signed in
            const user = userCredential.user;
            console.log(user)
            addEmail()
            alert("Account created")
            setSignedUp(true)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode + errorMessage)
        });
    }


    const addEmail = async () => {
        let ref = collection(db, 'Traders');

        const docRef = await addDoc(
            ref, {
                id: uuidv4(),
                firstName:'',
                secondName:'',
                email:emailRef.current.value,
                phone:null,
                companyName: '',
                bio: '',
                starRating: [],
                prevWorkUrls: [],
                workingLocation: ''
            }
        ).then(() => {
            //router.push('https://buy.stripe.com/test_bIY02jgCy5ut8Ba8wx')
        })
        .catch((err) => {
            console.error(err)
        })
    }



    const handleSubmit = e => {
        e.preventDefault();
        if (passwordRef.current.value === password2Ref.current.value) {
            signUp(emailRef.current.value, passwordRef.current.value)
        }
    }

    if (signedUp) {
        router.push('/')
    }


    return (
        <Layout>
            <div className={styles.signUpContainer}>
                <div className={styles.center}>
                <h1>Trader sign up</h1>
                <img className={styles.logoSignUp} src='/media/FirstChoiceLogo2.png' alt='First Choice Logo' />
                <form onSubmit={handleSubmit}>
                    <input className={styles.emailSignUp} name='emailManual' ref={emailRef} autoFocus placeholder='Enter email:'/>
                    <input className={styles.passwordSignUp} name='password' ref={passwordRef} autoFocus type='password'  placeholder='Enter Password'/>
                    <input className={styles.password2SignUp} name='password2' ref={password2Ref} autoFocus type='password'  placeholder='Re-enter Password'/>
                    <input className={styles.signUpSubmit} type='submit' value='Submit'/>
                </form>
                </div>
            </div>
        </Layout>
  )
}
