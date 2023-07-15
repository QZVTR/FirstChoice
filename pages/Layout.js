import React, { useEffect, useState } from 'react';
import Navbar, { NavBarLoggedIn } from './Navbar';
import { auth } from '../firebase';
import styles from '../styles/Layout.module.css';
import Footer from './Footer';

export default function Layout({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className={styles.container}>
      <head>
        <title>First Choice Pro</title>
      </head>
      {user ? <NavBarLoggedIn /> : <Navbar />}
      <main>
      <div className={styles.content}>{children}</div> 
      </main>
      <Footer />
    </div>
  );
}
