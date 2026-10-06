import React, { useState } from 'react';
import { 
  Building2, 
  Globe2, 
  GraduationCap, 
  PlaneTakeoff, 
  MapPin, 
  Calendar, 
  Search, 
  ExternalLink,
  ChevronRight,
  School,
  Clock
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell
} from 'recharts';

export default function SpecificCategoryView({ 
  categoryKey, 
  title, 
  subtitle, 
  icon: Icon, 
  accentColor, 
  students, 
  onViewStudent 
}) {
  const [searchTerm, setSearchTerm] = useState('');

  // Activities for this category
  const activityMap = {};
  students.forEach(s => {
    const act = s.tipoActividad || 'Sin Especificar';
    activityMap[act] = (activityMap[act] || 0) + 1;
  });

  const activityData = Object.entries(activityMap)
    .map(([name, count]) => ({
      name,
      count,
      pct: ((count / students.length) * 100).toFixed(1)
    }))
    .sort((a, b) => b.count - a.count);

  // Faculty breakdown
  const facultyMap = {};
  students.forEach(s => {
    const fac = s.facultad || 'Sin Facultad';
    facultyMap[fac] = (facultyMap[fac] || 0) + 1;
  });

  const facultyData = Object.entries(facultyMap)
    .map(([name, count]) => ({
      name: name.replace('Facultad de ', ''),
      fullName: name,
      count,
      pct: ((count / students.length) * 100).toFixed(1)
    }))
    .sort((a, b) => b.count - a.count);

  // Partner institutions
  const instMap = {};
  students.forEach(s => {
    const inst = s.direccion === 'Saliente' ? s.institucionDestino : s.institucionOrigen;
    if (inst && inst !== 'Universidad Mariana') {
      instMap[inst] = (instMap[inst] || 0) + 1;
    }
  });

  const topInstitutions = Object.entries(instMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Filter students for the table
  const filteredStudents = students.filter(s => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      (s.nombreCompleto && s.nombreCompleto.toLowerCase().includes(term)) ||
      (s.documento && String(s.documento).includes(term)) ||
      (s.programa && s.programa.toLowerCase().includes(term)) ||
      (s.tipoActividad && s.tipoActividad.toLowerCase().includes(term)) ||
      (s.institucionDestino && s.institucionDestino.toLowerCase().includes(term)) ||
      (s.institucionOrigen && s.institucionOrigen.toLowerCase().includes(term))
    );
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-6">
      {/* Category Header Card */}
      <div className="bg-white/90 dark:bg-zinc-900/90 rounded-2xl p-6 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-md"
              style={{ backgroundColor: accentColor }}
            >
              <Icon className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                  {title}
                </h2>
                <span 
                  className="px-2.5 py-0.5 rounded-full text-xs font-semibold text-white shadow-sm"
                  style={{ backgroundColor: accentColor }}
                >
                  {students.length} estudiantes
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                {subtitle}
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center space-x-4 sm:space-x-6 border-t md:border-t-0 md:border-l border-zinc-200 dark:border-zinc-800 pt-3 md:pt-0 md:pl-6">
            <div>
              <span className="block text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                Total Registros
              </span>
              <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                {students.length}
              </span>
            </div>
            <div>
              <span className="block text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                Actividades Distintas
              </span>
              <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                {activityData.length}
              </span>
            </div>
            <div>
              <span className="block text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                Facultades
              </span>
              <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                {facultyData.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Distribution Chart */}
        <div className="bg-white/90 dark:bg-zinc-900/90 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-50">
                Desglose por Tipo de Actividad
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Campo "ID TIPO MOV / TIPO DE ACTIVIDAD" en este grupo
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={activityData}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 30, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#888888' }} />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={130}
                  tick={{ fontSize: 11, fill: '#888888' }} 
                />
                <Tooltip 
                  formatter={(val, name, props) => [`${val} (${props.payload.pct}%)`, 'Estudiantes']}
                  contentStyle={{ 
                    backgroundColor: 'rgba(28, 28, 30, 0.9)', 
                    borderRadius: '12px', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    color: '#fff',
                    fontSize: '12px'
                  }} 
                />
                <Bar dataKey="count" fill={accentColor} radius={[0, 4, 4, 0]}>
                  {activityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={accentColor} opacity={0.85 + (index === 0 ? 0.15 : 0)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Faculties & Top Institutions */}
        <div className="bg-white/90 dark:bg-zinc-900/90 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
              Distribución por Facultad
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
              Concentración académica de este grupo
            </p>

            <div className="space-y-2 mb-5">
              {facultyData.map(f => (
                <div key={f.name} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-700 dark:text-zinc-300 font-medium truncate max-w-[240px]">
                      {f.name}
                    </span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                      {f.count} ({f.pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="h-full rounded-full" 
                      style={{ 
                        backgroundColor: accentColor, 
                        width: `${(f.count / students.length) * 100}%` 
                      }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {topInstitutions.length > 0 && (
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800">
              <h4 className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 mb-2 flex items-center">
                <School className="w-3.5 h-3.5 mr-1.5 text-zinc-500" />
                Principales Instituciones Contraparte
              </h4>
              <div className="space-y-1.5">
                {topInstitutions.map(inst => (
                  <div key={inst.name} className="flex justify-between text-xs text-zinc-600 dark:text-zinc-400">
                    <span className="truncate pr-2">{inst.name}</span>
                    <span className="font-bold text-zinc-900 dark:text-zinc-100">{inst.count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filtered Table of Students in this Group */}
      <div className="bg-white/90 dark:bg-zinc-900/90 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-50">
              Estudiantes del Grupo ({filteredStudents.length})
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Consulta individual y detalles de movilidad
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-zinc-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar en este grupo..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/80 text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            />
          </div>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 font-medium">
                <th className="py-2.5 px-3">Estudiante</th>
                <th className="py-2.5 px-3">Programa</th>
                <th className="py-2.5 px-3">Tipo de Actividad</th>
                <th className="py-2.5 px-3">Institución Contraparte</th>
                <th className="py-2.5 px-3 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
              {filteredStudents.slice(0, 10).map((st) => (
                <tr key={st.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/50 transition-colors">
                  <td className="py-2.5 px-3">
                    <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                      {st.nombreCompleto || `${st.primerNombre || ''} ${st.primerApellido || ''}`.trim()}
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      {st.documento ? `Doc: ${st.documento}` : 'Sin Doc'}
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-zinc-700 dark:text-zinc-300">
                    <span className="font-medium">{st.programa}</span>
                    <div className="text-[11px] text-zinc-500">{st.facultad.replace('Facultad de ', '')}</div>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                      {st.tipoActividad}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-zinc-600 dark:text-zinc-400">
                    {st.direccion === 'Saliente' ? st.institucionDestino : st.institucionOrigen}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => onViewStudent(st)}
                      className="apple-press text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Ver Ficha
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredStudents.length > 10 && (
            <div className="pt-3 text-center text-xs text-zinc-500 border-t border-zinc-100 dark:border-zinc-800">
              Mostrando 10 de {filteredStudents.length} estudiantes. Para ver la base completa con filtros y edición, visita la pestaña <strong>Base de Datos (CRUD)</strong>.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
