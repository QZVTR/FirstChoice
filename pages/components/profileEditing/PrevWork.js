import React, { useState, useEffect } from 'react';
import { storage, db } from '../../../firebase';
import { collection, query, where, getDocs, updateDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import Compressor from 'compressorjs';

export default function PrevWork({ email }) {
  const [files, setFiles] = useState([]);
  const [fileUp, setFileUp] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [userId, setUserId] = useState(null);
  const [traderLogged, setTraderLogged] = useState(false);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    console.log(files);
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const tradersQuery = query(collection(db, 'Traders'), where('email', '==', email));
        const tradersSnapshot = await getDocs(tradersQuery);

        if (!tradersSnapshot.empty) {
          const traderDoc = tradersSnapshot.docs[0];
          setUserId(traderDoc.data().id);
          setTraderLogged(true);
        } else {
          const customersQuery = query(collection(db, 'Customers'), where('email', '==', email));
          const customersSnapshot = await getDocs(customersQuery);

          if (!customersSnapshot.empty) {
            const customerDoc = customersSnapshot.docs[0];
            setUserId(customerDoc.data().id);
            setTraderLogged(false);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    getUserData();
  }, [email]);

  useEffect(() => { 
    const updateDocument = async () => {
      if (traderLogged) {
        const tradersRef = collection(db, 'Traders');
        const queryRef = query(tradersRef, where('id', '==', userId));
        const querySnapshot = await getDocs(queryRef);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0].ref;
          const newData = {
            prevWorkUrls: imageUrls,
        };

        // Get the previous URLs from Firestore
        const prevUrlsSnapshot = await getDoc(userDoc);
        const prevUrls = prevUrlsSnapshot.data().prevWorkUrls;

        // Delete previous images from storage and remove their URLs from the array
        const deletePromises = prevUrls.map(async (prevUrl) => {
          // Delete image from storage
          const imageRef = ref(storage, prevUrl);
          await deleteObject(imageRef);
        });

        await Promise.all(deletePromises);

          updateDoc(userDoc, newData)
            .then(() => {
              alert('Document updated successfully');
            })
            .catch((error) => {
              console.error(error);
            });
        }
      } else {
        const customersRef = collection(db, 'Customers');
        const queryRef = query(customersRef, where('id', '==', userId));
        const querySnapshot = await getDocs(queryRef);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0].ref;
          const newData = {
            prevWorkUrls: imageUrls,
          };

          updateDoc(userDoc, newData)
            .then(() => {
              //alert('Document updated successfully');
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }
    };

    if (imageUrls.length > 0) {
      updateDocument();
    }
  }, [imageUrls, traderLogged, userId]);

  const compress = file => {
    new Compressor(file, {
      quality: 0.6,  
      success(result) {
        setFileUp(result)
      }
    })
  }


  const handleUpload = async () => {
    try {
      const uploadPromises = files.map((file) => {
        return new Promise((resolve, reject) => {
          const fileRef = ref(storage, `previousWork/${userId}/${file.name}`);
          //compress(file)
          const uploadTask = uploadBytesResumable(fileRef, file);

          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused');
                  break;
                case 'running':
                  console.log('Upload is running');
                  break;
              }
            },
            (error) => {
              console.error(error);
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadURL) => {
                  setImageUrls((prevArr) => [...prevArr, downloadURL]);
                })
                .catch((error) => {
                  console.error(error);
                  reject(error);
                });
            }
          );
        });
      });

      await Promise.all(uploadPromises);

      alert('All files uploaded successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} multiple />
      <button onClick={handleUpload}>Upload</button>
      {imageUrls.map((imageUrl, index) => (
        <img key={index} src={imageUrl} alt="Uploaded" style={{ height: 40, width: 40 }} />
      ))}
    </div>
  );
}
