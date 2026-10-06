import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Download, 
  Edit3, 
  Trash2, 
  Eye, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw,
  GraduationCap,
  FileSpreadsheet,
  FileCode,
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { exportStudentsToExcel } from '../utils/exportExcel';

export default function DatabaseCrudView({
  students,
  onOpenCreate,
  onOpenEdit,
  onOpenView,
  onDeleteStudent,
  onResetData
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [deleteCandidate, setDeleteCandidate] = useState(null);

  // Filter students by local search
  const filtered = students.filter(s => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      (s.nombreCompleto && s.nombreCompleto.toLowerCase().includes(term)) ||
      (s.documento && String(s.documento).includes(term)) ||
      (s.programa && s.programa.toLowerCase().includes(term)) ||
      (s.facultad && s.facultad.toLowerCase().includes(term)) ||
      (s.tipoActividad && s.tipoActividad.toLowerCase().includes(term)) ||
      (s.institucionDestino && s.institucionDestino.toLowerCase().includes(term)) ||
      (s.institucionOrigen && s.institucionOrigen.toLowerCase().includes(term)) ||
      (s.paisDestino && s.paisDestino.toLowerCase().includes(term)) ||
      (s.paisOrigen && s.paisOrigen.toLowerCase().includes(term))
    );
  });

  // Pagination calculation
  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const currentStudents = filtered.slice(startIndex, startIndex + pageSize);

  const handleExportExcel = () => {
    exportStudentsToExcel(filtered, 'Estudiantes_Presenciales_Filtrados.xlsx');
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.2 } });
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(filtered, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "estudiantes_presenciales.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const confirmDelete = () => {
    if (deleteCandidate) {
      onDeleteStudent(deleteCandidate.id);
      setDeleteCandidate(null);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
      {/* Top Action Bar */}
      <div className="bg-white/90 dark:bg-zinc-900/90 rounded-2xl p-4 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-50">
              Base de Datos Completa & Gestión (CRUD)
            </h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
              {filtered.length} registros
            </span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Explora, busca, edita, elimina o agrega nuevos registros de movilidad presencial.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onOpenCreate}
            className="apple-press inline-flex items-center px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            <span>Nuevo Estudiante</span>
          </button>

          <button
            onClick={handleExportExcel}
            className="apple-press inline-flex items-center px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium shadow-sm transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 mr-1.5" />
            <span>Exportar Excel</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="apple-press inline-flex items-center px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium shadow-sm transition-colors"
          >
            <FileCode className="w-3.5 h-3.5 mr-1.5" />
            <span>JSON</span>
          </button>
        </div>
      </div>

      {/* Search and Table Options */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3.5 top-3 text-zinc-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Buscar por nombre, documento, programa, universidad, país..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 shadow-sm"
          />
        </div>

        <div className="flex items-center space-x-3 text-xs text-zinc-500">
          <span>Mostrar:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 focus:outline-none text-xs shadow-sm"
          >
            <option value={10}>10 por pág</option>
            <option value={25}>25 por pág</option>
            <option value={50}>50 por pág</option>
            <option value={100}>100 por pág</option>
          </select>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white/90 dark:bg-zinc-900/90 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-zinc-100/70 dark:bg-zinc-800/60 border-b border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 font-semibold">
                <th className="py-3 px-3 w-12 text-center">No</th>
                <th className="py-3 px-4">Estudiante & Doc</th>
                <th className="py-3 px-3">Dirección & Ámbito</th>
                <th className="py-3 px-3">Tipo Actividad (ID TIPO MOV)</th>
                <th className="py-3 px-3">Programa Académico</th>
                <th className="py-3 px-3">Contraparte</th>
                <th className="py-3 px-3">Periodo</th>
                <th className="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60 font-normal">
              {currentStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-zinc-400">
                    No se encontraron estudiantes que coincidan con la búsqueda.
                  </td>
                </tr>
              ) : (
                currentStudents.map((st, idx) => (
                  <tr 
                    key={st.id || idx} 
                    className="hover:bg-blue-50/30 dark:hover:bg-zinc-800/40 transition-colors"
                  >
                    <td className="py-3 px-3 text-center text-zinc-400 text-[11px]">
                      {startIndex + idx + 1}
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                        {st.nombreCompleto || `${st.primerNombre || ''} ${st.primerApellido || ''}`.trim() || 'Sin Nombre'}
                      </div>
                      <div className="text-[11px] text-zinc-500">
                        {st.tipoDocumento || 'CC'} {st.documento || '—'}
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <div className="flex flex-col space-y-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold w-max ${
                          st.direccion === 'Entrante'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300'
                            : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300'
                        }`}>
                          {st.direccion}
                        </span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium w-max ${
                          st.ambito === 'Internacional'
                            ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/70 dark:text-purple-300'
                            : st.ambito === 'Regional'
                            ? 'bg-sky-100 text-sky-700 dark:bg-sky-950/70 dark:text-sky-300'
                            : 'bg-amber-100 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300'
                        }`}>
                          {st.ambito}
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <span className="font-medium text-zinc-800 dark:text-zinc-200 block">
                        {st.tipoActividad}
                      </span>
                      <span className="text-[10px] text-zinc-400 truncate max-w-[180px] block" title={st.tipoActividadRaw}>
                        {st.tipoActividadRaw}
                      </span>
                    </td>

                    <td className="py-3 px-3">
                      <span className="font-medium text-zinc-800 dark:text-zinc-200 block truncate max-w-[200px]" title={st.programa}>
                        {st.programa}
                      </span>
                      <span className="text-[10px] text-zinc-400 block truncate max-w-[200px]">
                        {st.facultad.replace('Facultad de ', '')}
                      </span>
                    </td>

                    <td className="py-3 px-3">
                      <div className="text-zinc-700 dark:text-zinc-300 font-medium truncate max-w-[160px]" title={st.direccion === 'Saliente' ? st.institucionDestino : st.institucionOrigen}>
                        {st.direccion === 'Saliente' ? (st.institucionDestino || st.paisDestino) : (st.institucionOrigen || st.paisOrigen)}
                      </div>
                      <div className="text-[10px] text-zinc-400">
                        {st.direccion === 'Saliente' ? st.paisDestino : st.paisOrigen}
                      </div>
                    </td>

                    <td className="py-3 px-3 text-zinc-500 whitespace-nowrap">
                      {st.periodo || '2026-1'}
                    </td>

                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center space-x-1.5">
                        <button
                          onClick={() => onOpenView(st)}
                          title="Ver Ficha Detallada"
                          className="apple-press p-1.5 rounded-lg text-zinc-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-zinc-800"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onOpenEdit(st)}
                          title="Editar Registro"
                          className="apple-press p-1.5 rounded-lg text-zinc-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-zinc-800"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteCandidate(st)}
                          title="Eliminar Registro"
                          className="apple-press p-1.5 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-zinc-800"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="px-4 py-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
          <div>
            Mostrando <strong>{filtered.length > 0 ? startIndex + 1 : 0}</strong> a{' '}
            <strong>{Math.min(startIndex + pageSize, filtered.length)}</strong> de{' '}
            <strong>{filtered.length}</strong> estudiantes
          </div>

          <div className="flex items-center space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className="apple-press p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 disabled:opacity-40 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="px-2">
              Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              className="apple-press p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 disabled:opacity-40 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Alert Modal */}
      {deleteCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-2xl border border-zinc-200 dark:border-zinc-800 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/60 mx-auto flex items-center justify-center text-red-600 dark:text-red-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                ¿Eliminar registro?
              </h4>
              <p className="text-xs text-zinc-500 mt-1">
                ¿Estás seguro de que deseas eliminar a{' '}
                <strong>{deleteCandidate.nombreCompleto || 'este estudiante'}</strong>? Esta acción se aplicará en tu sesión activa.
              </p>
            </div>
            <div className="flex items-center justify-center space-x-3 pt-2">
              <button
                onClick={() => setDeleteCandidate(null)}
                className="apple-press px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-700 dark:text-zinc-300"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="apple-press px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-semibold text-white shadow-sm"
              >
                Eliminar Registro
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
