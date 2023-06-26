import React, { useState, useEffect } from 'react';
import Layout from '../../Layout';
import { auth, db } from '../../../firebase';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import ImageUpload from './ImageUpload'
import PrevWork from './PrevWork';
export default function UserData() {
  const [user, setUser] = useState(null);
  const [custUsers, setCustUsers] = useState([]);
  const [tradeUsers, setTradeUsers] = useState([]);
  const [FName, setFName] = useState('');
  const [SName, setSName] = useState('');
  const [Phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [tradeType, setTradeType] = useState(null);
  const [jobsAvail, setJobsAvail] = useState('');
  const [checkboxes, setCheckboxes] = useState({
    electrician: {
      Access_Control: false,
      Aerial_Satellite_Dish_Installation: false,
      Air_Conditioning: false,
      Domestic_Appliance_Repair: false,
      Electric_Oven_And_Hob_Installation: false,
    },
    plumber: {
      Bathroom_Installation: false,
      Guttering_Pipes_Repair: false,
      Plumbing_Repair: false,
      Twenty_Four_Hour_Plumber: false,
      Kitchen_Plumbing: false
    },
    bathroom_fitter: {
      Bathroom_Resurfacing: false,
      Bathroom_Installation: false,
      Bathroom_Repair: false,
      Bathroom_Tiling: false,
      Complete_Bathroom_Refurbashing: false,
    },
    cleaner: {
      Carpet_Cleaning: false,
      Window_Cleaning: false,
      Conservatory_Cleaning: false,
      Domestic_Deep_Cleaning: false,
      Domestic_House_Cleaning: false,
    },
    builder: {
      Cavity_Wall_Installation: false,
      Conservatory: false,
      Suspended_Ceiling: false,
      Cladding: false,
      Loft_Convertion: false,
    },
    roofer: {
      Roof_Cleaning: false,
      Roof_Insulation: false,
      Slate_and_Tiled_Work: false,
      Leadwork: false,
      Zinc_Metal_Work: false,
    },
    locksmith: {
      Burglar_Repair: false,
      Door_Opening: false,
      Door_Replacement: false,
      Emergency_Twenty_Four_Hour_Locksmith: false,
      Lock_Fitting_Repair: false,
    }
  });
  


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

  const handleSubmitTrader = (e) => {
    e.preventDefault();
    

    const q = query(collection(db, 'Traders'), where('email', '==', user.email));

    getDocs(q)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const existingData = doc.data();
          const newData = {
            firstName: FName || existingData.firstName,
            secondName: SName || existingData.secondName,
            phone: Phone.toString() || existingData.phone,
            bio: bio || existingData.bio,
            companyName: companyName || existingData.companyName,
            jobsAvail: getCheckedCheckboxes() || existingData.jobsAvail, 
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
      
     
     
  }

  const handleCheckboxChange = (event) => {
    console.log('Change triggered');
    const { name, checked } = event.target;
    console.log(name)
    console.log(checked)
    const [category, subCategory] = name.split('.')
    
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [category]: {
        ...prevCheckboxes[category],
        [subCategory]: checked
      },
    }));
  }

  const formatCheckboxKey = (key) => {
    return key.replace(/_/g, ' ');
  };

  const getCheckedCheckboxes = () => {
    const checkedCheckboxes = [];
  
    Object.entries(checkboxes).forEach(([category, subCategories]) => {
      Object.entries(subCategories).forEach(([subCategory, checked]) => {
        if (checked) {
          checkedCheckboxes.push(`${formatCheckboxKey(subCategory.toLowerCase())}`);
        }
      });
    });
    console.log(checkedCheckboxes);
    return checkedCheckboxes;
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
        <div>Email: {user.email}</div>
        <form onSubmit={handleSubmitTrader}>
          <input placeholder='What is the name of your business: ' onChange={(e) => setCompanyName(e.target.value)} />
          <div>
          <label htmlFor='TradeType'>What is your primary trade?</label>
              <select defaultValue='Choose here' name='TradeType' onChange={(e) => setTradeType(e.target.value)}>
                  <option defaultValue='Choose here' disabled hidden>Choose here</option>
                  <option value='electrician'>Electrician</option>
                  <option value='plumber'>Plumber</option>
                  <option value='bathroom_fitter'>Bathroom Fitter</option>
                  <option value='cleaner'>Cleaner</option>
                  <option value='builder'>Builder</option>
                  <option value='roofer'>Roofer</option>
                  <option value='locksmith'>Locksmith</option>
              </select>
          </div>

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

        <input placeholder='Tell everyone about your business: ' onChange={(e) => setBio(e.target.value)}/>
        
        {tradeType ? <div>Please tick the services you provide:</div> : null}
        {tradeType && Object.entries(checkboxes[tradeType]).map(([subCategory, checked]) => {
          const name = `${tradeType}.${subCategory}`;
          return (
            <div key={subCategory}>
              <label htmlFor={name}>{formatCheckboxKey(subCategory)}</label>
              <input
                type="checkbox"
                id={name}
                name={name}
                checked={checked}
                onChange={handleCheckboxChange}
              />
            </div>
          );
        })}


        <input type='submit' value='submit' name='submit' />
        </form>
        <div>
          <PrevWork email={user.email}/>
        </div>
      </Layout>
    );
  }

}
