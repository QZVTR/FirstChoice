import Link from 'next/link'
import React from 'react'
import styles from '../styles/Navbar.module.css'

export default function Navbar() {
  return (
    <ul className={styles.navbar}>
      <li className={styles.navItem}>
        <Link href='/'>
          <div className={styles.navLink}>Home</div>
        </Link>
      </li>
      <li className={styles.navItem}>
        <Link href='/nav/SignUp'>
          <div className={styles.navLink}>Sign up</div>
        </Link>
      </li>
      <li className={styles.navItem}>
        <Link href='/nav/Login'>
          <div className={styles.navLink}>Login</div>
        </Link>
      </li>
    </ul>
  )
}


export function NavBarLoggedIn() {
  return ( 
    <ul className={styles.navbar}>
      <li className={styles.navItem}>
        <Link href='/'>
          <div className={styles.navLink}>Home</div>
        </Link>
      </li>
      <li className={styles.navItem}>
        <Link href='/nav/Logout'>
          <div className={styles.navLink}>Logout</div>
        </Link>
      </li>
      <li className={styles.navItem}>
        <Link href='/nav/Profile'>
          <img src='/media/profile.jpg' alt='Settings' className={styles.profileImage} />
        </Link>
      </li>
    </ul>
  )
}
