import React from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '../PortfolioContext';

export const Process: React.FC = () => {
  const { data } = usePortfolio();
  return (
    <section id="process" className="py-32 bg-beige/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-16 items-start">
          <div className="lg:col-span-4">
            <span className="text-[12px] font-bold tracking-[0.3em] text-ink/40 uppercase block mb-8">03 / Work Process</span>
            <h2 className="text-4xl font-bold leading-tight mb-12">핵심 페이지를 관통하는<br/>매출 최적화 프로세스</h2>
            <p className="text-2xl font-bold italic text-ink/80 border-l-4 border-pink pl-6 py-2">
              {data.process.quote}
            </p>
          </div>
          
          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 gap-4">
              {(data.process.steps || []).map((step, i) => (
                <motion.div 
                  key={step.id || i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-10 flex items-center justify-between group hover:bg-ink hover:text-white transition-all duration-500"
                >
                  <div className="flex items-center gap-10">
                    <span className="text-sm font-bold tracking-widest text-ink/20 group-hover:text-white/20">
                      {step.title}
                    </span>
                    <h3 className="text-xl font-bold">{step.content}</h3>
                  </div>
                  <div className="w-8 h-[1px] bg-ink/10 group-hover:bg-white/20"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
