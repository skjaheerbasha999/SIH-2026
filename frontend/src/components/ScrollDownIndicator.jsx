import React, { useEffect, useState } from 'react';

export const ScrollDownIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      } z-20`}
    >
      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 hidden sm:block">Scroll</span>
      <div className="w-6 h-10 rounded-full border-2 border-emerald-200/60 flex justify-center items-start p-1 bg-white/50 backdrop-blur-sm shadow-sm">
        <div className="w-1 h-2.5 bg-[#00a86b] rounded-full animate-bounce mt-1" />
      </div>
    </div>
  );
};
