import React, { useRef, useState, useEffect } from 'react'
import Layout from './Layout'
import { auth, db } from '../firebase'
import { uuid } from 'uuidv4';
import { query, collection, where, serverTimestamp, getDocs, updateDoc, FieldValue, Timestamp } from 'firebase/firestore';
import Link from 'next/link';

//We will alert the trader via email that they have a new quote request 
//It will create a current quote section on their page


//User can create a job post and it will be on their profile

export default function QuotePage() {

  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);

  const clientId = searchParams.get('clientId');
  const tradeId = searchParams.get('tradeId');

  const quoteDetailsRef = useRef();
  const quoteTimeframeRef = useRef();
  const quoteJobTitleRef = useRef();

  const [quoteSubmitError, setQuoteSubmitError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(quoteDetailsRef.current.value);
    console.log(quoteJobTitleRef.current.value);
    console.log(quoteTimeframeRef.current.value);
    
    if (!quoteDetailsRef.current.value || !quoteJobTitleRef.current.value || quoteTimeframeRef.current.value === "Choose here") {
      setQuoteSubmitError('Please enter all fields')
    } else {
      sendQuote()
    } 
  }


  const sendQuote = async () => {
    try {
      const quoteId = uuid();
  
      const q = query(collection(db, 'Traders'), where('id', '==', tradeId));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        const currentArray = querySnapshot.docs[0].data().activeQuotes;
  
        const newObject = {
          quoteId: quoteId,
          clientEmail: clientId,
          quoteDetails: quoteDetailsRef.current.value,
          quoteTimeframe: quoteTimeframeRef.current.value,
          quoteTitle: quoteJobTitleRef.current.value,
          quoteTimestamp: Timestamp.now()
        };
  
        currentArray.push(newObject);
  
        await updateDoc(docRef, { activeQuotes: currentArray });
        console.log('Document successfully updated!');
      } else {
        console.log('Document not found!');
      }
    } catch (error) {
      console.error('Error updating document: ', error);
    }
};
  

  return (
    <Layout>
        <div>Quote:</div>
        <form onSubmit={handleSubmit}>
          <label htmlFor='jobTitle' >Title your request: </label>
          <input name='jobTitle' placeholder='Enter here:' ref={quoteJobTitleRef} />
          <label htmlFor='jobDescription' >Tell us about the job you need doing? </label>
          <input ref={quoteDetailsRef} name='jobDescription' placeholder='Enter here:' />
          <label htmlFor='jobTimeFrame'>When do you need the job done? </label>
          <select defaultValue='Choose here' name='jobTimeFrame' ref={quoteTimeframeRef}>
            <option value='Choose here' disabled hidden>Choose here</option>
            <option value='In Twenty Four Hours'>In 24 hours</option>
            <option value='Two to Three Days'>2-3 days</option>
            <option value='Five to Seven Days'>5-7 days</option>
            <option value='Seven Plus Days'>7+ days</option>
          </select>
          {auth.currentUser ? <input type='submit' value='Submit'/> : 
            <button>
              <Link href='/nav/Login'>
              Please login here to request a quote
              </Link>
            </button>}
          
          {quoteSubmitError ? <div>{quoteSubmitError}</div> : null}
        </form>
    </Layout>
  )
}
