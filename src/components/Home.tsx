import React from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '../PortfolioContext';

export const Home: React.FC = () => {
  const { data } = usePortfolio();
  return (
    <section id="home" className="min-h-screen flex items-center bg-white pt-20">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-10 gap-12 items-center">
        {/* Left 40% */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-4 space-y-12"
        >
          <div className="space-y-4">
            <span className="text-[12px] font-bold tracking-[0.3em] text-ink/40 uppercase block">
              {data.hero.subtitle}
            </span>
            <h1 className="text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight whitespace-pre-line">
              {data.hero.title}
            </h1>
            <p className="text-2xl font-bold text-ink/80">
              {data.name}
            </p>
            <p className="text-sm tracking-[0.1em] text-ink/60 uppercase italic">
              {data.hero.englishTitle}
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-8 border-t border-ink/10 pt-12">
            {(data.hero.stats || []).map((stat, i) => (
              <div key={i}>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-widest text-ink/40">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Right 60% */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="lg:col-span-6 relative aspect-[3/4] lg:aspect-[4/5] overflow-hidden bg-beige"
        >
          <img 
            src={data.hero.imageUrl} 
            alt="Main Portfolio" 
            className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 border-[24px] border-white pointer-events-none"></div>
        </motion.div>
      </div>
    </section>
  );
};
