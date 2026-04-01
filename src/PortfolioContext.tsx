import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioData } from './types';
import { INITIAL_DATA } from './constants';

interface PortfolioContextType {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
  updateData: (path: string, value: any) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const deepMerge = (target: any, source: any) => {
  if (!target || typeof target !== 'object' || Array.isArray(target)) {
    return { ...source };
  }
  
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (!target[key] || typeof target[key] !== 'object' || Array.isArray(target[key])) {
        target[key] = {};
      }
      deepMerge(target[key], source[key]);
    } else {
      if (target[key] === undefined) {
        target[key] = source[key];
      }
    }
  }
  return target;
};

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    const saved = localStorage.getItem('portfolio_data');
    if (!saved) return INITIAL_DATA;
    try {
      const parsed = JSON.parse(saved);
      // Deep merge with INITIAL_DATA to ensure all fields exist
      const merged = deepMerge({ ...parsed }, INITIAL_DATA);
      
      // Auto-update name and email if they are the old defaults
      if (merged.name === "홍길동") merged.name = "임해림";
      if (merged.contact.email === "md_portfolio@example.com") merged.contact.email = "healim020624@naver.com";
      
      return merged;
    } catch (e) {
      return INITIAL_DATA;
    }
  });

  useEffect(() => {
    localStorage.setItem('portfolio_data', JSON.stringify(data));
  }, [data]);

  const updateData = (path: string, value: any) => {
    const keys = path.split('.');
    
    const updateRecursive = (obj: any, keys: string[], value: any): any => {
      const [first, ...rest] = keys;
      if (rest.length === 0) {
        return { ...obj, [first]: value };
      }
      return {
        ...obj,
        [first]: updateRecursive(obj[first] || {}, rest, value)
      };
    };

    setData(prev => updateRecursive(prev, keys, value));
  };

  return (
    <PortfolioContext.Provider value={{ data, setData, updateData }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
