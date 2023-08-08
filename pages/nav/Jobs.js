import React, { useEffect, useState, useRef } from 'react';
import Layout from '../Layout';
import { auth, db } from '../../firebase';
import Link from 'next/link';
import { query, collection, where, getDocs } from 'firebase/firestore';
import styles from '../../styles/Jobs.module.css';

export default function Jobs() {
  const user = auth.currentUser;
  const [userType, setUserType] = useState(null);
  const [userDataArr, setUserDataArr] = useState([]);
  const [jobPosts, setJobPosts] = useState([]);
  const [locationFilter, setLocationFilter] = useState(''); // Step 1: State for location filter
  const [errorMessage, setErrorMessage] = useState()
  const getFirstSentence = (desc) => {
    const firstPeriodIndex = desc.indexOf('.');
    if (firstPeriodIndex !== -1) {
      return desc.slice(0, firstPeriodIndex + 1).trim() + '..';
    }
    return desc;
  };

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
        console.log('useEffect ' + userData);
        // You can set the user data to state variables or perform other actions
        setUserDataArr(userData);
        if (userData && userData.email.toLowerCase() === user.email.toLowerCase()) {
          setUserType('Customer');
          console.log(userDataArr);
        } else {
          setUserType('Trader');
        }
      }
    };

    if (user) {
      getUserDataCust();
    }
  }, [user]);

  useEffect(() => {
    const getJobPosts = async () => {
      try {
        let q = collection(db, 'JobPosts');

        // Step 3: Apply location filter if it is set
        if (locationFilter !== '' && locationFilter !== 'All') {
          q = query(q, where('jobLocation', '==', locationFilter));
        } else if (locationFilter !== '' && locationFilter === 'All') {
          q = query(q);
        }

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const jobPostsData = querySnapshot.docs.map((doc) => doc.data());
          setJobPosts(jobPostsData);
        } else if (querySnapshot.empty) {
          setJobPosts([])
          setErrorMessage("There are no jobs available in this location")
        }
      } catch (error) {
        console.error('Error getting job posts:', error);
      }
    };

    getJobPosts();
  }, [locationFilter]);

  return (
    <Layout>
      {userType === 'Customer' ? (
        <Link href={`/JobPage?s=${encodeURIComponent(user.email)}`}>
          Create a job post <img alt='Create a job post' src='/media/CreatePost.png' style={{ height: 30, width: 30 }} />
        </Link>
      ) : (
        <div>You must be logged into a Customer account to create a job post</div>
      )}

      {jobPosts ? <h4>Current Jobs: </h4> : <div>There are no current job posts</div>}
      <div>
        {/* Step 2: Pass the callback function to the Filter component */}
        <Filter onLocationFilterChange={setLocationFilter} />
        <div className={styles.grid}>
          {jobPosts.length > 0 ? (
            jobPosts.map((job) => (
            <div key={job.jobId} className={styles.item}>
              <Link
                href={`/specificjobpage/${encodeURIComponent(job.jobId)}?jTi=${encodeURIComponent(
                  job.jobTitle
                )}&jB=${encodeURIComponent(job.jobBudget)}&jTT=${job.jobTraderType}&jD=${encodeURIComponent(
                  job.jobDetails
                )}&pAuth=${encodeURIComponent(job.jobPropertyAuthStatus)}&jTF=${encodeURIComponent(
                  job.jobTimeframe
                )}&jOM=${encodeURIComponent(job.jobOwnerEmail)}`}
              >
                <div key={job.jobId}>
                  <div className={styles.title}>Title: {job.jobTitle}</div>
                  <div className={styles.subtitle}>Budget: {job.jobBudget}</div>
                  <div className={styles.subtitle}>I am looking for a: {job.jobTraderType}</div>
                  <div className={styles.description}>Details of the job: {getFirstSentence(job.jobDetails)}</div>
                </div>
              </Link>
            </div>
          ))) : (
            <h3 className={styles.errorMessageNoJobs}>{errorMessage}</h3>
          )}
        </div>
      </div>
      <br />
    </Layout>
  );
}

const Filter = ({ onLocationFilterChange }) => {
  const locationFilter = useRef();

  // Step 4: Add an event listener to call the callback function on location change
  const handleFilterChange = () => {
    onLocationFilterChange(locationFilter.current.value);
  };

  return (
    <>
      <label htmlFor='filterLocation'>Filter by Location</label>
      <select defaultValue='Choose here' name='filterLocation' ref={locationFilter} onChange={handleFilterChange}>
        <option value='Choose here' disabled hidden>
          Choose here
        </option>
        <option value='All'>All Areas</option>
        <option value='Adamsdown'>Adamsdown</option>
        <option value='Butetown'>Butetown</option>
        <option value='Caerau, Cardiff'>Caerau, Cardiff</option>
        <option value='Canton, Cardiff'>Canton, Cardiff</option>
        <option value='Castle, Cardiff'>Castle, Cardiff</option>
        <option value='Cathays'>Cathays</option>
        <option value='Cyncoed'>Cyncoed</option>
        <option value='Ely, Cardiff'>Ely, Cardiff</option> 
        <option value='Fairwater, Cardiff'>Fairwater, Cardiff</option>
        <option value='Gabalfa'>Gabalfa</option>
        <option value='Grangetown, Cardiff'>Grangetown, Cardiff</option>
        <option value='Heath, Cardiff'>Heath, Cardiff</option>
        <option value='Lisvane'>Lisvane</option>
        <option value='Llandaff'>Llandaff</option>
        <option value='Llandaff North'>Llandaff North</option>
        <option value='Llanedeyrn'>Llanedeyrn</option>
        <option value='Llanishen'>Llanishen</option>
        <option value='Llanrumney'>Llanrumney</option>
        <option value='Old St Mellons'>Old St Mellons</option>
        <option value='Pentwyn, Cardiff'>Pentwyn, Cardiff</option>
        <option value='Pentyrch'>Pentyrch</option>
        <option value='Penylan'>Penylan</option>
        <option value='Pontcanna'>Pontcanna</option>
        <option value='Pontprennau'>Pontprennau</option>
        <option value='Radyr and Morganstown'>Radyr and Morganstown</option>
        <option value='Rhiwbina'>Rhiwbina</option>
        <option value='Riverside, Cardiff'>Riverside, Cardiff</option>
        <option value='Roath'>Roath</option>
        <option value='Rumney, Cardiff'>Rumney, Cardiff</option>
        <option value='Splott'>Splott</option>
        <option value='St Fagans'>St Fagans</option>
        <option value='Thornhill, Cardiff'>Thornhill, Cardiff</option>
        <option value='Tongwynlais'>Tongwynlais</option>
        <option value='Tremorfa'>Tremorfa</option>
        <option value='Trowbridge, Cardiff'>Trowbridge, Cardiff</option>
        <option value='Whitchurch, Cardiff'>Whitchurch, Cardiff</option>
      </select>
    </>
  );
};
