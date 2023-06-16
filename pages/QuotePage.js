import React, { useRef, useState, useEffect } from 'react'
import Layout from './Layout'
import { auth, db } from '../firebase'
import { uuid } from 'uuidv4';
import { query, collection, where, serverTimestamp, getDocs, updateDoc, FieldValue, Timestamp } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/router';
const Filter = require('bad-words'),
    filter = new Filter();

//We will alert the trader via email that they have a new quote request 
//It will create a current quote section on their page


//User can create a job post and it will be on their profile

export default function QuotePage() {

  const router = useRouter();
  
  const quoteDetailsRef = useRef();
  const quoteTimeframeRef = useRef();
  const quoteJobTitleRef = useRef();
  const quotePropertyAuthStatusRef = useRef();
  const quoteBudgetRef = useRef();

 
  const [quoteSubmitError, setQuoteSubmitError] = useState(null);

  const [clientId, setClientId] = useState(null);
  const [tradeId, setTradeId] = useState(null);

  const [badlanguage, setBadLanguage] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const clientId = urlParams.get('clientId');
    const tradeId = urlParams.get('tradeId');

    // Set the retrieved query parameters in the component state
    setClientId(clientId);
    setTradeId(tradeId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(quoteDetailsRef.current.value);
    console.log(quoteJobTitleRef.current.value);
    console.log(quoteTimeframeRef.current.value);
    
    if (!quoteDetailsRef.current.value || !quoteJobTitleRef.current.value || quoteTimeframeRef.current.value === "Choose here" || quoteBudgetRef.current.value === 'Choose here' || quotePropertyAuthStatusRef.current.value === "Choose here") {
      setQuoteSubmitError('Please enter all fields')
    } else {
      if (languageChecker(quoteJobTitleRef.current.value) && languageChecker(quoteDetailsRef.current.value)) {
        sendQuote()
        router.push('/components/SuccessQuotePage')
      } else {
        setBadLanguage("You cannot include bad language in you quote request")
      }
      
    } 
  }

  const languageChecker = review => {
    if (filter.isProfane(review)) {
        return true
    } else {
        return false
    }
}


  const sendQuote = async () => {
    try {
      const quoteId = uuid();
  
      const q = query(collection(db, 'Traders'), where('id', '==', tradeId));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        const currentArray = querySnapshot.docs[0].data().activeQuotes || [];
  
        const newObject = {
          quoteId: quoteId,
          clientEmail: clientId,
          quoteDetails: quoteDetailsRef.current.value,
          quoteTimeframe: quoteTimeframeRef.current.value,
          quoteTitle: quoteJobTitleRef.current.value,
          quotePropertyAuthStatus: quotePropertyAuthStatusRef.current.value,
          quoteBudget: quoteBudgetRef.current.value,
          quoteTimestamp: Timestamp.now()
        };
        console.log(newObject)
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
        {badlanguage ? <div>{badlanguage}</div> : null}
        <form onSubmit={handleSubmit}>
          <div>
          <label htmlFor='jobTitle' >Title your request: </label>
          <input name='jobTitle' placeholder='Enter here:' ref={quoteJobTitleRef} />
          </div>
          <div>
          <label htmlFor='jobDescription' >Tell us about the job you need doing? </label>
          <input ref={quoteDetailsRef} name='jobDescription' placeholder='Enter here:' />
          </div>
          <div>
          <label htmlFor='jobTimeFrame'>When do you need the job done? </label>
          <select defaultValue='Choose here' name='jobTimeFrame' ref={quoteTimeframeRef}>
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
          <label htmlFor='propertyAuthStatus' >Are you authorised to make changes to the property</label>
          <select defaultValue='Choose here' name='propertyAuthStatus' ref={quotePropertyAuthStatusRef}>
            <option value='Choose here' disabled hidden >Choose here</option>
            <option value='Client owns and lives at the property'>I own and live at this property</option>
            <option value='Client is the landlord'>I am the landlord</option>
            <option value='Client rents but is authorised to make changes to the property'>I rent this property but I am authorised to make changes</option>
          </select>
          </div>
          <div>
          <label>What is your budget for this job? (Don't worry you are not commiting to this price) </label>
          <select defaultValue='Choose here' name='quoteBudget' ref={quoteBudgetRef}>
            <option value='Choose here' disabled hidden>Choose here</option>
            <option value='Under £200'>Under £200</option>
            <option value='Under £500'>Under £500</option>
            <option value='Under £1,000'>Under £1,000</option>
            <option value='Under £2,000'>Under £2,000</option>
            <option value='Under £5,000'>Under £5,000</option>
            <option value='Over £5,000'>Over £5,000</option>
          </select>
          </div>

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
