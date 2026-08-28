import React from 'react';
import { ExternalLink, FolderGit2 } from 'lucide-react';
import { portfolioData, type Project } from '../config/portfolioData';

export const ProjectsApp: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-1">
      {portfolioData.projects.map((project: Project) => (
        <div key={project.id} className="bg-slate-950/60 rounded-xl border border-slate-700/50 overflow-hidden group shadow-lg flex flex-col">
          <div className="relative h-32 overflow-hidden border-b border-slate-700/50">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent"/>
          </div>
          
          <div className="p-4 flex-1 flex flex-col">
            <h3 className="text-base font-semibold text-slate-100 mb-1.5">{project.title}</h3>
            <p className="text-xs text-slate-400 mb-3 flex-1">{project.description}</p>
            
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tech.map(t => (
                <span key={t} className="text-[10px] font-medium bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700/60">
                  {t}
                </span>
              ))}
            </div>
            
            <div className="flex items-center gap-2.5 pt-3 border-t border-slate-800">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition">
                <FolderGit2 size={14} />
                Code
              </a>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-200 transition">
                  <ExternalLink size={14} />
                  Live Demo
                </a>
              )}
               <span className="ml-auto text-xs font-mono text-slate-600">ID: {project.id}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};