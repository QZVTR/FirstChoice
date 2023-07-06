import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import { auth, db } from '../../firebase';
import { v4 as uuidv4} from 'uuid';
import { collection, query, where, getDocs } from "firebase/firestore";
import styles from '../../styles/Homepage.module.css'
import Link from 'next/link';
import SearchBar from '../components/SearchBar';
import { useRouter } from 'next/router';
import { StarRatingDisplayArr } from '../components/SpecificReviews';
import stylesBackground from '../../styles/SearchBarBackground.module.css'


export default function Type() {
  const [traders, setTraders] = useState([]);
  const router = useRouter();
  const { type, loc } = (router.query);
  const jobType = type ?  type.replaceAll('%20', ' ') : null;
  
  useEffect(() => {
    const fetchData = async () => {
      console.log('useEffect log '+ typeof(jobType))
      try {
        const tradersRef = collection(db, 'Traders');
        const querySnapshot = query(tradersRef, where('jobsAvail', 'array-contains', jobType), where('workingLocation', '==', loc));
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
        <div className={stylesBackground.container}>
        <img className={stylesBackground.background} src='/media/backgroundphotoforsearch.jpg' alt='background photo' />
        <SearchBar />
        </div>
        <h2>No traders available</h2>
      </Layout>
    )
  }


  return (
    <Layout>
      <div className={stylesBackground.container}>
      <img className={stylesBackground.background} src='/media/backgroundphotoforsearch.jpg' alt='background photo' />
      <SearchBar />
      </div>
      <div>{jobType}</div>
      <div>{loc}</div>
      <div className={styles.grid}>
      {traders.map((trader) => (
        <div key={trader.id} className={styles.item}>
          <Link href={`/users/${trader.id}`}>
            <h3 className={styles.title}>{trader.firstName} {trader.secondName}</h3>
            <h4 className={styles.subtitle}>{trader.companyName}</h4>
            <p className={styles.description}>{trader.bio}</p>
            <StarRatingDisplayArr ratings={trader.starRating}/>
          </Link>
        </div>
      ))}
    </div>
    </Layout>
  )
}



