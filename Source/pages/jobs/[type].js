import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import { auth, db } from '../../firebase';
import { v4 as uuidv4} from 'uuid';
import { collection, query, where, getDocs } from "firebase/firestore";
import styles from '../../styles/Homepage.module.css'
import Link from 'next/link';
import SearchBar from '../components/SearchBar';

export default function Type() {
  const [traders, setTraders] = useState([]);

  const extractJobTitle = () => {
    const url = window.location.href;
    const lastSlashIndex = url.lastIndexOf('/');
    const jobTitle = url.substring(lastSlashIndex + 1).replaceAll('%20', ' ')
    return jobTitle
  }

  const jobType = extractJobTitle()


  useEffect(() => {
    const fetchData = async () => {
      console.log('useEffect log '+ typeof(jobType))
      try {
        const tradersRef = collection(db, 'Traders');
        const querySnapshot = query(tradersRef, where('jobsAvail', 'array-contains', jobType));
        const querySnapshotData = await getDocs(querySnapshot);
        const tradersData = querySnapshotData.docs.map((doc) => doc.data());

        setTraders(tradersData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
}, [jobType]);


  if (typeof jobType === 'undefined') {
    // Query object is not populated yet, return loading or fallback content
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    )
    
  }

  if (!traders) {
    return (
      <Layout>
        <SearchBar />
        <h2>No traders available</h2>
      </Layout>
    )
  }


  return (
    <Layout>
      <SearchBar />
      <div>{jobType}</div>
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
    </Layout>
  )
}
