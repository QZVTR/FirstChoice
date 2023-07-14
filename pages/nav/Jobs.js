import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import { auth, db } from '../../firebase'
import Link from 'next/link';
import { query, collection, where, getDocs } from 'firebase/firestore';
import styles from '../../styles/Jobs.module.css'

export default function Jobs() {

  const user = auth.currentUser
  const [userType, setUserType] = useState(null);
  const [userDataArr, setUserDataArr] = useState([]);
  const [jobPosts, setJobPosts] = useState([]);

  const getFirstSentence = (desc) => {
    const firstPeriodIndex = desc.indexOf('.');
    if (firstPeriodIndex !== -1) {
      return desc.slice(0, firstPeriodIndex + 1).trim() + "..";
    }
    return desc;
  }

  

  useEffect(() => {
    const getUserDataCust = async () => {
      const q = query(collection(db, 'Customers'), where('email', '==', user.email.toLowerCase()));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return
      }

      if (!querySnapshot.empty) {
        // Assuming there is only one document matching the email
        const userData = querySnapshot.docs[0].data();
        console.log('useEffect ' + userData);
        // You can set the user data to state variables or perform other actions
        setUserDataArr(userData)
        if (userData && userData.email.toLowerCase() === user.email.toLowerCase()) {
          setUserType('Customer')
          console.log(userDataArr)
        } else {
          setUserType('Trader')
        }

        
      }
    };

      if (user) {
        getUserDataCust();
      }
  },[user])

  useEffect(() => {
    const getJobPosts = async () => {
      try {
        const q = query(collection(db, 'JobPosts'));
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
          const jobPostsData = querySnapshot.docs.map((doc) => doc.data());
          setJobPosts(jobPostsData);
        } 
      } catch (error) {
        console.error('Error getting job posts:', error);
      }
    }

    getJobPosts();

  },[])

  

  return (
    <Layout>
      {userType === 'Customer' ? 
        <Link href={`/JobPage?s=${encodeURIComponent(user.email)}`}>
          Create a job post <img alt='Create a job post' src='/media/CreatePost.png' style={{height: 30, width: 30}} />
        </Link>
        :
        <div>You must be logged into a Customer account to create a job post</div>
      }
      
      {jobPosts ? <h4>Current Jobs: </h4> : <div>There are no current job posts</div>}
      <div>
        <div className={styles.grid}>
        {jobPosts?.map((job) => (
          
            <div key={job.jobId} className={styles.item}>
              <Link href={`/specificjobpage/${encodeURIComponent(job.jobId)}?jTi=${encodeURIComponent(job.jobTitle)}&jB=${encodeURIComponent(job.jobBudget)}&jTT=${job.jobTraderType}&jD=${encodeURIComponent(job.jobDetails)}&pAuth=${encodeURIComponent(job.jobPropertyAuthStatus)}&jTF=${encodeURIComponent(job.jobTimeframe)}&jOM=${encodeURIComponent(job.jobOwnerEmail)}`}>
              <div key={job.jobId}>
                <div className={styles.title}>Title: {job.jobTitle}</div>
                <div className={styles.subtitle}>Budget: {job.jobBudget}</div>
                <div className={styles.subtitle}>I am looking for a: {job.jobTraderType}</div>
                <div className={styles.description}>Details of the job: {getFirstSentence(job.jobDetails)}</div>
              </div>
              </Link>
          </div>
          
        ))}
        </div>
      </div>
      <br />

    </Layout>
  )
}
