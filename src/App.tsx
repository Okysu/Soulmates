import { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import EventsPage from './components/EventsPage';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);

  const handlePageChange = (page: string) => {
    if (page === currentPage) return;
    
    setIsPageTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      setTimeout(() => {
        setIsPageTransitioning(false);
      }, 50);
    }, 300);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'events':
        return <EventsPage />;
      case 'photos':
        return <div className="text-center">照片集页面开发中...</div>;
      case 'trivia':
        return <div className="text-center">芝麻小事页面开发中...</div>;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4">
      {/* 毛玻璃效果卡片 */}
      <div className="relative z-10 card-container backdrop-blur-md bg-white/70 dark:bg-dark-200/70 rounded-xl shadow-xl p-6 md:p-8 transition-all duration-300 flex flex-col items-center justify-center md:mt-16">
        <ThemeToggle />
        <Navbar currentPage={currentPage} onPageChange={handlePageChange} />
        <div className={`w-full transition-all duration-300 ${isPageTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          {renderPage()}
        </div>
      </div>
    </div>
  );
}

export default App;
