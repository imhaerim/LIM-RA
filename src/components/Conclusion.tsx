import React from 'react';
import { usePortfolio } from '../PortfolioContext';

export const Conclusion: React.FC = () => {
  const { data } = usePortfolio();
  return (
    <section id="conclusion" className="py-48 bg-ink text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-16 items-center">
          <div className="lg:col-span-4">
            <span className="text-[12px] font-bold tracking-[0.3em] text-white/40 uppercase block mb-8">07 / Conclusion</span>
            <h2 className="text-4xl font-bold leading-tight">{data.conclusion.title}</h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-3xl font-bold leading-relaxed whitespace-pre-line">
              {data.conclusion.content}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
