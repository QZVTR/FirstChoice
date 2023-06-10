import React, { useState, useEffect} from 'react'
import { auth, db } from '../firebase'
import { v4 as uuidv4 } from 'uuid'
import { collection, getDocs } from "firebase/firestore";
import styles from '../styles/Homepage.module.css'
import Link from 'next/link';
export default function HomePage() {
  const [traders, setTraders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tradersRef = collection(db, 'Traders');
        const querySnapshot = await getDocs(tradersRef);
        const tradersData = querySnapshot.docs.map((doc) => doc.data());
        setTraders(tradersData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className={styles.grid}>
      {traders.map((trader) => (
        <div key={uuidv4()} className={styles.item}>
          <Link href={`/users/${trader.id}`}>
            <h3 className={styles.title}>{trader.firstName} {trader.secondName}</h3>
            <h4 className={styles.subtitle}>{trader.companyName}</h4>
            <p className={styles.description}>{trader.bio}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
