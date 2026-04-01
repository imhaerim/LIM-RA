import React from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '../PortfolioContext';

export const Insights: React.FC = () => {
  const { data } = usePortfolio();
  return (
    <section id="insights" className="py-32 bg-beige/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-16 items-start">
          <div className="lg:col-span-4">
            <span className="text-[12px] font-bold tracking-[0.3em] text-ink/40 uppercase block mb-8">06 / Data Insight</span>
            <h2 className="text-4xl font-bold leading-tight mb-12">데이터는 고객의 생각을<br/>가장 솔직하게 보여줍니다</h2>
            
            <div className="flex flex-wrap gap-3 mb-12">
              {(data.insights.metrics || []).map((metric, i) => (
                <span key={i} className="px-4 py-2 border border-ink/10 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {metric}
                </span>
              ))}
            </div>

            <p className="text-2xl font-bold italic text-ink/80 border-l-4 border-pink pl-6 py-2">
              {data.insights.quote}
            </p>
          </div>
          
          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 gap-6">
              {(data.insights.items || []).map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-12 space-y-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-bold text-pink">{item.title}</h3>
                  <p className="text-2xl font-bold leading-snug">{item.content}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
