import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, X, Lock, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { usePortfolio } from '../PortfolioContext';
import { INITIAL_DATA } from '../constants';
import { toast } from 'sonner';

const compressImage = (file: File, maxWidth = 1200, quality = 0.8): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('Canvas context unavailable'));
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = reader.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const { data, setData, updateData } = usePortfolio();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1111') {
      setIsAuthenticated(true);
      setPassword('');
      toast.success('관리자로 로그인되었습니다.');
    } else {
      toast.error('비밀번호가 틀렸습니다.');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, projectIdx: number) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file: File) => {
      compressImage(file).then(base64String => {
        setData(prev => {
          const newProjects = [...prev.projects];
          newProjects[projectIdx] = {
            ...newProjects[projectIdx],
            imageUrls: [...(newProjects[projectIdx].imageUrls || []), base64String]
          };
          return { ...prev, projects: newProjects };
        });
      }).catch(() => toast.error('이미지 업로드 실패'));
    });
    e.target.value = '';
  };

  const removeImage = (projectIdx: number, imageIdx: number) => {
    setData(prev => {
      const newProjects = [...prev.projects];
      const newImageUrls = [...newProjects[projectIdx].imageUrls];
      newImageUrls.splice(imageIdx, 1);
      newProjects[projectIdx] = {
        ...newProjects[projectIdx],
        imageUrls: newImageUrls
      };
      return { ...prev, projects: newProjects };
    });
  };

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-sm font-bold uppercase tracking-widest border-l-4 border-[#1a1a1a] pl-4 mb-6">{children}</h3>
  );

  const Label = ({ children }: { children: React.ReactNode }) => (
    <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 block mb-2">{children}</label>
  );

  const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input 
      {...props}
      className="w-full px-4 py-3 bg-[#f5f2ed] rounded-lg border border-[#1a1a1a]/10 focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]/20 transition-all"
    />
  );

  const TextArea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
    <textarea 
      {...props}
      className="w-full px-4 py-3 bg-[#f5f2ed] rounded-lg border border-[#1a1a1a]/10 h-24 focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]/20 transition-all"
    />
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white w-full max-w-5xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-[#1a1a1a]/10 flex items-center justify-between bg-[#f5f2ed]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#1a1a1a] text-white rounded-lg">
                  <Settings size={20} />
                </div>
                <h2 className="text-xl font-bold">Admin Management</h2>
              </div>
              <div className="flex items-center gap-4">
                {isAuthenticated && (
                  <button 
                    onClick={() => setIsAuthenticated(false)}
                    className="px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-black/5 rounded-lg transition-colors"
                  >
                    Logout
                  </button>
                )}
                <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 bg-white">
              {!isAuthenticated ? (
                <div className="max-w-sm mx-auto py-20 text-center">
                  <Lock size={48} className="mx-auto mb-6 text-[#1a1a1a]/20" />
                  <h3 className="text-2xl mb-8">관리자 인증이 필요합니다</h3>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <input 
                      type="password" 
                      placeholder="비밀번호를 입력하세요" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-6 py-4 bg-[#f5f2ed] border border-[#1a1a1a]/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]/20"
                    />
                    <button type="submit" className="w-full py-4 bg-[#1a1a1a] text-white rounded-xl font-bold hover:opacity-90 transition-opacity">
                      인증하기
                    </button>
                  </form>
                </div>
              ) : (
                <div className="space-y-16">
                  {/* Hero Section */}
                  <div className="space-y-8">
                    <SectionTitle>Hero Section</SectionTitle>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label>Hero Image</Label>
                          <div className="flex items-center gap-4">
                            <div className="w-24 h-24 rounded-lg overflow-hidden border border-[#1a1a1a]/10 bg-[#f5f2ed]">
                              <img src={data.hero.imageUrl} alt="" className="w-full h-full object-cover" />
                            </div>
                            <label className="px-4 py-2 bg-[#1a1a1a] text-white rounded-lg text-xs cursor-pointer hover:opacity-90 transition-opacity flex items-center gap-2">
                              <ImageIcon size={14} /> Change Image
                              <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    compressImage(file).then(base64 => {
                                      updateData('hero.imageUrl', base64);
                                    }).catch(() => toast.error('이미지 업로드 실패'));
                                    e.target.value = '';
                                  }
                                }}
                              />
                            </label>
                          </div>
                        </div>
                        <div>
                          <Label>Name</Label>
                          <Input value={data.name} onChange={(e) => updateData('name', e.target.value)} />
                        </div>
                        <div>
                          <Label>English Title</Label>
                          <Input value={data.hero.englishTitle} onChange={(e) => updateData('hero.englishTitle', e.target.value)} />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label>Main Title</Label>
                          <Input value={data.hero.title} onChange={(e) => updateData('hero.title', e.target.value)} />
                        </div>
                        <div>
                          <Label>Subtitle</Label>
                          <TextArea value={data.hero.subtitle} onChange={(e) => updateData('hero.subtitle', e.target.value)} />
                        </div>
                        <div>
                          <Label>Stats</Label>
                          <div className="grid grid-cols-3 gap-3">
                            {(data.hero.stats || []).map((stat, idx) => (
                              <div key={idx} className="space-y-2">
                                <input 
                                  value={stat.label}
                                  placeholder="Label"
                                  onChange={(e) => {
                                    const newStats = [...data.hero.stats];
                                    newStats[idx].label = e.target.value;
                                    updateData('hero.stats', newStats);
                                  }}
                                  className="w-full px-3 py-2 bg-[#f5f2ed] rounded-lg border border-[#1a1a1a]/10 text-[10px]"
                                />
                                <input 
                                  value={stat.value}
                                  placeholder="Value"
                                  onChange={(e) => {
                                    const newStats = [...data.hero.stats];
                                    newStats[idx].value = e.target.value;
                                    updateData('hero.stats', newStats);
                                  }}
                                  className="w-full px-3 py-2 bg-[#f5f2ed] rounded-lg border border-[#1a1a1a]/10 text-xs font-bold"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* About Section */}
                  <div className="space-y-8">
                    <SectionTitle>About Section</SectionTitle>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label>Definition</Label>
                          <TextArea value={data.about.definition} onChange={(e) => updateData('about.definition', e.target.value)} />
                        </div>
                        <div>
                          <Label>Story</Label>
                          <TextArea value={data.about.story} onChange={(e) => updateData('about.story', e.target.value)} className="h-40" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <Label>Strengths</Label>
                        {(data.about.strengths || []).map((strength, idx) => (
                          <div key={idx} className="p-4 bg-[#f5f2ed] rounded-xl border border-[#1a1a1a]/10 space-y-2">
                            <input 
                              value={strength.title}
                              onChange={(e) => {
                                const newStrengths = [...data.about.strengths];
                                newStrengths[idx].title = e.target.value;
                                updateData('about.strengths', newStrengths);
                              }}
                              className="w-full bg-transparent font-bold text-sm focus:outline-none"
                              placeholder="Strength Title"
                            />
                            <textarea 
                              value={strength.description}
                              onChange={(e) => {
                                const newStrengths = [...data.about.strengths];
                                newStrengths[idx].description = e.target.value;
                                updateData('about.strengths', newStrengths);
                              }}
                              className="w-full bg-transparent text-xs h-16 focus:outline-none resize-none"
                              placeholder="Strength Description"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Process Section */}
                  <div className="space-y-8">
                    <SectionTitle>Process Section</SectionTitle>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label>Quote</Label>
                        <TextArea value={data.process.quote} onChange={(e) => updateData('process.quote', e.target.value)} />
                      </div>
                      <div className="space-y-4">
                        <Label>Steps</Label>
                        {(data.process.steps || []).map((step, idx) => (
                          <div key={idx} className="p-4 bg-[#f5f2ed] rounded-xl border border-[#1a1a1a]/10 space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold text-[#1a1a1a]/40">STEP {idx + 1}</span>
                              <input 
                                value={step.title}
                                onChange={(e) => {
                                  const newSteps = [...data.process.steps];
                                  newSteps[idx] = { ...newSteps[idx], title: e.target.value };
                                  updateData('process.steps', newSteps);
                                }}
                                className="flex-1 bg-transparent font-bold text-xs focus:outline-none"
                                placeholder="Step Title"
                              />
                            </div>
                            <textarea 
                              value={step.content}
                              onChange={(e) => {
                                const newSteps = [...data.process.steps];
                                newSteps[idx] = { ...newSteps[idx], content: e.target.value };
                                updateData('process.steps', newSteps);
                              }}
                              className="w-full bg-transparent text-[11px] h-12 focus:outline-none resize-none"
                              placeholder="Step Content"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Projects Section */}
                  <div className="space-y-8">
                    <div className="flex items-center justify-between mb-6">
                      <SectionTitle>Projects</SectionTitle>
                      <button 
                        onClick={() => {
                          const newProject = {
                            id: Date.now().toString(),
                            title: "New Project",
                            quote: "",
                            problem: "",
                            analysis: "",
                            insight: "",
                            execution: "",
                            result: "",
                            imageUrls: []
                          };
                          setData({ ...data, projects: [...data.projects, newProject] });
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] text-white rounded-lg text-xs hover:opacity-90 transition-opacity"
                      >
                        <Plus size={14} /> Add Project
                      </button>
                    </div>
                    
                    <div className="space-y-12">
                      {(data.projects || []).map((project, idx) => (
                        <div key={project.id || idx} className="p-8 border border-[#1a1a1a]/10 rounded-3xl bg-[#f5f2ed]/30 space-y-6">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold text-[#1a1a1a]/40 tracking-widest">PROJECT #{idx + 1}</span>
                            <button 
                              onClick={() => {
                                const newProjects = data.projects.filter(p => p.id !== project.id);
                                setData({ ...data, projects: newProjects });
                              }}
                              className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div>
                                <Label>Project Title</Label>
                                <Input 
                                  value={project.title}
                                  onChange={(e) => {
                                    const newProjects = [...data.projects];
                                    newProjects[idx].title = e.target.value;
                                    setData({ ...data, projects: newProjects });
                                  }}
                                />
                              </div>
                              <div>
                                <Label>Project Quote</Label>
                                <Input 
                                  value={project.quote}
                                  onChange={(e) => {
                                    const newProjects = [...data.projects];
                                    newProjects[idx].quote = e.target.value;
                                    setData({ ...data, projects: newProjects });
                                  }}
                                />
                              </div>
                              <div>
                                <Label>Problem</Label>
                                <TextArea 
                                  value={project.problem}
                                  onChange={(e) => {
                                    const newProjects = [...data.projects];
                                    newProjects[idx].problem = e.target.value;
                                    setData({ ...data, projects: newProjects });
                                  }}
                                />
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div>
                                <Label>Images (Multiple Upload)</Label>
                                <div className="flex flex-wrap gap-3 mb-4">
                                  {project.imageUrls?.map((url, imgIdx) => (
                                    <div key={imgIdx} className="relative w-20 h-20 rounded-lg overflow-hidden border border-[#1a1a1a]/10 group">
                                      <img src={url} alt="" className="w-full h-full object-cover" />
                                      <button 
                                        onClick={() => removeImage(idx, imgIdx)}
                                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                      >
                                        <X size={10} />
                                      </button>
                                    </div>
                                  ))}
                                  <label className="w-20 h-20 rounded-lg border-2 border-dashed border-[#1a1a1a]/20 flex flex-col items-center justify-center cursor-pointer hover:bg-[#1a1a1a]/5 transition-colors">
                                    <Plus size={18} className="text-[#1a1a1a]/40" />
                                    <span className="text-[8px] font-bold text-[#1a1a1a]/40 mt-1">UPLOAD</span>
                                    <input 
                                      type="file" 
                                      multiple 
                                      accept="image/*" 
                                      className="hidden" 
                                      onChange={(e) => handleFileUpload(e, idx)}
                                    />
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <Label>Analysis</Label>
                              <TextArea 
                                value={project.analysis}
                                onChange={(e) => {
                                  const newProjects = [...data.projects];
                                  newProjects[idx].analysis = e.target.value;
                                  setData({ ...data, projects: newProjects });
                                }}
                              />
                            </div>
                            <div>
                              <Label>Insight</Label>
                              <TextArea 
                                value={project.insight}
                                onChange={(e) => {
                                  const newProjects = [...data.projects];
                                  newProjects[idx].insight = e.target.value;
                                  setData({ ...data, projects: newProjects });
                                }}
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <Label>Execution</Label>
                              <TextArea 
                                value={project.execution}
                                onChange={(e) => {
                                  const newProjects = [...data.projects];
                                  newProjects[idx].execution = e.target.value;
                                  setData({ ...data, projects: newProjects });
                                }}
                              />
                            </div>
                            <div>
                              <Label>Result</Label>
                              <TextArea 
                                value={project.result}
                                onChange={(e) => {
                                  const newProjects = [...data.projects];
                                  newProjects[idx].result = e.target.value;
                                  setData({ ...data, projects: newProjects });
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Design Section */}
                  <div className="space-y-8">
                    <div className="flex items-center justify-between mb-6">
                      <SectionTitle>Design Proof</SectionTitle>
                      <button 
                        onClick={() => {
                          const newItem = {
                            id: Date.now().toString(),
                            title: "New Design",
                            description: "",
                            beforeUrl: "https://picsum.photos/seed/before/800/400",
                            afterUrl: "https://picsum.photos/seed/after/800/400"
                          };
                          setData({ ...data, design: { ...data.design, items: [...data.design.items, newItem] } });
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] text-white rounded-lg text-xs hover:opacity-90 transition-opacity"
                      >
                        <Plus size={14} /> Add Design
                      </button>
                    </div>
                    <div className="mb-8">
                      <Label>Design Quote</Label>
                      <TextArea value={data.design.quote} onChange={(e) => updateData('design.quote', e.target.value)} />
                    </div>
                    
                    <div className="space-y-12">
                      {(data.design.items || []).map((item, idx) => (
                        <div key={item.id || idx} className="p-8 border border-[#1a1a1a]/10 rounded-3xl bg-[#f5f2ed]/30 space-y-6">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold text-[#1a1a1a]/40 tracking-widest">DESIGN #{idx + 1}</span>
                            <button 
                              onClick={() => {
                                const newItems = data.design.items.filter(d => d.id !== item.id);
                                setData({ ...data, design: { ...data.design, items: newItems } });
                              }}
                              className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <Label>Title</Label>
                              <Input 
                                value={item.title}
                                onChange={(e) => {
                                  const newItems = [...data.design.items];
                                  newItems[idx].title = e.target.value;
                                  setData({ ...data, design: { ...data.design, items: newItems } });
                                }}
                              />
                            </div>
                            <div>
                              <Label>Description</Label>
                              <Input 
                                value={item.description}
                                onChange={(e) => {
                                  const newItems = [...data.design.items];
                                  newItems[idx].description = e.target.value;
                                  setData({ ...data, design: { ...data.design, items: newItems } });
                                }}
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                              <Label>Before Image</Label>
                              <div className="flex items-center gap-4">
                                <div className="w-24 h-24 rounded-lg overflow-hidden border border-[#1a1a1a]/10 bg-white">
                                  <img src={item.beforeUrl} alt="" className="w-full h-full object-cover" />
                                </div>
                                <label className="px-4 py-2 bg-[#1a1a1a] text-white rounded-lg text-xs cursor-pointer hover:opacity-90">
                                  Upload
                                  <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="hidden" 
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        compressImage(file).then(base64 => {
                                          setData(prev => {
                                            const newItems = prev.design.items.map((item, i) =>
                                              i === idx ? { ...item, beforeUrl: base64 } : item
                                            );
                                            return { ...prev, design: { ...prev.design, items: newItems } };
                                          });
                                        }).catch(() => toast.error('이미지 업로드 실패'));
                                        e.target.value = '';
                                      }
                                    }}
                                  />
                                </label>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <Label>After Image</Label>
                              <div className="flex items-center gap-4">
                                <div className="w-24 h-24 rounded-lg overflow-hidden border border-[#1a1a1a]/10 bg-white">
                                  <img src={item.afterUrl} alt="" className="w-full h-full object-cover" />
                                </div>
                                <label className="px-4 py-2 bg-[#1a1a1a] text-white rounded-lg text-xs cursor-pointer hover:opacity-90">
                                  Upload
                                  <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="hidden" 
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        compressImage(file).then(base64 => {
                                          setData(prev => {
                                            const newItems = prev.design.items.map((item, i) =>
                                              i === idx ? { ...item, afterUrl: base64 } : item
                                            );
                                            return { ...prev, design: { ...prev.design, items: newItems } };
                                          });
                                        }).catch(() => toast.error('이미지 업로드 실패'));
                                        e.target.value = '';
                                      }
                                    }}
                                  />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Insights Section */}
                  <div className="space-y-8">
                    <SectionTitle>Insights Section</SectionTitle>
                    <div className="space-y-6">
                      <div>
                        <Label>Insights Quote</Label>
                        <TextArea value={data.insights.quote} onChange={(e) => updateData('insights.quote', e.target.value)} />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <Label>Metrics (Comma separated)</Label>
                          <Input 
                            value={data.insights.metrics.join(', ')}
                            onChange={(e) => {
                              const newMetrics = e.target.value.split(',').map(s => s.trim());
                              updateData('insights.metrics', newMetrics);
                            }}
                          />
                        </div>
                        <div className="space-y-4">
                          <Label>Key Insights</Label>
                          {(data.insights.items || []).map((item, idx) => (
                            <div key={idx} className="p-4 bg-[#f5f2ed] rounded-xl border border-[#1a1a1a]/10 space-y-2">
                              <input 
                                value={item.title}
                                onChange={(e) => {
                                  const newItems = [...data.insights.items];
                                  newItems[idx].title = e.target.value;
                                  updateData('insights.items', newItems);
                                }}
                                className="w-full bg-transparent font-bold text-sm focus:outline-none"
                                placeholder="Insight Title"
                              />
                              <textarea 
                                value={item.content}
                                onChange={(e) => {
                                  const newItems = [...data.insights.items];
                                  newItems[idx].content = e.target.value;
                                  updateData('insights.items', newItems);
                                }}
                                className="w-full bg-transparent text-xs h-16 focus:outline-none resize-none"
                                placeholder="Insight Content"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Conclusion Section */}
                  <div className="space-y-8">
                    <SectionTitle>Conclusion Section</SectionTitle>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label>Title</Label>
                        <Input value={data.conclusion.title} onChange={(e) => updateData('conclusion.title', e.target.value)} />
                      </div>
                      <div>
                        <Label>Content</Label>
                        <TextArea value={data.conclusion.content} onChange={(e) => updateData('conclusion.content', e.target.value)} />
                      </div>
                    </div>
                  </div>

                  {/* Contact Section */}
                  <div className="space-y-8">
                    <SectionTitle>Contact Section</SectionTitle>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label>Email</Label>
                        <Input value={data.contact.email} onChange={(e) => updateData('contact.email', e.target.value)} />
                      </div>
                      <div>
                        <Label>Phone</Label>
                        <Input value={data.contact.phone} onChange={(e) => updateData('contact.phone', e.target.value)} />
                      </div>
                    </div>
                  </div>

                  <div className="pt-12 border-t border-[#1a1a1a]/10 space-y-4">
                    <button 
                      onClick={() => {
                        if (window.confirm('모든 데이터를 초기 상태로 되돌리시겠습니까? (현재 저장된 모든 내용이 삭제됩니다)')) {
                          setData(INITIAL_DATA);
                          toast.success('초기화되었습니다.');
                        }
                      }}
                      className="w-full py-4 bg-red-50 text-red-600 rounded-2xl font-bold hover:bg-red-100 transition-colors border border-red-200"
                    >
                      기본 데이터로 초기화
                    </button>
                    <button 
                      onClick={() => {
                        toast.success('성공적으로 저장되었습니다.');
                        onClose();
                      }}
                      className="w-full py-6 bg-[#1a1a1a] text-white rounded-2xl font-bold text-lg hover:opacity-90 transition-opacity shadow-xl"
                    >
                      변경사항 저장 및 닫기
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
