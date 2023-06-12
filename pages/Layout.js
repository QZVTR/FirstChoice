import React from 'react';
import Navbar, { NavBarLoggedIn } from './Navbar';
import { auth } from '../firebase';
import styles from '../styles/Layout.module.css';

export default function Layout({ children }) {
  const user = auth.currentUser;

  return (
    <div className={styles.container}>
      {user ? <NavBarLoggedIn /> : <Navbar />}
      <div className={styles.content}>{children}</div>
    </div>
  );
}
