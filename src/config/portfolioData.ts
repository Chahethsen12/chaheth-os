export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  githubUrl: string;
  liveUrl?: string;
  image?: string;
}

export const portfolioData = {
  bio: "Computer Science Undergraduate | Full-Stack & AI Developer specializing in NLP, RAG systems, and structured React architecture.",
  skills: ["React", "TypeScript", "Tailwind CSS", "Zustand", "Framer Motion", "Node.js", "Express", "MongoDB", "Python", "DistilBERT", "TinyLlama"],
  projects: [
    {
      id: "safetext",
      title: "SafeText AI",
      description: "Dual-model framework using DistilBERT & TinyLlama for adversarial text normalization and content moderation.",
      tech: ["Python", "PyTorch", "Hugging Face", "NLP"],
      githubUrl: "https://github.com/Chahethsen12/SafeTextAI",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&auto=format&fit=crop&q=60"
    },
    {
      id: "mern-ecom",
      title: "MERN E-Commerce",
      description: "Full-stack platform with JWT authentication, Gemini API integration for product insights, and responsive UI.",
      tech: ["React", "MongoDB", "Express", "Node.js", "JWT"],
      githubUrl: "https://github.com/Chahethsen12/mern-ecom",
      image: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=400&auto=format&fit=crop&q=60"
    },
    {
      id: "chahethos",
      title: "ChahethOS",
      description: "Web-based portfolio operating system built with React, Vite, Tailwind & Zustand for a seamless desktop experience.",
      tech: ["React", "TypeScript", "TailwindCSS", "Zustand"],
      githubUrl: "https://github.com/Chahethsen12/chaheth-os",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&auto=format&fit=crop&q=60"
    },
  ] as Project[],
};