import React from 'react';
import SearchBar from './components/SearchBar';
import HowWeWork from './components/landingPage/HowWeWork';
import AboutUs from './components/landingPage/AboutUs';
import SafetyHiring from './components/landingPage/SafetyHiring';
import styles from '../styles/SearchBarBackground.module.css'
import stylesLanding from '../styles/LandingPage.module.css'
export default function HomePage() {
  return (
    <>
      <div className={styles.container}>
      <img className={styles.background} src='/media/backgroundphotoforsearch.jpg' alt='background photo' />
      <SearchBar />
      </div>
      <div className={stylesLanding.container}>
      <div className={stylesLanding.center}>
      <h2><u>Welcome to First Choice</u></h2>
      <div>
      At First Choice we understand the importance of finding reliable and skilled tradespeople for your
      home improvement, maintenance, and repair needs. We are dedicated to connecting clients with
      the right professionals, ensuring a seamless and satisfactory experience for both parties.
      </div>
      <div>
      <h3><u>Our Mission:</u></h3>

      Our mission is to simplify the process of finding trustworthy tradespeople while fostering mutually
      beneficial relationships between clients and service providers. We strive to create a platform that

      brings convenience, transparency, and quality to every interaction.
      </div>
      <HowWeWork />
      <AboutUs />
      <SafetyHiring />
      </div>
      </div>
    </>
  )

}
