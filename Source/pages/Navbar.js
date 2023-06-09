import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <>
      <ul>
      <li>
          <Link href='/'>
            <div>Home</div>
          </Link>
        </li>
        <li>
          <Link href='/nav/SignUp'>
            <div>Sign up</div>
          </Link>
        </li>
        <li>
          <Link href='/nav/Login'>
            <div>Login</div>
          </Link>
        </li>
      </ul>
    </>
  )
}


export function NavBarLoggedIn() {
  return ( 
    <>
      <ul>
      <li>
          <Link href='/'>
            <div>Home</div>
          </Link>
        </li>
        <li>
          <Link href='/nav/Logout'>
            <div>Logout</div>
          </Link>
        </li>
        <li>
          <Link href='/nav/Profile'>
            <img src='/media/profile.jpg' alt='Settings' width='30' height='30'/>
          </Link>
        </li>
      </ul>
    </>
  )
}
