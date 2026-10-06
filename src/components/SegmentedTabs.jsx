import React from 'react';
import { 
  BarChart3, 
  GraduationCap, 
  Globe2, 
  PlaneTakeoff, 
  MapPin, 
  Table2, 
  Database,
  Building2
} from 'lucide-react';

export default function SegmentedTabs({ activeTab, setActiveTab, counts }) {
  const tabs = [
    {
      id: 'overview',
      label: 'Visión General',
      icon: BarChart3,
      count: counts.total,
      color: 'blue'
    },
    {
      id: 'entrante-nacional',
      label: 'Entrantes Nacionales',
      icon: Building2,
      count: counts.entranteNac,
      badge: 'Nacional'
    },
    {
      id: 'entrante-internacional',
      label: 'Entrantes Internacionales',
      icon: Globe2,
      count: counts.entranteInter,
      badge: 'Internacional'
    },
    {
      id: 'saliente-nacional',
      label: 'Salientes Nacionales',
      icon: GraduationCap,
      count: counts.salienteNac,
      badge: 'Nacional'
    },
    {
      id: 'saliente-internacional',
      label: 'Salientes Internacionales',
      icon: PlaneTakeoff,
      count: counts.salienteInter,
      badge: 'Internacional'
    },
    {
      id: 'regional',
      label: 'Movilidad Regional',
      icon: MapPin,
      count: counts.regional,
      badge: 'Regional'
    },
    {
      id: 'matrix',
      label: 'Matriz de Actividades',
      icon: Table2,
      count: null
    },
    {
      id: 'database',
      label: 'Base de Datos (CRUD)',
      icon: Database,
      count: counts.total
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-3">
      {/* Apple style pill segmented control */}
      <div className="flex p-1.5 space-x-1.5 bg-zinc-200/70 dark:bg-zinc-800/60 rounded-2xl overflow-x-auto no-scrollbar shadow-inner backdrop-blur-md">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`apple-press flex items-center shrink-0 space-x-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 shadow-sm shadow-zinc-950/5 ring-1 ring-zinc-950/5 dark:ring-white/10'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-white/40 dark:hover:bg-zinc-700/30'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-400'}`} />
              <span className="whitespace-nowrap">{tab.label}</span>
              {tab.count !== null && (
                <span
                  className={`ml-1 text-[11px] px-1.5 py-0.5 rounded-full font-semibold transition-colors ${
                    isActive
                      ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
                      : 'bg-zinc-300/60 dark:bg-zinc-700/60 text-zinc-600 dark:text-zinc-300'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
