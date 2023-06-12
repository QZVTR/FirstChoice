import React, { useState, useEffect } from 'react';
import { storage, db } from '../../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export default function ImageUpload({ email }) {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [userId, setUserId] = useState(null);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  console.log(email)
  useEffect(() => {
    const getUserData = async () => {
        try {
            const usersRef = collection(db, 'Traders');
            const q = query(usersRef, where('email', '==', email));
            const querySnapshot = await getDocs(q);

            if(!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                console.log(userDoc)
                setUserId(userDoc.data().id);
            }
        } catch (error) {
            console.error(error);
        }
      };
      getUserData();
  },[email])

  
  const handleUpload = () => {
    if (file) {
      const fileRef = ref(storage, `profileImages/${userId}/${file.name}`);
      const uploadTask = uploadBytesResumable(fileRef, file)

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch(snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break;
            case 'running':
              console.log('Upload is running')
              break;
          }
        },
        (error) => {
          console.error(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUrl(downloadURL);
            db.collection('Traders').doc(userId).update({
              profileImageUrl: downloadURL,
            });
          });
        }
      );
    }
  };

  return (
    <div>
      <div>{email}</div>
      <div>{userId}</div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div>
  );
}
