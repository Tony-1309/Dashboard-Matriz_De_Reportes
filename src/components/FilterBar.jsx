import React from 'react';
import { Filter, X, Search, RotateCcw } from 'lucide-react';

export default function FilterBar({
  filters,
  setFilters,
  facultiesList,
  programsList,
  activitiesList,
  resetFilters,
  activeFilterCount
}) {
  const handleChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
      // If changing faculty and current program is not in that faculty, reset program
      ...(field === 'facultad' ? { programa: 'all' } : {})
    }));
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <div className="bg-white/80 dark:bg-zinc-900/80 rounded-2xl p-4 shadow-sm border border-zinc-200/70 dark:border-zinc-800/80 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Filtros Dinámicos
            </span>
            {activeFilterCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                {activeFilterCount} activo{activeFilterCount > 1 ? 's' : ''}
              </span>
            )}
          </div>

          {activeFilterCount > 0 && (
            <button
              onClick={resetFilters}
              className="apple-press inline-flex items-center space-x-1.5 text-xs text-zinc-500 hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-400 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpiar filtros</span>
            </button>
          )}
        </div>

        {/* Filter controls row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {/* 1. Facultad */}
          <div>
            <label className="block text-[11px] font-medium text-zinc-500 dark:text-zinc-400 mb-1">
              Facultad
            </label>
            <select
              value={filters.facultad}
              onChange={(e) => handleChange('facultad', e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/80 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            >
              <option value="all">Todas las Facultades</option>
              {facultiesList.map(fac => (
                <option key={fac} value={fac}>{fac}</option>
              ))}
            </select>
          </div>

          {/* 2. Programa */}
          <div>
            <label className="block text-[11px] font-medium text-zinc-500 dark:text-zinc-400 mb-1">
              Programa Académico
            </label>
            <select
              value={filters.programa}
              onChange={(e) => handleChange('programa', e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/80 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            >
              <option value="all">Todos los Programas</option>
              {programsList.map(prog => (
                <option key={prog} value={prog}>{prog}</option>
              ))}
            </select>
          </div>

          {/* 3. Tipo de Actividad (ID TIPO MOV) */}
          <div>
            <label className="block text-[11px] font-medium text-zinc-500 dark:text-zinc-400 mb-1">
              Tipo de Actividad / Movilidad
            </label>
            <select
              value={filters.tipoActividad}
              onChange={(e) => handleChange('tipoActividad', e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/80 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            >
              <option value="all">Todas las Actividades</option>
              {activitiesList.map(act => (
                <option key={act} value={act}>{act}</option>
              ))}
            </select>
          </div>

          {/* 4. Dirección & Ámbito */}
          <div>
            <label className="block text-[11px] font-medium text-zinc-500 dark:text-zinc-400 mb-1">
              Dirección y Ámbito
            </label>
            <select
              value={filters.categoria}
              onChange={(e) => handleChange('categoria', e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/80 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            >
              <option value="all">Todas las Categorías</option>
              <option value="Entrante Nacional">Entrante - Nacional</option>
              <option value="Entrante Internacional">Entrante - Internacional</option>
              <option value="Entrante Regional">Entrante - Regional</option>
              <option value="Saliente Nacional">Saliente - Nacional</option>
              <option value="Saliente Internacional">Saliente - Internacional</option>
              <option value="Saliente Regional">Saliente - Regional</option>
            </select>
          </div>

          {/* 5. Búsqueda Rápida */}
          <div>
            <label className="block text-[11px] font-medium text-zinc-500 dark:text-zinc-400 mb-1">
              Búsqueda por Texto
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-zinc-400" />
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleChange('search', e.target.value)}
                placeholder="Nombre, documento, universidad..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/80 text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              />
              {filters.search && (
                <button
                  onClick={() => handleChange('search', '')}
                  className="absolute right-2.5 top-2.5 text-zinc-400 hover:text-zinc-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
