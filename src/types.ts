export interface Stat {
  label: string;
  value: string;
}

export interface Strength {
  id: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  id: string;
  title: string;
  content: string;
}

export interface Project {
  id: string;
  title: string;
  problem: string;
  analysis: string;
  insight: string;
  execution: string;
  result: string;
  imageUrls: string[];
  quote?: string;
}

export interface DesignItem {
  id: string;
  title: string;
  description: string;
  beforeUrl: string;
  afterUrl: string;
  quote?: string;
}

export interface PortfolioData {
  name: string;
  hero: {
    title: string;
    subtitle: string;
    stats: Stat[];
    imageUrl: string;
    englishTitle: string;
  };
  about: {
    definition: string;
    story: string;
    strengths: Strength[];
  };
  process: {
    steps: ProcessStep[];
    quote: string;
  };
  projects: Project[];
  design: {
    title: string;
    description: string;
    items: DesignItem[];
    quote: string;
  };
  insights: {
    metrics: string[];
    items: { title: string; content: string }[];
    quote: string;
  };
  conclusion: {
    title: string;
    content: string;
  };
  contact: {
    email: string;
    phone: string;
  };
}
