import React from 'react';
import Link from 'next/link';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <div className={styles.container}>
    <ul className={styles.list}>
        <li className={styles.listItem}>
            <Link href='/settings/FAQ'>
                FAQs
            </Link>
        </li>
        <li className={styles.listItem}>
            <Link href='/settings/ContactUs'>
                Contact Us
            </Link>
        </li>
        <li className={styles.listItem}> 
            <Link href='/TermsAndConditions'>
                Terms and Conditions
            </Link>
        </li>
    </ul>
    </div>
  )
}
