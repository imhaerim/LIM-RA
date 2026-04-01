import React from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '../PortfolioContext';

export const About: React.FC = () => {
  const { data } = usePortfolio();
  return (
    <section id="about" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* About Me Section */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-16 mb-40">
          <div className="lg:col-span-4">
            <span className="text-[12px] font-bold tracking-[0.3em] text-ink/40 uppercase block mb-8">01 / About Me</span>
            <h2 className="text-4xl font-bold leading-tight whitespace-pre-line">{data.about.definition}</h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-2xl font-medium leading-relaxed text-ink/80 mb-12">
              {data.about.story}
            </p>
          </div>
        </div>

        {/* My Strength Section */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-16">
          <div className="lg:col-span-4">
            <span className="text-[12px] font-bold tracking-[0.3em] text-ink/40 uppercase block mb-8">02 / My Strength</span>
            <h2 className="text-4xl font-bold leading-tight">합격용 문장으로 증명하는<br/>5가지 핵심 역량</h2>
          </div>
          <div className="lg:col-span-6">
            <div className="space-y-12">
              {(data.about.strengths || []).map((strength, i) => (
                <motion.div 
                  key={`${strength.id || i}-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group border-b border-ink/10 pb-12 last:border-0"
                >
                  <div className="flex items-start gap-8">
                    <span className="text-4xl font-bold text-ink/10 group-hover:text-pink transition-colors duration-500">
                      {(i + 1).toString().padStart(2, '0')}
                    </span>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold">{strength.title}</h3>
                      <p className="text-lg text-ink/60 leading-relaxed">{strength.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
