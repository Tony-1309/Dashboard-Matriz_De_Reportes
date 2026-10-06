import React from 'react';
import { 
  Compass, 
  Moon, 
  Sun, 
  Download, 
  RotateCcw, 
  GraduationCap, 
  ShieldCheck,
  Globe
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { exportStudentsToExcel } from '../utils/exportExcel';

export default function Navbar({ 
  darkMode, 
  setDarkMode, 
  totalCount, 
  filteredCount, 
  students, 
  onResetData 
}) {
  const triggerConfetti = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.15 },
      colors: ['#0071e3', '#34c759', '#ff9500', '#af52de']
    });
  };

  const handleExport = () => {
    exportStudentsToExcel(students, 'Consolidado_Estudiantes_Presenciales_ORI_Mariana.xlsx');
    triggerConfetti();
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-header transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Branding & Title */}
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Compass className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base sm:text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                ORI Mariana
              </h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/40">
                2026-1
              </span>
              <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/40">
                Solo Presencial
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-normal">
              Tablero Dinámico de Movilidad Estudiantil Presencial
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Record counter pill */}
          <div className="hidden sm:flex items-center px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/60 dark:border-zinc-700/50 text-xs text-zinc-700 dark:text-zinc-300">
            <GraduationCap className="w-3.5 h-3.5 mr-1.5 text-blue-600 dark:text-blue-400" />
            <span className="font-semibold">{filteredCount}</span>
            {filteredCount !== totalCount && (
              <span className="text-zinc-400 dark:text-zinc-500 ml-1">/ {totalCount}</span>
            )}
            <span className="ml-1 text-zinc-500">estudiantes</span>
          </div>

          {/* Reset original data button */}
          <button
            onClick={onResetData}
            title="Restaurar datos originales del archivo Excel"
            className="apple-press p-2 rounded-xl text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Export to Excel button */}
          <button
            onClick={handleExport}
            className="apple-press inline-flex items-center px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 text-xs font-medium shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            <span>Exportar Excel</span>
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            className="apple-press p-2 rounded-xl text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
