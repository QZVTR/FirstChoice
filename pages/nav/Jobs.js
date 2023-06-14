import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import { auth, db } from '../../firebase'
import Link from 'next/link';
import { query, collection, where, getDocs } from 'firebase/firestore';

export default function Jobs() {

  const user = auth.currentUser
  const [userType, setUserType] = useState(null);
  const [userDataArr, setUserDataArr] = useState([]);
  const [jobPosts, setJobPosts] = useState([]);
  

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
        <Link href={`/JobPage?s=${user.email}`}>
          Create a job post <img alt='Create a job post' src='/media/CreatePost.png' style={{height: 30, width: 30}} />
        </Link>
        :
        <div>You must be logged into a Customer account to create a job post</div>
      }
      
      {jobPosts ? <h4>Current Jobs: </h4> : <div>There are no current job posts</div>}
      <div>
        {jobPosts?.map((job) => (
          <div key={job.jobId}>
            <div>Title: {job.jobTitle}</div>
            <div>Budget: {job.jobBudget}</div>
            <div>I am looking for a: {job.jobTraderType}</div>
            <div>Details of the job: {job.jobDetails}</div>
            <div>Property authorisation: {job.jobPropertyAuthStatus}</div>
            <div>Urgency to complete job: {job.jobTimeframe}</div>
            <div>Please contact me at: {job.jobOwnerEmail}</div>
          </div>
        ))}
      </div>
      <br />

    </Layout>
  )
}
