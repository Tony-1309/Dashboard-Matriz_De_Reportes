import React, { useState } from 'react';
import { 
  Table2, 
  BarChart2, 
  Download, 
  ArrowUpDown, 
  Sparkles,
  HelpCircle
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';

export default function ActivityMatrixView({ students, onFilterByActivityAndCategory }) {
  const [sortField, setSortField] = useState('total');
  const [sortAsc, setSortAsc] = useState(false);

  // Group columns
  const columns = [
    { key: 'Entrante Nacional', label: 'Entrante Nac.', color: '#0071e3' },
    { key: 'Entrante Internacional', label: 'Entrante Inter.', color: '#af52de' },
    { key: 'Entrante Regional', label: 'Entrante Reg.', color: '#0284c7' },
    { key: 'Saliente Nacional', label: 'Saliente Nac.', color: '#34c759' },
    { key: 'Saliente Internacional', label: 'Saliente Inter.', color: '#ff9500' },
    { key: 'Saliente Regional', label: 'Saliente Reg.', color: '#10b981' }
  ];

  // Aggregate by normalized activity
  const matrix = {};
  students.forEach(s => {
    const act = s.tipoActividad || 'Sin Especificar';
    if (!matrix[act]) {
      matrix[act] = {
        name: act,
        rawNames: new Set(),
        'Entrante Nacional': 0,
        'Entrante Internacional': 0,
        'Entrante Regional': 0,
        'Saliente Nacional': 0,
        'Saliente Internacional': 0,
        'Saliente Regional': 0,
        total: 0
      };
    }
    matrix[act].rawNames.add(s.tipoActividadRaw);
    const cat = `${s.direccion} ${s.ambito}`;
    if (matrix[act][cat] !== undefined) {
      matrix[act][cat]++;
    }
    matrix[act].total++;
  });

  const grandTotal = students.length;

  const dataList = Object.values(matrix).sort((a, b) => {
    const valA = a[sortField] || 0;
    const valB = b[sortField] || 0;
    return sortAsc ? valA - valB : valB - valA;
  });

  // Calculate Column Totals
  const colTotals = {
    'Entrante Nacional': students.filter(s => s.direccion === 'Entrante' && s.ambito === 'Nacional').length,
    'Entrante Internacional': students.filter(s => s.direccion === 'Entrante' && s.ambito === 'Internacional').length,
    'Entrante Regional': students.filter(s => s.direccion === 'Entrante' && s.ambito === 'Regional').length,
    'Saliente Nacional': students.filter(s => s.direccion === 'Saliente' && s.ambito === 'Nacional').length,
    'Saliente Internacional': students.filter(s => s.direccion === 'Saliente' && s.ambito === 'Internacional').length,
    'Saliente Regional': students.filter(s => s.direccion === 'Saliente' && s.ambito === 'Regional').length
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-6">
      {/* Header Banner */}
      <div className="bg-white/90 dark:bg-zinc-900/90 rounded-2xl p-6 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Matriz Consolidada de Actividades vs Categorías
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
              ID TIPO MOV
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Cruce bidimensional exacto de tipos de actividad académica frente a las modalidades entrante/saliente y nacional/internacional/regional.
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs text-zinc-500">
          <span className="inline-flex items-center">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 mr-1.5" /> Entrantes
          </span>
          <span className="inline-flex items-center">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-1.5" /> Salientes
          </span>
          <span className="inline-flex items-center">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mr-1.5" /> Internacional
          </span>
        </div>
      </div>

      {/* Visual Chart */}
      <div className="bg-white/90 dark:bg-zinc-900/90 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm">
        <h3 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
          Comparativa Visual por Tipo de Actividad
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
          Visualización de volumen por cada una de las actividades registradas
        </p>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={dataList}
              margin={{ top: 10, right: 10, left: -20, bottom: 35 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} vertical={false} />
              <XAxis 
                dataKey="name" 
                angle={-15} 
                textAnchor="end" 
                interval={0}
                tick={{ fontSize: 11, fill: '#888888' }} 
                height={50}
              />
              <YAxis tick={{ fontSize: 11, fill: '#888888' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(28, 28, 30, 0.9)', 
                  borderRadius: '12px', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  color: '#fff',
                  fontSize: '12px'
                }} 
              />
              <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '15px', fontSize: '11px' }} />
              <Bar dataKey="Entrante Nacional" fill="#0071e3" radius={[0, 0, 0, 0]} />
              <Bar dataKey="Entrante Internacional" fill="#af52de" radius={[0, 0, 0, 0]} />
              <Bar dataKey="Saliente Nacional" fill="#34c759" radius={[0, 0, 0, 0]} />
              <Bar dataKey="Saliente Internacional" fill="#ff9500" radius={[0, 0, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* The Cross Table */}
      <div className="bg-white/90 dark:bg-zinc-900/90 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Tabla Dinámica Cruzada (Valores y Participación)
          </h3>
          <span className="text-xs text-zinc-500">
            {grandTotal} estudiantes presenciales procesados
          </span>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-zinc-100/80 dark:bg-zinc-800/70 border-b border-zinc-200 dark:border-zinc-700/80 text-zinc-700 dark:text-zinc-300 font-semibold">
                <th className="py-3 px-4 rounded-tl-xl">Tipo de Actividad / Movilidad</th>
                {columns.map(col => (
                  <th key={col.key} className="py-3 px-3 text-center whitespace-nowrap">
                    {col.label}
                  </th>
                ))}
                <th className="py-3 px-3 text-center font-bold text-zinc-900 dark:text-zinc-100">
                  TOTAL
                </th>
                <th className="py-3 px-4 text-center rounded-tr-xl font-bold">
                  % Part.
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60 font-medium">
              {dataList.map((row, idx) => {
                const pct = grandTotal > 0 ? ((row.total / grandTotal) * 100).toFixed(1) : 0;
                return (
                  <tr 
                    key={row.name} 
                    className="hover:bg-blue-50/40 dark:hover:bg-zinc-800/60 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="font-semibold text-zinc-900 dark:text-zinc-100 text-xs">
                        {row.name}
                      </div>
                      <div className="text-[10px] text-zinc-400 line-clamp-1">
                        Cod: {Array.from(row.rawNames).join(' | ')}
                      </div>
                    </td>

                    {columns.map(col => {
                      const count = row[col.key] || 0;
                      return (
                        <td 
                          key={col.key} 
                          className={`py-3 px-3 text-center ${
                            count > 0 
                              ? 'text-zinc-900 dark:text-zinc-100 font-semibold cursor-pointer hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 rounded-lg' 
                              : 'text-zinc-300 dark:text-zinc-600'
                          }`}
                          onClick={() => count > 0 && onFilterByActivityAndCategory(row.name, col.key)}
                          title={count > 0 ? `Ver los ${count} estudiantes de ${row.name} (${col.label})` : undefined}
                        >
                          {count > 0 ? (
                            <span className="inline-block px-1.5 py-0.5 rounded bg-zinc-100/80 dark:bg-zinc-800/80">
                              {count}
                            </span>
                          ) : '—'}
                        </td>
                      );
                    })}

                    <td className="py-3 px-3 text-center font-bold text-zinc-900 dark:text-zinc-100 bg-zinc-50/50 dark:bg-zinc-800/30">
                      {row.total}
                    </td>

                    <td className="py-3 px-4 text-center font-semibold text-blue-600 dark:text-blue-400 bg-zinc-50/50 dark:bg-zinc-800/30">
                      {pct}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-zinc-200/70 dark:bg-zinc-800/90 font-bold text-zinc-900 dark:text-zinc-100 border-t-2 border-zinc-300 dark:border-zinc-700">
                <td className="py-3.5 px-4 rounded-bl-xl font-bold">TOTAL GENERAL</td>
                {columns.map(col => (
                  <td key={col.key} className="py-3.5 px-3 text-center">
                    {colTotals[col.key]}
                  </td>
                ))}
                <td className="py-3.5 px-3 text-center text-sm font-extrabold text-blue-600 dark:text-blue-400">
                  {grandTotal}
                </td>
                <td className="py-3.5 px-4 text-center rounded-br-xl font-extrabold">
                  100.0%
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center">
            <HelpCircle className="w-3.5 h-3.5 mr-1" />
            Puedes hacer clic en cualquier celda con número para filtrar la base de datos instantáneamente.
          </span>
          <span>Actualizado 2026-1</span>
        </div>
      </div>
    </div>
  );
}
