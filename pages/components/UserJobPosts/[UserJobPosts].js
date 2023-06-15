import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import { useRouter } from 'next/router'
import { auth, db } from '../../../firebase';
import { query, collection, where, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

export default function UserJobPosts() {

  const router = useRouter()
  const { UserJobPosts } = router.query;
  const email = UserJobPosts;

  const user = auth.currentUser;

  const [userJobsArr, setUserJobsArr] = useState([]);
  const [selectedJobs, setSelectedJobs] = useState([]);

  useEffect(() => {
    const getJobs = async () => {
      try {
        const q = query(collection(db, 'Customers'), where('email', '==', email));
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data();
          const activeJobs = docData.activeJobPosts || [];
          setUserJobsArr(activeJobs);
          console.log('Active Quotes:', activeJobs);
        } else {
          console.log('User document not found!');
        }
      } catch (error) {
        console.error('Error getting quotes:', error);
      }
    };
  
    if (user) {
      getJobs();
    }
  }, [user]);

  const handleCheckboxChange = (e, jobId) => {
    if (e.target.checked) {
      setSelectedJobs((prevSelectedJobs) => [...prevSelectedJobs, jobId]);
    } else {
      setSelectedJobs((prevSelectedJobs) =>
        prevSelectedJobs.filter((id) => id !== jobId)
      );
    }
  };
  
  const handleRemoveJobs = async () => {
    try {
      const q = query(collection(db, 'Customers'), where('email', '==', email));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        const docData = querySnapshot.docs[0].data();
        const { activeJobPosts } = docData;
  
        const updatedJobs = activeJobPosts.filter(
          (job) => !selectedJobs.includes(job.jobId)
        );
  
        await updateDoc(docRef, { activeJobPosts: updatedJobs });
        console.log('Selected quotes removed successfully!');
        // Refresh the quotes array or perform any other necessary actions after successful removal
        for (const job of selectedJobs) {
          await deleteDoc(doc(db, 'JobPosts', job.jobId));
          console.log(`Job post with ID ${job.jobId} deleted from JobPosts collection`);
        }
      } else {
        console.log('User document not found!');
      }
    } catch (error) {
      console.error('Error removing quotes:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    handleRemoveJobs()
  }


  return (
    <Layout>
      {userJobsArr.length !== 0 ? 
      <>
      <h3>Your active job posts:</h3>
      <div>
        {userJobsArr.map((job) => (
          <div key={job.jobId}>
            <div>Job Title: {job.jobTitle}</div>
            <div>Your email: {email}</div>
            <div>Details about your job: {job.jobDetails}</div>
            <div>Job urgency: {job.jobTimeframe}</div>
            <div>Your property status: {job.jobPropertyAuthStatus}.</div>
            <div>Your budget for this job: {job.jobBudget}</div>
            <form>
              <label htmlFor='Remove job'>Remove: </label>
              <input 
              type='checkbox'
              name='Remove job'
              checked={selectedJobs.includes(job.jobId)}
              onChange={(e) => handleCheckboxChange(e, job.jobId)}
              />
            </form>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
      <input type='submit' value='Remove Selected Quotes' />
      </form> 
      </>
      : <div>You have no active quotes</div>}
    </Layout>
  )
}
