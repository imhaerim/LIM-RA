import React from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '../PortfolioContext';

export const Design: React.FC = () => {
  const { data } = usePortfolio();
  return (
    <section id="design" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-16 items-start mb-32">
          <div className="lg:col-span-4">
            <span className="text-[12px] font-bold tracking-[0.3em] text-ink/40 uppercase block mb-8">05 / Design</span>
            <h2 className="text-4xl font-bold leading-tight mb-12 whitespace-pre-line">{data.design.description}</h2>
            <p className="text-2xl font-bold italic text-ink/80 border-l-4 border-pink pl-6 py-2">
              {data.design.quote}
            </p>
          </div>
          
          <div className="lg:col-span-6">
            <div className="space-y-32">
              {(data.design.items || []).map((item, i) => (
                <div key={item.id || i} className="space-y-12">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">{item.title}</h3>
                    <p className="text-lg text-ink/60">{item.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <span className="text-[10px] uppercase tracking-widest text-ink/40 block text-center">Before</span>
                      <div className="aspect-[3/4] overflow-hidden bg-beige/50 grayscale opacity-40">
                        <img src={item.beforeUrl} alt="Before" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <span className="text-[10px] uppercase tracking-widest text-ink/40 block text-center">After</span>
                      <div className="aspect-[3/4] overflow-hidden bg-beige shadow-2xl">
                        <img src={item.afterUrl} alt="After" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
