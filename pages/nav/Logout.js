import React, { useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import Layout from '../Layout'
import { useRouter } from 'next/router'

export default function Logout() {
    
    const router = useRouter();

    const SignOut = () => {
        signOut(auth).then(() => {
            router.push('/')
        }).catch((error) => {
            alert(error)
        })
    }

    return (
        <Layout>
            <div>
                <h1>Sign out</h1>
                <p><i>Click the button below to sign out of the system</i></p>
                <br />
                <br />
                <br />
                <button className='signOut' onClick={SignOut}>Sign out</button>
            </div>
        </Layout>
    )
}
