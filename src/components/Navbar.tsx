import React, { useState } from 'react';
import 'remixicon/fonts/remixicon.css';

interface NavbarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onPageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: '首页' },
    { id: 'events', label: '大事件' },
    { id: 'photos', label: '照片集' },
    { id: 'trivia', label: '芝麻小事' }
  ];

  return (
    <>
      {/* 移动端菜单按钮 */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden fixed top-1 left-1 p-2 rounded-lg hover:bg-primary/10 transition-all duration-300 z-50"
        title="菜单"
      >
        <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-xl text-gray-600 dark:text-gray-300`}></i>
      </button>

      {/* 移动端导航菜单 */}
      <div className={`fixed inset-0 bg-white/90 dark:bg-dark-200/90 backdrop-blur-md z-40 transition-all duration-300 md:hidden ${
        isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <nav className="flex flex-col items-center justify-center h-full gap-6">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                onPageChange(item.id);
                setIsMenuOpen(false);
              }}
              className={`text-2xl px-6 py-3 rounded-lg transition-all duration-300 ${
                currentPage === item.id
                  ? 'bg-primary text-white shadow-lg'
                  : 'hover:bg-primary/10 text-gray-600 dark:text-gray-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* 桌面端导航栏 */}
      <nav className="hidden md:flex justify-center items-center gap-4 mb-6 fixed top-0 left-0 right-0 p-4 z-30">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              currentPage === item.id
                ? 'bg-primary text-white shadow-lg'
                : 'hover:bg-primary/10 text-gray-600 dark:text-gray-300'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </>
  );
};

export default Navbar; 