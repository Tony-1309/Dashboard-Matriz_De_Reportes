import React from 'react';
import { 
  Building2, 
  Globe2, 
  GraduationCap, 
  PlaneTakeoff, 
  Users, 
  Award, 
  Calendar, 
  TrendingUp,
  MapPin,
  Compass,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  CartesianGrid
} from 'recharts';

export default function OverviewView({ students, onSelectCategory }) {
  // Compute metrics
  const total = students.length;
  const entranteNac = students.filter(s => s.direccion === 'Entrante' && s.ambito === 'Nacional').length;
  const entranteInter = students.filter(s => s.direccion === 'Entrante' && s.ambito === 'Internacional').length;
  const entranteReg = students.filter(s => s.direccion === 'Entrante' && s.ambito === 'Regional').length;
  
  const salienteNac = students.filter(s => s.direccion === 'Saliente' && s.ambito === 'Nacional').length;
  const salienteInter = students.filter(s => s.direccion === 'Saliente' && s.ambito === 'Internacional').length;
  const salienteReg = students.filter(s => s.direccion === 'Saliente' && s.ambito === 'Regional').length;

  // Breakdown by Activity x Category
  const activityMap = {};
  students.forEach(s => {
    const act = s.tipoActividad || 'Sin Especificar';
    if (!activityMap[act]) {
      activityMap[act] = {
        name: act,
        'Entrante Nacional': 0,
        'Entrante Internacional': 0,
        'Entrante Regional': 0,
        'Saliente Nacional': 0,
        'Saliente Internacional': 0,
        'Saliente Regional': 0,
        total: 0
      };
    }
    const cat = `${s.direccion} ${s.ambito}`;
    if (activityMap[act][cat] !== undefined) {
      activityMap[act][cat]++;
    }
    activityMap[act].total++;
  });

  const activityChartData = Object.values(activityMap)
    .sort((a, b) => b.total - a.total)
    .slice(0, 7);

  // Faculty breakdown
  const facultyMap = {};
  students.forEach(s => {
    const fac = s.facultad || 'Sin Facultad';
    facultyMap[fac] = (facultyMap[fac] || 0) + 1;
  });

  const facultyColors = ['#0071e3', '#34c759', '#ff9500', '#af52de', '#ff3b30', '#5856d6'];
  const facultyData = Object.entries(facultyMap)
    .map(([name, value], idx) => ({
      name: name.replace('Facultad de ', ''),
      fullName: name,
      value,
      color: facultyColors[idx % facultyColors.length]
    }))
    .sort((a, b) => b.value - a.value);

  // Scope breakdown (Nacional, Internacional, Regional)
  const scopeData = [
    { name: 'Nacional', value: entranteNac + salienteNac, color: '#0071e3' },
    { name: 'Internacional', value: entranteInter + salienteInter, color: '#af52de' },
    { name: 'Regional', value: entranteReg + salienteReg, color: '#0284c7' },
  ];

  // International Countries (Salientes y Entrantes internacionales)
  const countryMap = {};
  students
    .filter(s => s.ambito === 'Internacional')
    .forEach(s => {
      const country = s.direccion === 'Saliente' ? s.paisDestino : s.paisOrigen;
      if (country && country !== 'Colombia') {
        countryMap[country] = (countryMap[country] || 0) + 1;
      }
    });

  const topCountries = Object.entries(countryMap)
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-6">
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Entrantes Nacionales */}
        <div 
          onClick={() => onSelectCategory('entrante-nacional')}
          className="apple-press cursor-pointer group bg-white/90 dark:bg-zinc-900/90 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-md transition-all relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Entrantes Nacionales
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <ArrowDownLeft className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {entranteNac}
            </span>
            <span className="text-xs text-zinc-500">
              ({total > 0 ? ((entranteNac / total) * 100).toFixed(1) : 0}%)
            </span>
          </div>
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
            <span>+ 21 Regionales</span>
            <span className="text-blue-600 dark:text-blue-400 font-medium group-hover:translate-x-0.5 transition-transform">Ver detalle &rarr;</span>
          </p>
        </div>

        {/* Entrantes Internacionales */}
        <div 
          onClick={() => onSelectCategory('entrante-internacional')}
          className="apple-press cursor-pointer group bg-white/90 dark:bg-zinc-900/90 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-md transition-all relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-colors" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Entrantes Internacionales
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Globe2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {entranteInter}
            </span>
            <span className="text-xs text-zinc-500">
              ({total > 0 ? ((entranteInter / total) * 100).toFixed(1) : 0}%)
            </span>
          </div>
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
            <span>Ecuador, Perú, México</span>
            <span className="text-purple-600 dark:text-purple-400 font-medium group-hover:translate-x-0.5 transition-transform">Ver detalle &rarr;</span>
          </p>
        </div>

        {/* Salientes Nacionales */}
        <div 
          onClick={() => onSelectCategory('saliente-nacional')}
          className="apple-press cursor-pointer group bg-white/90 dark:bg-zinc-900/90 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-md transition-all relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Salientes Nacionales
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {salienteNac}
            </span>
            <span className="text-xs text-zinc-500">
              ({total > 0 ? ((salienteNac / total) * 100).toFixed(1) : 0}%)
            </span>
          </div>
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
            <span>+ 183 Regionales</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium group-hover:translate-x-0.5 transition-transform">Ver detalle &rarr;</span>
          </p>
        </div>

        {/* Salientes Internacionales */}
        <div 
          onClick={() => onSelectCategory('saliente-internacional')}
          className="apple-press cursor-pointer group bg-white/90 dark:bg-zinc-900/90 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-md transition-all relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Salientes Internacionales
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <PlaneTakeoff className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {salienteInter}
            </span>
            <span className="text-xs text-zinc-500">
              ({total > 0 ? ((salienteInter / total) * 100).toFixed(1) : 0}%)
            </span>
          </div>
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
            <span>Bélgica, Ecuador, Perú</span>
            <span className="text-amber-600 dark:text-amber-400 font-medium group-hover:translate-x-0.5 transition-transform">Ver detalle &rarr;</span>
          </p>
        </div>
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Activity Types by Direction/Scope (Spans 2 columns) */}
        <div className="lg:col-span-2 bg-white/90 dark:bg-zinc-900/90 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm sm:text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                Movilidad por Tipo de Actividad (ID TIPO MOV)
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Distribución exacta de estudiantes presenciales por modalidad y categoría
              </p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-medium">
              Top 7 Actividades
            </span>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={activityChartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 25 }}
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
                <Legend 
                  verticalAlign="top" 
                  wrapperStyle={{ paddingBottom: '15px', fontSize: '11px' }} 
                />
                <Bar dataKey="Entrante Nacional" stackId="a" fill="#0071e3" radius={[0, 0, 0, 0]} />
                <Bar dataKey="Entrante Internacional" stackId="a" fill="#af52de" radius={[0, 0, 0, 0]} />
                <Bar dataKey="Saliente Nacional" stackId="a" fill="#34c759" radius={[0, 0, 0, 0]} />
                <Bar dataKey="Saliente Internacional" stackId="a" fill="#ff9500" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Faculty Distribution Donut */}
        <div className="bg-white/90 dark:bg-zinc-900/90 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-sm sm:text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              Distribución por Facultad
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
              Proporción de estudiantes presenciales por facultad
            </p>

            <div className="h-56 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={facultyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {facultyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(val) => [`${val} estudiantes (${((val / total) * 100).toFixed(1)}%)`, 'Cantidad']}
                    contentStyle={{ 
                      backgroundColor: 'rgba(28, 28, 30, 0.9)', 
                      borderRadius: '12px', 
                      border: '1px solid rgba(255,255,255,0.1)', 
                      color: '#fff',
                      fontSize: '12px'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            {facultyData.slice(0, 4).map((f) => (
              <div key={f.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2 truncate pr-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: f.color }} />
                  <span className="text-zinc-600 dark:text-zinc-400 truncate">{f.name}</span>
                </div>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200 shrink-0">
                  {f.value} ({((f.value / total) * 100).toFixed(0)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Row: Countries & Quick Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Top International Destinations */}
        <div className="bg-white/90 dark:bg-zinc-900/90 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 flex items-center">
              <Globe2 className="w-4 h-4 mr-2 text-indigo-500" />
              Destinos Internacionales Clave
            </h3>
            <span className="text-[11px] text-zinc-500 font-medium">308 Registros</span>
          </div>
          <div className="space-y-2.5">
            {topCountries.map((item, idx) => (
              <div key={item.country} className="flex items-center justify-between text-xs">
                <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                  {idx + 1}. {item.country}
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-zinc-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-indigo-500 h-full rounded-full" 
                      style={{ width: `${(item.count / 150) * 100}%` }}
                    />
                  </div>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100 w-6 text-right">
                    {item.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Mobility Card */}
        <div className="bg-white/90 dark:bg-zinc-900/90 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-sky-500" />
              Impacto Regional (Nariño / Valle)
            </h3>
            <span className="text-[11px] text-sky-600 dark:text-sky-400 font-semibold bg-sky-50 dark:bg-sky-950/60 px-2 py-0.5 rounded-full">
              {entranteReg + salienteReg} est.
            </span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
            Alianzas regionales interinstitucionales con la Universidad Cesmag, Universidad de Nariño, y Universidad Libre.
          </p>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 flex justify-between items-center">
              <span className="text-zinc-600 dark:text-zinc-400">Salientes Regionales</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-100">{salienteReg} estudiantes</span>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 flex justify-between items-center">
              <span className="text-zinc-600 dark:text-zinc-400">Entrantes Regionales</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-100">{entranteReg} estudiantes</span>
            </div>
          </div>
        </div>

        {/* Summary Executive Insights */}
        <div className="bg-white/90 dark:bg-zinc-900/90 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 flex items-center">
              <Award className="w-4 h-4 mr-2 text-amber-500" />
              Resumen de Modalidades
            </h3>
          </div>
          <div className="space-y-2.5 text-xs text-zinc-600 dark:text-zinc-400">
            <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800/60 pb-1.5">
              <span>Asistencia a eventos:</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-100">810 (60.9%)</span>
            </div>
            <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800/60 pb-1.5">
              <span>Misiones académicas:</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-100">287 (21.6%)</span>
            </div>
            <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800/60 pb-1.5">
              <span>Cursos cortos:</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-100">115 (8.6%)</span>
            </div>
            <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800/60 pb-1.5">
              <span>Pasantías o prácticas:</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-100">65 (4.9%)</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Semestres de intercambio:</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-100">23 (1.7%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
