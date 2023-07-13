import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import { useRouter } from 'next/router'
import { auth, db } from '../../firebase';
import { query, where, getDocs, collection } from 'firebase/firestore';
import SpecificReviews from '../components/SpecificReviews';
import Link from 'next/link';


export default function User() {

    const [userData, setUserData] = useState(null);
    const user = auth.currentUser
    const router = useRouter();
    const { id } = router.query;
    const [ custUsers, setCustUsers] = useState([]);
    
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

    
  useEffect(() => {
    const getUsersCust = async () => {
      const querySnapshot = await getDocs(collection(db, 'Customers'));
      const custs = [];
      querySnapshot.forEach((doc) => {
        custs.push(doc.data().email);
      });
      setCustUsers(custs);
    };

    if (auth.currentUser) {
        getUsersCust();
    }
    
  }, [user]);


    function capitalizeWords(str) {
        const words = str.split(' ');
      
        const capitalizedWords = words.map((word) => {
          const firstLetter = word.charAt(0).toUpperCase();
          const restOfWord = word.slice(1);
          return `${firstLetter}${restOfWord}`;
        });
      
        return capitalizedWords.join(' ');
    }

    if (!userData) {
        return (
            <Layout>
                <h1>Account not available</h1>
            </Layout>
        )
    }

    return (
        <Layout>
            {userData && (
                <>
                <div>
                <h1>{userData.companyName}</h1>
                <h2>{userData.firstName} {userData.secondName}</h2>
                <p>Email: {userData.email}</p>
                <p>Phone number: {userData.phone}</p>
                <p>About: {userData.bio}</p>
                <h4>Services offered:</h4>
                <div>
                {userData.jobsAvail ?
                    <div>
                        {userData.jobsAvail && userData.jobsAvail.map((job, index) => (
                        <div key={index}>{capitalizeWords(job)}</div>
                        ))}
                    </div>
                    : null
                }
                </div>
                </div>
                <div>
                    <h4><u>Previous Work</u></h4>
                    {userData.prevWorkUrls?.map((image, index) => (
                        <div key={index}>
                            <img src={image} alt='Previous work image' style={{ height: 300, width: 300}}/>
                        </div>
                    ))}
                </div>

                {auth.currentUser && custUsers.includes(auth.currentUser.email.toLowerCase()) ? <div>
                    <Link href={`/QuotePage?tradeId=${userData.id}&clientId=${user.email}`}>
                        <button>Get a quote</button>
                    </Link>
                </div> : 
                <div>
                    <h3>You must login to a customers account to receive a quote</h3>
                </div>
                }

                

                <div>
                    <SpecificReviews id={id} />
                </div>
                </>
            )}
        </Layout>
    )
}
