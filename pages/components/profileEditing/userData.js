import React, { useState, useEffect } from 'react';
import Layout from '../../Layout';
import { auth, db } from '../../../firebase';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import ImageUpload from './ImageUpload'
export default function UserData() {
  const [user, setUser] = useState(null);
  const [custUsers, setCustUsers] = useState([]);
  const [tradeUsers, setTradeUsers] = useState([]);
  const [FName, setFName] = useState('');
  const [SName, setSName] = useState('');
  const [Phone, setPhone] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const getUsersCust = async () => {
      const querySnapshot = await getDocs(collection(db, 'Customers'));
      const custs = [];
      querySnapshot.forEach((doc) => {
        custs.push(doc.data().email);
      });
      setCustUsers(custs);
    };

    getUsersCust();
  }, [user]);

  useEffect(() => {
    const getUsersTrade = async () => {
      const querySnapshot = await getDocs(collection(db, 'Traders'));
      const traders = [];
      querySnapshot.forEach((doc) => {
        traders.push(doc.data().email);
      });
      setTradeUsers(traders);
    };

    getUsersTrade();
  }, [user]);

  const handleSubmitCust = (e) => {
    e.preventDefault();
    const q = query(collection(db, 'Customers'), where('email', '==', user.email));

    getDocs(q)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const existingData = doc.data();
          const newData = {
            firstName: FName || existingData.firstName,
            secondName: SName || existingData.secondName,
            phone: Phone.toString() || existingData.phone,
          };

          updateDoc(doc.ref, newData)
            .then(() => {
              alert('Document updated successfully');
            })
            .catch((error) => {
              console.error(error);
            });
        });
      });
  };

  console.log(tradeUsers);

  if (!user) {
    return <div>Loading...</div>;
  }

  if (custUsers.includes(user.email)) {
    return (
      <Layout>
        <div>Customers</div>
        <ImageUpload email={user.email}/>
        <div>Email: {user.email}</div>
        <form onSubmit={handleSubmitCust}>
          <input placeholder='Enter first name:' onChange={(e) => setFName(e.target.value)} />
          <input placeholder='Enter surname:' onChange={(e) => setSName(e.target.value)} />
          <input
            placeholder='Enter phone number:'
            onChange={(e) => {
            const input = e.target.value;
            const number = input.replace(/\D/g, ''); // Remove non-digit characters
              if (number.length <= 11) {
                setPhone(number);
              }
            }}
          value={Phone}
          minLength={11}
          maxLength={11}
          type='tel'
        />

          <input type='submit' value='submit' name='submit' />
        </form>
      </Layout>
    );
  } else if (tradeUsers.includes(user.email)) {
    console.log('logged in trade')
    return (
      <Layout>
        <ImageUpload email={user.email}/>
        <div>Tradesmen</div>
      </Layout>
    );
  }

}
