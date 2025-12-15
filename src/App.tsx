import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Safety from './components/Safety';
import Terms from './components/Terms';
import CTA from './components/CTA';
import Footer from './components/Footer';
import PostRideForm from './components/PostRideForm';
import AvailableRides from './components/AvailableRides';

function App() {
  const [isPostRideFormOpen, setIsPostRideFormOpen] = useState(false);
  const [refreshRides, setRefreshRides] = useState(0);

  const isTermsPage = window.location.pathname === '/terms';

  const scrollToFindRide = () => {
    const element = document.getElementById('find-ride');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePostRideSuccess = () => {
    setRefreshRides(prev => prev + 1);
  };

  if (isTermsPage) {
    return (
      <div className="min-h-screen">
        <Header />
        <main>
          <Terms />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero 
          onPostRide={() => setIsPostRideFormOpen(true)}
          onFindRide={scrollToFindRide}
        />
        <AvailableRides refreshTrigger={refreshRides} />
        <Features />
        <HowItWorks />
        <Safety />
        <CTA 
          onPostRide={() => setIsPostRideFormOpen(true)}
          onFindRide={scrollToFindRide}
        />
      </main>
      <Footer />
      <PostRideForm 
        isOpen={isPostRideFormOpen} 
        onClose={() => setIsPostRideFormOpen(false)}
        rideType="offer"
        onSuccess={handlePostRideSuccess}
      />
    </div>
  );
}

export default App;

