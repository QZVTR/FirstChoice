import React, { useEffect, useState } from 'react'
import { auth, db } from '../../firebase'
import Layout from '../Layout'
import Link from 'next/link'
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function Profile() {

  const user = auth.currentUser;

  const [fName, setFName] = useState('');
  const [sName, setSName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState();
  const [bio, setBio] = useState();

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
      }
    };

      if (user) {
        getUserDataCust();
      }
  })


  useEffect(() => {
    const getUserDataTrader = async () => {
      const q = query(collection(db, 'Trader'), where('email', '==', user.email));
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
        setCompanyName(userData.companyName);
        setBio(userData.bio);
        setEmail(userData.email)
      }
    };

      if (user) {
        getUserDataTrader();
      }
  })

  return (
    <Layout>
      <h2>Profile</h2>
      <Link href='/components/EditProfile'>
        <img src='/media/EditProfile.jpg' alt='Edit Profile' height='30' width='30'/>
      </Link>
      <div>
        <div>{fName}</div>
        <div>{sName}</div>
        <div>{email}</div>
        <div>{phone}</div>
        {companyName ? <div>{companyName}</div> : null}
        {bio ? <div>bio</div> : null}
      </div>
    </Layout>
  )
}
