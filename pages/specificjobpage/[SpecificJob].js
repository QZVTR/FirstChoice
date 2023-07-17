import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import { useRouter } from 'next/router';
import { db } from '../../firebase';
import { getDocs, where, collection, query } from 'firebase/firestore';
import styles from '../../styles/SpecificJobPage.module.css'
import Image from 'next/image';

export default function SpecificJob() {
  const [jIUl, setjIUL] = useState(null);
  const router = useRouter();
  const { jTi, jB, jTT, jD, pAuth, jTF, jOM } = router.query; // Update this line
  console.log(jTi)

  useEffect(() => {
    const getJobImage = async () => {
        const { jTi } = router.query
        try {
            if (!jTi) {
            // If jTi is not available, do not proceed with the query
            return;
            }

            const q = query(collection(db, 'JobPosts'), where('jobTitle', '==', jTi));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
            // If the query result is empty, the jobId doesn't match any document
            return;
            }

            const userData = querySnapshot.docs[0].data();
            setjIUL(userData.jobImageUrl);
        } catch (error) {
            console.error('Error fetching job image:', error);
        }
    };

    // Call the getJobImage function only if jTi is available and not undefined
    
    getJobImage();
    
  }, [jTi]); // Run the effect whenever jTi changes

  return (
    <Layout>
      <div>
        <h2>
          <u>Job Title: {jTi}</u>
        </h2>
        <div>Budget: {jB}</div>
        <div>Job Timeframe: {jTF}</div>
        <div>Details: {jD}</div>
        <div>Authorization status: {pAuth}</div>
        <div>I am looking for a {jTT}.</div>
        <div>Contact me at: {jOM}</div>
        <div>
          {jIUl ? (
            <img src={jIUl} alt='Job Picture' className={styles.JobImage} />
          ) : (
            <div>No image available</div>
          )}
        </div>
      </div>
    </Layout>
  );
}
