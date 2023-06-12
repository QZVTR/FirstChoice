import React from 'react';
import SearchBar from './components/SearchBar';
import HowWeWork from './components/landingPage/HowWeWork';
import AboutUs from './components/landingPage/AboutUs';
import SafetyHiring from './components/landingPage/SafetyHiring';

export default function HomePage() {
  return (
    <>
      <SearchBar />
      <HowWeWork />
      <AboutUs />
      <SafetyHiring />
    </>
  )

}
