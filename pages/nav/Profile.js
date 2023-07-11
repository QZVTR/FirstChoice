import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import Layout from '../Layout';
import Link from 'next/link';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuidv4';
import styles from '../../styles/Profile.module.css';

export default function Profile() {
  const user = auth.currentUser;
  console.log(user);
  const [userData, setUserData] = useState({
    fName: '',
    sName: '',
    phone: '',
    email: '',
    companyName: '',
    bio: '',
    jobsAvail: [],
    userType: '',
    imageUrl: '',
    prevWorkUrl: [],
    workLocation: '',
  });

  function capitalizeWords(str) {
    const words = str.split(' ');

    const capitalizedWords = words.map((word) => {
      const firstLetter = word.charAt(0).toUpperCase();
      const restOfWord = word.slice(1);
      return `${firstLetter}${restOfWord}`;
    });

    return capitalizedWords.join(' ');
  }

  useEffect(() => {
    const getUserDataCust = async () => {
      const q = query(collection(db, 'Customers'), where('email', '==', user.email.toLowerCase()));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return;
      }

      if (!querySnapshot.empty) {
        // Assuming there is only one document matching the email
        const userData = querySnapshot.docs[0].data();
        console.log(userData);
        // You can set the user data to state variables or perform other actions
        setUserData((prevUserData) => ({
          ...prevUserData,
          fName: userData.firstName,
          sName: userData.secondName,
          phone: userData.phone,
          email: userData.email,
          imageUrl: userData.profileImageUrl,
          userType: 'Customer',
        }));
      }
    };

    if (user) {
      getUserDataCust();
    }
  }, [user]);

  useEffect(() => {
    const getUserDataTrader = async () => {
      const q = query(collection(db, 'Traders'), where('email', '==', user.email.toLowerCase()));
      const querySnapshot = await getDocs(q);
      console.log(user.email);
      if (querySnapshot.empty) {
        return;
      }

      if (!querySnapshot.empty) {
        // Assuming there is only one document matching the email
        const userData = querySnapshot.docs[0].data();
        console.log(userData);
        // You can set the user data to state variables or perform other actions
        setUserData((prevUserData) => ({
          ...prevUserData,
          fName: userData.firstName,
          sName: userData.secondName,
          phone: userData.phone,
          companyName: userData.companyName,
          bio: userData.bio,
          email: userData.email,
          jobsAvail: userData.jobsAvail,
          imageUrl: userData.profileImageUrl,
          prevWorkUrl: userData.prevWorkUrls,
          userType: 'Trader',
          workLocation: userData.workingLocation
        }));
      }
    };

    if (user) {
      getUserDataTrader();
    }
  }, [user]);

  console.log(userData.jobsAvail);
  return (
    <Layout>
      <div className={styles.container}>
        <h2>Profile</h2>
        <div className={styles.box}>
        
        <Link href="/Settings">
          <img src='/media/settings.svg' alt='settings' height="30" width="30" />
        </Link>
        <Link href="/components/EditProfile">
          <img src="/media/EditProfile.jpg" alt="Edit Profile" height="30" width="30" />
        </Link>
        {userData.userType === 'Trader' ? (
          <div>
            <Link href={`/components/UserQuotes/${encodeURIComponent(userData.email)}`}>
              View your requested quotes
            </Link>
          </div>
        ) : null}
        {userData.userType === 'Customer' ? (
          <div>
            <Link href={`/components/UserJobPosts/${encodeURIComponent(userData.email)}`}>
              View your active job posts
            </Link>
          </div>
        ) : null}
        </div>
        
        
        <br />
        <div>
          <div>Name: {userData.fName} {userData.sName}</div>
          <div>
            {userData.imageUrl ? (
              <img src={userData.imageUrl} alt="Profile pic" style={{ height: 50, width: 50 }} />
            ) : null}
          </div>
          <div>Email: {userData.email}</div>
          <div>Phone number: {userData.phone}</div>
          {userData.companyName ? <div>Company name: {userData.companyName}</div> : null}
          {userData.bio ? <div>About: {userData.bio}</div> : null}
          {userData.workLocation ? <div>We work in: {userData.workLocation}</div> : null}
          {userData.userType === 'Trader' ? <h4>Services we offer: </h4> : null}
          {userData.jobsAvail ? (
            <>
              <div>
                {userData.jobsAvail.map((job, index) => (
                  <div key={index}>{capitalizeWords(job)}</div>
                ))}
              </div>
            </>
          ) : null}
          {userData.userType === 'Trader' ? (
            <>
              <h4>Images of your previous work:</h4>
              <div>
                {userData.prevWorkUrl.map((url, index) => (
                  <img key={index} src={url} alt={`Previous work ${index}`} style={{ height: 100, width: 100 }} />
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </Layout>
  );
}
