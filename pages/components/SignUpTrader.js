import React, { useState, useRef } from 'react'
import Layout from '../Layout'
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid'

export default function SignUpCust() {
    
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const password2Ref = useRef(null);
    const router = useRouter();
    const [signedUp, setSignedUp] = useState();

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
            }
        ).then(() => {
            router.push('/')
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


    return (
        <Layout>
                <div className='signUpContainer'>
                <div className='center'>
                <form onSubmit={handleSubmit}>
                    <input className='emailSignUp' name='emailManual' ref={emailRef} autoFocus placeholder='Enter email:'/>
                    <input className='passwordSignUp' name='password' ref={passwordRef} autoFocus type='password'  placeholder='Enter Password'/>
                    <input className='password2SignUp' name='password2' ref={password2Ref} autoFocus type='password'  placeholder='Re-enter Password'/>
                    <input className='signUpSubmit' type='submit' value='Submit'/>
                </form>
                </div>
            </div>
        </Layout>
  )
}
