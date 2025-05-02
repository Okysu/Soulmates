import { useState, useEffect, useRef } from 'react';
import { getThemeConfig } from '../config/theme';
import 'remixicon/fonts/remixicon.css';

function HomePage() {
  // 获取主题配置
  const themeConfig = getThemeConfig();
  const loveConfig = themeConfig.love;

  // 定义时长类型
  interface Duration {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }

  // 计算恋爱时长
  const [loveDuration, setLoveDuration] = useState<Duration | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef<number | null>(null);
  const prevSecondsRef = useRef<number | null>(null);

  // 更新计时器
  const updateTimer = () => {
    if (!loveConfig?.startDate) return null;
    
    const start = new Date(loveConfig.startDate);
    const now = new Date();
    const diff = now.getTime() - start.getTime();
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    setLoveDuration({ days, hours, minutes, seconds });

    // 如果秒数变化，触发动画
    if (prevSecondsRef.current !== seconds) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
      prevSecondsRef.current = seconds;
    }
  };

  // 格式化数字，保证两位数显示
  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  // 自动更新时间
  useEffect(() => {
    // 立即更新一次
    updateTimer();
    
    // 设置定时器
    timerRef.current = window.setInterval(updateTimer, 1000);
    
    // 清理定时器
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // 获取头像配置，根据 swap 参数决定顺序
  const avatarConfig = () => {
    if (!loveConfig?.avatars) return null;
    
    const { boy, girl } = loveConfig.avatars;
    const swap = loveConfig.swap || false;
    
    return swap ? [girl, boy] : [boy, girl];
  };

  const avatars = avatarConfig();

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* 双方头像展示 */}
      {avatars && (
        <div className="flex items-center justify-center gap-6 md:gap-8 mb-6 w-full">
          <div className="flex flex-col items-center transform transition-transform duration-300 hover:scale-110">
            <div className="relative">
              <img 
                src={avatars[0].url} 
                alt={avatars[0].name} 
                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-primary shadow-lg transition-all duration-300 hover:shadow-xl"
              />
            </div>
            <span className="mt-2 text-base md:text-xl font-medium">{avatars[0].name}</span>
          </div>
          
          <div className="text-3xl md:text-5xl text-primary transform transition-transform duration-300 hover:scale-110 heart-wave">
            <i className="ri-heart-fill"></i>
          </div>
          
          <div className="flex flex-col items-center transform transition-transform duration-300 hover:scale-110">
            <div className="relative">
              <img 
                src={avatars[1].url} 
                alt={avatars[1].name} 
                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-primary shadow-lg transition-all duration-300 hover:shadow-xl"
              />
            </div>
            <span className="mt-2 text-base md:text-xl font-medium">{avatars[1].name}</span>
          </div>
        </div>
      )}

      {/* 分隔线 */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent my-4"></div>

      {/* 恋爱计时 */}
      {loveDuration && (
        <div className="flex flex-col items-center justify-center w-full">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">我们已经在一起</h2>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 w-full">
            <div className="flex flex-col items-center backdrop-blur-md bg-white/70 dark:bg-dark-300/60 rounded-lg p-4 md:p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
              <span 
                className={`text-3xl md:text-5xl font-bold text-primary transition-all duration-300 ${isAnimating ? 'scale-110' : ''}`}
              >
                {loveDuration.days}
              </span>
              <span className="text-sm md:text-base text-gray-600 dark:text-gray-300">天</span>
            </div>
            <div className="flex flex-col items-center backdrop-blur-md bg-white/70 dark:bg-dark-300/60 rounded-lg p-4 md:p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
              <span 
                className={`text-3xl md:text-5xl font-bold text-primary transition-all duration-300 ${isAnimating ? 'scale-110' : ''}`}
              >
                {formatNumber(loveDuration.hours)}
              </span>
              <span className="text-sm md:text-base text-gray-600 dark:text-gray-300">时</span>
            </div>
            <div className="flex flex-col items-center backdrop-blur-md bg-white/70 dark:bg-dark-300/60 rounded-lg p-4 md:p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
              <span 
                className={`text-3xl md:text-5xl font-bold text-primary transition-all duration-300 ${isAnimating ? 'scale-110' : ''}`}
              >
                {formatNumber(loveDuration.minutes)}
              </span>
              <span className="text-sm md:text-base text-gray-600 dark:text-gray-300">分</span>
            </div>
            <div className="flex flex-col items-center backdrop-blur-md bg-white/70 dark:bg-dark-300/60 rounded-lg p-4 md:p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
              <span 
                className={`text-3xl md:text-5xl font-bold text-primary transition-all duration-300 ${isAnimating ? 'scale-110' : ''}`}
              >
                {formatNumber(loveDuration.seconds)}
              </span>
              <span className="text-sm md:text-base text-gray-600 dark:text-gray-300">秒</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage; 