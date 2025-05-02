import { useEffect, useState } from 'react';
import 'remixicon/fonts/remixicon.css';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="fixed top-1 right-1 p-2 rounded-lg hover:bg-primary/10 transition-all duration-300 z-50"
      title={isDark ? '切换到亮色模式' : '切换到暗色模式'}
    >
      {isDark ? (
        <i className="ri-sun-line text-xl text-gray-300"></i>
      ) : (
        <i className="ri-moon-line text-xl text-gray-600"></i>
      )}
    </button>
  );
};

export default ThemeToggle; 