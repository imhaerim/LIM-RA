import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { usePortfolio } from '../PortfolioContext';

export const Contact: React.FC = () => {
  const { data } = usePortfolio();
  return (
    <section id="contact" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-16 items-start">
          <div className="lg:col-span-4">
            <span className="text-[12px] font-bold tracking-[0.3em] text-ink/40 uppercase block mb-8">08 / Contact</span>
            <h2 className="text-4xl font-bold leading-tight">함께 매출을 만들<br/>준비가 되어 있습니다</h2>
          </div>
          <div className="lg:col-span-6">
            <div className="space-y-12">
              <div className="flex items-center gap-8 group cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-beige flex items-center justify-center group-hover:bg-ink group-hover:text-white transition-all duration-500">
                  <Mail size={24} />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-ink/40 block mb-1">Email</span>
                  <p className="text-2xl font-bold">{data.contact.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-8 group cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-beige flex items-center justify-center group-hover:bg-ink group-hover:text-white transition-all duration-500">
                  <Phone size={24} />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-ink/40 block mb-1">Phone</span>
                  <p className="text-2xl font-bold">{data.contact.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
