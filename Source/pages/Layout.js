import React from 'react'
import Navbar, { NavBarLoggedIn } from './Navbar'
import { auth } from '../firebase'
export default function Layout({ children }) {

  const user = auth.currentUser;

  return (
    <div>
    {user ? <NavBarLoggedIn /> : <Navbar /> }
    <br/>
    {children}
  </div>
  )
}
