import React from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '../PortfolioContext';

export const Projects: React.FC = () => {
  const { data } = usePortfolio();
  return (
    <section id="projects" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24">
          <span className="text-[12px] font-bold tracking-[0.3em] text-ink/40 uppercase block mb-4">04 / Projects</span>
          <h2 className="text-5xl font-bold">핵심 프로젝트 성과</h2>
        </div>

        <div className="space-y-48">
          {(data.projects || []).map((project, i) => (
            <div key={project.id || i} className="grid grid-cols-1 lg:grid-cols-10 gap-16 items-start">
              {/* Left 40% */}
              <div className="lg:col-span-4 space-y-12">
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold leading-tight">{project.title}</h3>
                  <p className="text-xl font-bold text-pink italic">
                    {project.quote}
                  </p>
                </div>

                <div className="space-y-10 border-t border-ink/10 pt-10">
                  <div className="grid grid-cols-1 gap-8">
                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest text-ink/40 mb-2">Problem</h4>
                      <p className="text-sm text-ink/80 font-medium">{project.problem}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest text-ink/40 mb-2">Analysis</h4>
                      <p className="text-sm text-ink/80">{project.analysis}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest text-ink/40 mb-2">Insight</h4>
                      <p className="text-sm text-ink/80">{project.insight}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest text-ink/40 mb-2">Execution</h4>
                      <p className="text-sm text-ink/80 whitespace-pre-line">{project.execution}</p>
                    </div>
                    <div className="bg-beige/50 p-6 rounded-lg">
                      <h4 className="text-[10px] uppercase tracking-widest text-ink/40 mb-2">Result</h4>
                      <p className="text-xl font-bold text-ink">{project.result}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right 60% */}
              <div className="lg:col-span-6">
                <div className="grid grid-cols-1 gap-6">
                  {(project.imageUrls || []).map((url, imgIdx) => (
                    <motion.div 
                      key={imgIdx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="relative aspect-[4/3] overflow-hidden bg-beige"
                    >
                      <img 
                        src={url} 
                        alt={`${project.title} ${imgIdx + 1}`} 
                        className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
