import React, { useEffect, useState } from 'react'
import { auth, db } from '../../firebase'
import Layout from '../Layout'
import Link from 'next/link'
import { collection, query, where, getDocs } from 'firebase/firestore';
import { v4 } from 'uuidv4';

export default function Profile() {

  const user = auth.currentUser;
  console.log(user)
  const [fName, setFName] = useState('');
  const [sName, setSName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState();
  const [bio, setBio] = useState();
  const [jobsAvail, setJobsAvail] = useState([]);
  const [userType, setUserType] = useState();
  
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
      const q = query(collection(db, 'Customers'), where('email', '==', user.email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return
      }

      if (!querySnapshot.empty) {
        // Assuming there is only one document matching the email
        const userData = querySnapshot.docs[0].data();
        console.log(userData);
        // You can set the user data to state variables or perform other actions
        setFName(userData.firstName);
        setSName(userData.secondName);
        setPhone(userData.phone);
        setEmail(userData.email)
        setUserType('Customer')
      }
    };

      if (user) {
        getUserDataCust();
      }
  },[user])


  useEffect(() => {
    const getUserDataTrader = async () => {
      const q = query(collection(db, 'Traders'), where('email', '==', user.email.toLowerCase()));
      const querySnapshot = await getDocs(q);
      console.log(user.email)
      if (querySnapshot.empty) {
        return
      }

      if (!querySnapshot.empty) {
        // Assuming there is only one document matching the email
        const userData = querySnapshot.docs[0].data();
        console.log(userData);
        // You can set the user data to state variables or perform other actions
        setFName(userData.firstName);
        setSName(userData.secondName);
        setPhone(userData.phone);
        setCompanyName(userData.companyName);
        setBio(userData.bio);
        setEmail(userData.email)
        setJobsAvail(userData.jobsAvail)
        setUserType('Trader')
      }
    };

      if (user) {
        getUserDataTrader();
      }
  },[user])

  console.log(jobsAvail)
  return (
    <Layout>
      <h2>Profile</h2>
      <Link href='/components/EditProfile'>
        <img src='/media/EditProfile.jpg' alt='Edit Profile' height='30' width='30'/>
      </Link>
      {userType === 'Trader' ? <div>
        <Link href={`/components/UserQuotes/${email}`}>
          View your requested quotes
        </Link>
      </div> :
      null
      }
      
      <br />
      <div>
        <div>Name: {fName} {sName}</div>
        
        <div>Email: {email}</div>
        <div>Phone number: {phone}</div>
        {companyName ? <div>Company name: {companyName}</div> : null}
        {bio ? <div>About: {bio}</div> : null}
        <h4>Services we offer: </h4>
        {jobsAvail ?
          <div>
            {jobsAvail && jobsAvail.map((job, index) => (
              <div key={index}>{capitalizeWords(job)}</div>
            ))}
          </div>
          : null
        }
      </div>
    </Layout>
  )
}
