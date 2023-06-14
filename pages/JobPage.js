import React, { useState, useRef} from 'react'
import Layout from './Layout'
import { auth, db } from '../firebase'
import { query, collection, where, getDocs, updateDoc, addDoc, Timestamp } from 'firebase/firestore';
import { uuid } from 'uuidv4';
import { useRouter } from 'next/router';

export default function JobPage() {

    const router = useRouter();

    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);

    const email = searchParams.get('s')

    const user = auth.currentUser

    const jobTitleRef = useRef(null);
    const jobDetailsRef = useRef(null);
    const jobTimeframeRef = useRef(null);
    const jobPropertyAuthStatusRef = useRef(null);
    const jobBudgetRef = useRef(null);
    const jobTraderTypeRef = useRef(null);

    const [errorMessage, setErrorMessage] = useState("");

    if (!user) {
        return (
          <Layout>
            <h2>You must be logged into a customer account to create a job post</h2>
          </Layout>
        )
    }

    const updateUserDoc = async () => {
        try {
          const jobId = uuid();
      
          const q = query(collection(db, 'Customers'), where('email', '==', email));
          const querySnapshot = await getDocs(q);
      
          if (!querySnapshot.empty) {
            const docRef = querySnapshot.docs[0].ref;
            const currentData = querySnapshot.docs[0].data();
            let currentArray = currentData.activeJobPosts || [];
      
            const newObject = {
              jobId: jobId,
              jobTraderType: jobTraderTypeRef.current.value,
              jobDetails: jobDetailsRef.current.value,
              jobTimeframe: jobTimeframeRef.current.value,
              jobTitle: jobTitleRef.current.value,
              jobPropertyAuthStatus: jobPropertyAuthStatusRef.current.value,
              jobBudget: jobBudgetRef.current.value,
              jobTimestamp: Timestamp.now()
            };
      
            currentArray.push(newObject)
            await updateDoc(docRef, { activeJobPosts: currentArray });
            console.log('Document successfully updated!');
          } else {
            console.log('Document not found!');
          }
        } catch (error) {
          console.error('Error updating document: ', error);
        }
    };
        
      

    const addJob = async () => {
        try {
            const jobData = {
                jobId: uuid(),
                jobOwnerEmail: email,
                jobTitle: jobTitleRef.current.value,
                jobTraderType: jobTraderTypeRef.current.value,
                jobDetails: jobDetailsRef.current.value,
                jobTimeframe: jobTimeframeRef.current.value,
                jobPropertyAuthStatus: jobPropertyAuthStatusRef.current.value,
                jobBudget: jobBudgetRef.current.value,
            };
            const docRef = await addDoc(collection(db, 'JobPosts'), jobData);
            console.log('Job added with ID: ', docRef.id);

        } catch (error) {
            console.error(error)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!jobDetailsRef.current.value || !jobTitleRef.current.value || jobTraderTypeRef.current.value === 'Choose here' || jobTimeframeRef.current.value === "Choose here" || jobBudgetRef.current.value === 'Choose here' || jobPropertyAuthStatusRef.current.value === "Choose here") {
            setErrorMessage('Please enter all fields')
        } else {
            updateUserDoc();
            addJob();
            router.push('/nav/Jobs')
        }

    }
      
    return (
        <Layout>
            <h2>Write your job post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                <label htmlFor='jobTitle' >Title your job: </label>
                <input name='jobTitle' placeholder='Enter here:' ref={jobTitleRef} />
                </div>
                <div>
                    <label htmlFor='TradeType'>What type of trade are you looking for?</label>
                    <select defaultValue='Choose here' name='TradeType' ref={jobTraderTypeRef}>
                        <option defaultValue='Choose here' disabled hidden>Choose here</option>
                        <option value='Not sure'>Not sure</option>
                        <option value='electrician'>Electrician</option>
                        <option value='plumber'>Plumber</option>
                        <option value='bathroom fitter'>Bathroom Fitter</option>
                        <option value='cleaner'>Cleaner</option>
                        <option value='builder'>Builder</option>
                        <option value='roofer'>Roofer</option>
                        <option value='locksmith'>Locksmith</option>
                    </select>
                </div>
                <div>
                <label htmlFor='jobDescription' >Tell us about the job you need doing? </label>
                <input ref={jobDetailsRef} name='jobDescription' placeholder='Enter here:' />
                </div>
                <div>
                <label htmlFor='jobTimeFrame'>When do you need the job done? </label>
                <select defaultValue='Choose here' name='jobTimeFrame' ref={jobTimeframeRef}>
                    <option value='Choose here' disabled hidden>Choose here</option>
                    <option value='In Twenty Four Hours'>In 24 hours</option>
                    <option value='Two to Three Days'>2-3 days</option>
                    <option value='Five to Seven Days'>5-7 days</option>
                    <option value='Within two weeks'>Within 2 weeks</option>
                    <option value='Within a month'>Within a month</option>
                    <option value='1 month+'>1 month+</option>
                    <option value='Flexible start date' >Flexible start date</option>
                </select>
                </div>
                <div>
                <label htmlFor='propertyAuthStatus' >Are you authorised to make changes to the property? </label>
                <select defaultValue='Choose here' name='propertyAuthStatus' ref={jobPropertyAuthStatusRef}>
                    <option value='Choose here' disabled hidden >Choose here</option>
                    <option value='Client owns and lives at the property'>I own and live at this property</option>
                    <option value='Client is the landlord'>I am the landlord</option>
                    <option value='Client rents but is authorised to make changes to the property'>I rent this property but I am authorised to make changes</option>
                </select>
                </div>
                <div>
                <label>What is your budget for this job? (Don't worry you are not commiting to this price) </label>
                <select defaultValue='Choose here' name='jobBudget' ref={jobBudgetRef}>
                    <option value='Choose here' disabled hidden>Choose here</option>
                    <option value='Not sure'>Not sure</option>
                    <option value='Under £200'>Under £200</option>
                    <option value='Under £500'>Under £500</option>
                    <option value='Under £1,000'>Under £1,000</option>
                    <option value='Under £2,000'>Under £2,000</option>
                    <option value='Under £5,000'>Under £5,000</option>
                    <option value='Over £5,000'>Over £5,000</option>
                </select>
                </div>
                <div>
                    <input type='submit' value='submit'/>
                </div>
            </form>
            <div>
                {errorMessage ? <div>{errorMessage}</div> : null}
            </div>
        </Layout>
  )
}
