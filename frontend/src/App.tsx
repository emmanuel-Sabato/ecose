import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import TopNavbar from './components/TopNavbar';
import HeroSlider from './components/HeroSlider';
import AboutSection from './components/AboutSection';
import AcademicPrograms from './components/AcademicPrograms';
import AdmissionProcess from './components/AdmissionProcess';
import FacilitiesSection from './components/FacilitiesSection';
import GallerySection from './components/GallerySection';
import Footer from './components/Footer';
import NewsPage from './components/NewsPage';
import NewsDetail from './components/NewsDetail';
import SchoolCalendar from './components/SchoolCalendar';
import FacilitiesPage from './components/FacilitiesPage';
import LoginPage from './components/LoginPage';
import AdminLayout from './components/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import ApplicationForm from './components/ApplicationForm';

const ScrollToHash: React.FC = () => {
  const { hash } = useLocation();

  React.useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return null;
};

const Home: React.FC = () => (
  <>
    <TopNavbar />
    <Navbar />
    <main>
      <HeroSlider />
      <AboutSection />
      <AcademicPrograms />
      <AdmissionProcess />
      <FacilitiesSection />
      <GallerySection />
    </main>
    <Footer />
  </>
);

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/calendar" element={<SchoolCalendar />} />
        <Route path="/facilities" element={<FacilitiesPage />} />
        <Route path="/apply" element={<ApplicationForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admission/portals" element={<LoginPage />} />
        <Route path="/admin/*" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>} />
      </Routes>
    </div>
  );
};


export default App;
