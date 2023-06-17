import React, {useState, useEffect} from 'react'

import { collection, query, orderBy, onSnapshot, where, getDocs, serverTimestamp, updateDoc, increment, setDoc, doc, arrayUnion } from "firebase/firestore";
import { db, auth } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';
import styles from '../../styles/Reviews.module.css'
const Filter = require('bad-words'),
    filter = new Filter();



export default function SpecificReviews({ id }) {
    const [reviews, setReviews] = useState([]);
    const [makeReview, setMakeReviews] = useState("");
    const [reviewTitle, setReviewTitle] = useState("");
    const [starRating, setStarRating] = useState(null);
    
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

    const updateUserDoc = async (traderId, starRating) => {
      try {
        const q = query(collection(db, 'Traders'), where('id', '==', traderId));
        const querySnapshot = await getDocs(q);
    
        if (!querySnapshot.empty) {
          const docRef = querySnapshot.docs[0].ref;
          const currentData = querySnapshot.docs[0].data();
          const currentStarRatings = currentData.starRating || [];
          
          currentStarRatings.push(starRating);
          await updateDoc(docRef, { starRating: currentStarRatings });
          console.log('Trader profile successfully updated with star rating!');
        } else {
          console.log('Trader profile not found!');
        }
      } catch (error) {
        console.error('Error updating trader profile: ', error);
      }
    };


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
            date_time: serverTimestamp(),
            starRating: starRating
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
        if (!makeReview && !reviewTitle && !starRating) {
          alert('You must enter all fields of the review (including rating)')
        }
        if (!languageChecker(makeReview)) {
            updateUserDoc(id, starRating)
            sendReview(reviewTitle)
            setMakeReviews("");
            setReviewTitle("");
            setStarRating(null);
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

    const handleStarClick = (rating) => {
      setStarRating(rating);
    };
  

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
                    <StarRatingDisplay rating={review.starRating}/>
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
              <StarRating rating={starRating} onStarClick={handleStarClick}/>
              <input type='submit' value='Submit' className={styles.submit} />
            </form>
          </div>
        </div>
      );
}


// StarRating component
const StarRating = ({ rating, onStarClick }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className={styles.starRating}>
      {stars.map((star) => (
        <span
          key={star}
          className={star <= rating ? styles.starFilled : styles.starEmpty}
          onClick={() => onStarClick(star)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

const StarRatingDisplay = ({ rating }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className={styles.starRating}>
      {stars.map((star) => (
        <span
          key={star}
          className={star <= rating ? styles.starFilled : styles.starEmpty}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export const StarRatingDisplayArr = ({ ratings }) => {
  const calculateAverageRating = () => {
    if (ratings.length === 0) {
      return 0;
    }

    const sum = ratings.reduce((total, rating) => total + rating, 0);
    return sum / ratings.length;
  };

  const averageRating = calculateAverageRating();

  const stars = [1, 2, 3, 4, 5];

  return (
    <div className={styles.starRating}>
      Average Rating: 
      {stars.map((star) => (
        <span
          key={star}
          className={star <= averageRating ? styles.starFilled : styles.starEmpty}
        >
          &#9733;
        </span>
      ))}
      
    </div>
  );
};
