import React, {useState, useEffect} from 'react'

import { collection, query, orderBy, onSnapshot, where, addDoc, serverTimestamp, updateDoc, increment, setDoc, doc, arrayUnion } from "firebase/firestore";
import { db, auth } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';
import styles from '../../styles/Reviews.module.css'
const Filter = require('bad-words'),
    filter = new Filter();



export default function SpecificReviews({ id }) {
    const [reviews, setReviews] = useState([]);
    const [makeReview, setMakeReviews] = useState("");
    const [reviewTitle, setReviewTitle] = useState("");
    
    useEffect(() => {
        const fetchReviews = () => {
            const reviewRef = collection(db, "Reviews");
            const q = query(reviewRef, where("reviewed_user_id", "==", id), orderBy("date_time", "desc"));
            const unsubcribe = onSnapshot(q, (querySnapshot) => {
                const fetchedReviews = [];
                querySnapshot.forEach((doc) => {
                    fetchedReviews.push(doc.data())
                    
                })
                setReviews([...fetchedReviews])
            })
            
        }
        fetchReviews();
    },[])


    const sendReview = async (title) => {
        const reviewId = uuidv4();
        languageChecker(makeReview)
        const data = {
            review_id: reviewId,
            titleDisplay: title,
            user: auth.currentUser.email,
            reviewed_user_id: id,
            review: makeReview,
            flagCount: 0,
            flaggedBy: [],
            date_time: serverTimestamp()
        }

        const docRef = await setDoc(doc(db, 'Reviews', reviewId), data);
    }

    const handleChange = e => {
        setMakeReviews(e.target.value);
    }

    const handleChangeTitle = e => {
        setReviewTitle(e.target.value)
    }

    const languageChecker = review => {
        if (filter.isProfane(review)) {
            return true
        } else {
            return false
        }
    }
   
    
    const handleSubmit = e => {
        e.preventDefault();
        console.log(makeReview);
        if (!languageChecker(makeReview)) {
            sendReview(reviewTitle)
            setMakeReviews("");
            setReviewTitle("");
        }else {
            alert('Review contains bad language');
        }
    }

    const incrementFlags = async (review) => {
        const incrementRef = doc(db, "Reviews", review.review_id);
        if (!auth.currentUser) {
            alert('You must login to flag reviews')
        }
        if (review.user === auth.currentUser.email) {
            alert("You can't flag your own reviews")
        } else {
            if (!review.flaggedBy.includes(auth.currentUser.email)) {
                await updateDoc(incrementRef, {
                    flagCount: increment(1),
                    flaggedBy: arrayUnion(auth.currentUser.email)
                })
                alert("Review successfully flagged")
            } else {
                alert('You can only flag a review once.')
            }
        }
    }

    return (
        <div className={styles.reviewBox}>
          <p className={styles.reviewTitle}><b><u>User Reviews</u></b></p>
          <div>
            {reviews?.map((review) => (
              <div key={review.review_id} className={styles.review}>
                <div className={`${styles.row} ${styles.column}`}>
                  <div className={styles.columnLeft}>
                    <img className={styles.userLogo} src='/media/user.png' alt='User Logo' />
                  </div>
                  <div className={styles.columnRight}>
                    <p className={styles.reviewUser}><b>{review.user}</b></p>
                    <p>Review Title: {review.titleDisplay}</p>
                    <p className={styles.reviewData}>Review: {review.review}</p>
                    <img
                      className={styles.flagReview}
                      src='/media/FlagReview.png'
                      alt='Flag Review'
                      onClick={() => incrementFlags(review)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.newReview}>
            <form onSubmit={handleSubmit}>
              <input
                name='reviewTitle'
                autoFocus
                value={reviewTitle}
                onChange={handleChangeTitle}
                placeholder='Enter Review Title'
                className={styles.newTitle}
              />
              <input
                name='makeReview'
                autoFocus
                value={makeReview}
                onChange={handleChange}
                placeholder='Enter Review'
                className={styles.newData}
              />
              <input type='submit' value='Submit' className={styles.submit} />
            </form>
          </div>
        </div>
      );
}
