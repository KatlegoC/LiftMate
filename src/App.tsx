import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Safety from './components/Safety';
import Pricing from './components/Pricing';
import CTA from './components/CTA';
import Footer from './components/Footer';
import PostRideForm from './components/PostRideForm';
import AvailableRides from './components/AvailableRides';

function App() {
  const [isPostRideFormOpen, setIsPostRideFormOpen] = useState(false);

  const scrollToFindRide = () => {
    const element = document.getElementById('find-ride');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero 
          onPostRide={() => setIsPostRideFormOpen(true)}
          onFindRide={scrollToFindRide}
        />
        <AvailableRides />
        <Features />
        <HowItWorks />
        <Safety />
        <Pricing />
        <CTA 
          onPostRide={() => setIsPostRideFormOpen(true)}
          onFindRide={scrollToFindRide}
        />
      </main>
      <Footer />
      <PostRideForm 
        isOpen={isPostRideFormOpen} 
        onClose={() => setIsPostRideFormOpen(false)} 
      />
    </div>
  );
}

export default App;

