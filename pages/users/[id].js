import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import { useRouter } from 'next/router'
import { auth, db } from '../../firebase';
import { query, where, getDocs, collection } from 'firebase/firestore';
import SpecificReviews from '../components/SpecificReviews';


export default function User() {

    const [userData, setUserData] = useState(null);
    
    const router = useRouter();
    const { id } = router.query;
    
    useEffect(() => {
        const getUserData = async () => {
            try {
                const usersRef = collection(db, 'Traders');
                const q = query(usersRef, where('id', '==', id));
                const querySnapshot = await getDocs(q);

                if(!querySnapshot.empty) {
                    const userDoc = querySnapshot.docs[0];
                    setUserData(userDoc.data());
                }
            } catch (error) {
                console.error(error);
            }
        };
        getUserData();
    },[id])


    return (
        <Layout>
            <div>User ID: {id}</div>
            {userData && (
                <>
                <div>
                <h1>{userData.companyName}</h1>
                <h2>{userData.firstName} {userData.secondName}</h2>
                <p>Email: {userData.email}</p>
                <p>Phone number: {userData.phone}</p>
                <p>About: {userData.bio}</p>
                </div>
                <div>
                    <SpecificReviews id={id} />
                </div>
                </>
            )}
        </Layout>
    )
}
