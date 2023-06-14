import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import { useRouter } from 'next/router'
import { auth, db } from '../../../firebase';
import { query, collection, where, getDocs, updateDoc } from 'firebase/firestore';

export default function UserQuotes() {
  
  const router = useRouter();
  
  const { userQuotes } = router.query;
  
  const email = userQuotes;

  const user = auth.currentUser;

  const [userQuotesArr, setUserQuotesArr] = useState([]);
  const [selectedQuotes, setSelectedQuotes] = useState([]);

  useEffect(() => {
    const getQuotes = async () => {
      try {
        const q = query(collection(db, 'Traders'), where('email', '==', email));
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data();
          const activeQuotes = docData.activeQuotes || [];
          setUserQuotesArr(activeQuotes);
          console.log('Active Quotes:', activeQuotes);
        } else {
          console.log('User document not found!');
        }
      } catch (error) {
        console.error('Error getting quotes:', error);
      }
    };
  
    if (user) {
      getQuotes();
    }
  }, [user]);

  const handleCheckboxChange = (e, quoteId) => {
    if (e.target.checked) {
      setSelectedQuotes((prevSelectedQuotes) => [...prevSelectedQuotes, quoteId]);
    } else {
      setSelectedQuotes((prevSelectedQuotes) =>
        prevSelectedQuotes.filter((id) => id !== quoteId)
      );
    }
  };
  
  const handleRemoveQuotes = async () => {
    try {
      const q = query(collection(db, 'Traders'), where('email', '==', email));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        const docData = querySnapshot.docs[0].data();
        const { activeQuotes } = docData;
  
        const updatedQuotes = activeQuotes.filter(
          (quote) => !selectedQuotes.includes(quote.quoteId)
        );
  
        await updateDoc(docRef, { activeQuotes: updatedQuotes });
        console.log('Selected quotes removed successfully!');
        // Refresh the quotes array or perform any other necessary actions after successful removal
      } else {
        console.log('User document not found!');
      }
    } catch (error) {
      console.error('Error removing quotes:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    handleRemoveQuotes()
    router.push(`/components/UserQuotes/${email}`)
  }
  
  

  if (!user) {
    return (
      <Layout>
        <div>You must login to a Traders account to access this page!</div>
      </Layout>
    )
  }

  return (
    <Layout>
      {userQuotesArr.length !== 0 ? 
      <>
      <h3>Your active quotes:</h3>
      <div>
        {userQuotesArr.map((quote) => (
          <div key={quote.quoteId}>
            <div>Job Title: {quote.quoteTitle}</div>
            <div>Clients email to correspond with: {quote.clientEmail}</div>
            <div>Job details: {quote.quoteDetails}</div>
            <div>Job urgency: {quote.quoteTimeframe}</div>
            <div>Clients property status: {quote.quotePropertyAuthStatus}</div>
            <div>Clients job budget: {quote.quoteBudget}</div>
            <form>
              <label htmlFor='Remove Quote'>Remove: </label>
              <input 
              type='checkbox'
              name='Remove Quote'
              checked={selectedQuotes.includes(quote.quoteId)}
              onChange={(e) => handleCheckboxChange(e, quote.quoteId)}
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
