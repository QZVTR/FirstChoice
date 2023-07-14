import React from 'react';
import styles from '../../../styles/LandingPage.module.css';
export default function HowWeWork() {
  return (
    <>
      <div className={styles.column}>
        <div>
          <h3><u>For Clients:</u></h3>
          <div>
            We know that finding the right tradesperson can be a daunting task. That's why we have streamlined
            the process, making it hassle-free and efficient. Our platform provides detailed profiles of
            tradespeople, including their qualifications, experience, customer reviews, and sample work. This
            information empowers you to make an informed decision and choose the professional who best fits
            your requirements.
          </div>
        </div>
        <div>
          <h3><u>For Tradespeople:</u></h3>
          <div>
            We also prioritize the success of our tradespeople. By joining our platform, you gain exposure to a
            wide client base actively seeking your expertise. We provide you with a platform to showcase your
            skills, qualifications, and achievements. Our aim is to help you expand your business and reach new
            clients, allowing you to focus on what you do best delivering exceptional service.
          </div>
        </div>
      </div>
    </>
  )
}
 