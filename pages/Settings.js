import React from 'react'
import Layout from './Layout'
import Link from 'next/link'
import { auth } from '../firebase'
export default function Settings() {
  const user = auth.currentUser;
  return (
    <Layout>
        <ul>
            <li>
                <Link href='/ResetPassword'>
                    <div>Change password</div>
                </Link>
            </li>
            <li>
                <Link href='/settings/ContactUs'>
                    <div>Contact Us</div>
                </Link>
            </li>
            <li>
                <Link href='/settings/FAQ'>
                    <div>FAQs</div>
                </Link>
            </li>
            <li>
                <Link href={`/settings/DeleteAccount?u=${encodeURIComponent(user.email)}`}>
                    <div>Delete account</div>
                </Link>
            </li>
        </ul>
    </Layout>
  )
}
