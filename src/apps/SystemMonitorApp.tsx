import React, { useEffect } from 'react';
import { useWindowStore } from '../store/useWindowStore';
import { Cpu, MemoryStick, AlertTriangle } from 'lucide-react';

interface StatCardProps {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  value: number;
  unit: string;
  color: string;
  max: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, title, value, unit, color, max }) => {
  const percentage = Math.min(100, (value / max) * 100);
  const barColor = color === 'text-emerald-400' ? 'bg-emerald-500' : 'bg-red-500';

  return (
    <div className="bg-slate-950/60 rounded-xl p-5 border border-slate-700/50 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className={`flex items-center gap-2.5 font-semibold text-sm ${color}`}>
          <Icon size={16} />
          <span>{title}</span>
        </div>
        <span className="font-mono text-xl text-white">{value.toFixed(1)} <span className="text-xs text-slate-500">{unit}</span></span>
      </div>

      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700/60">
        <div style={{ width: `${percentage}%` }} className={`h-full ${barColor}`} />
      </div>
    </div>
  );
};

export const SystemMonitorApp: React.FC = () => {
  const { systemStats, updateSystemStats } = useWindowStore();

  useEffect(() => {
    const simulateStats = () => {
      const cpu = 5 + Math.random() * 25;
      const ram = 2.8 + Math.random() * 1.2;
      updateSystemStats({ cpu, ram });
    };
    simulateStats();
    const interval = setInterval(simulateStats, 3000);
    return () => clearInterval(interval);
  }, [updateSystemStats]);

  return (
    <div className="space-y-5 p-1">
      <StatCard icon={Cpu} title="CPU Utilization" value={systemStats.cpu} unit="%" color="text-emerald-400" max={100}/>
      <StatCard icon={MemoryStick} title="RAM Usage" value={systemStats.ram} unit="GB" color="text-red-400" max={16}/>

      <div className="flex items-center gap-3 p-4 bg-amber-950/50 border border-amber-800/60 rounded-lg text-amber-300">
        <AlertTriangle size={18} />
        <div className="text-xs">
           <p className="font-semibold mb-0.5">Network Simulation Active</p>
           <p className="text-amber-400/80">Incoming connections: 0. Latency: 0ms. (Mock Data)</p>
        </div>
      </div>
    </div>
  );
};