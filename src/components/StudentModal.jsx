import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  GraduationCap, 
  Calendar, 
  Building2, 
  Globe2, 
  FileText, 
  DollarSign,
  Award,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function StudentModal({ 
  isOpen, 
  onClose, 
  student, 
  mode = 'view', // 'view', 'edit', 'create'
  onSave 
}) {
  const [formData, setFormData] = useState({});
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    if (student) {
      setFormData({ ...student });
    } else {
      setFormData({
        direccion: 'Saliente',
        ambito: 'Internacional',
        tipoMovilidad: 'Presencial',
        tipoActividad: 'Asistencia a eventos',
        tipoActividadRaw: '4__Asistencia_a_eventos',
        facultad: 'Facultad de Humanidades y Ciencias Sociales',
        programa: 'Psicología',
        nombreCompleto: '',
        primerNombre: '',
        primerApellido: '',
        documento: '',
        tipoDocumento: 'CC',
        paisOrigen: 'Colombia',
        institucionOrigen: 'Universidad Mariana',
        paisDestino: 'Ecuador',
        institucionDestino: '',
        fechaInicio: '2026-03-01',
        fechaFin: '2026-03-05',
        diasEstadia: 5,
        periodo: '2026-1',
        ano: 2026,
        semestre: 1,
        movilidadPorConvenio: 'Si',
        universidadConvenio: '',
        nombreEvento: '',
        objeto: ''
      });
    }
  }, [student, isOpen]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'direccion' || field === 'ambito' 
        ? { categoriaCanonica: `${field === 'direccion' ? value : prev.direccion} ${field === 'ambito' ? value : prev.ambito}` } 
        : {})
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombreCompleto && formData.primerNombre && formData.primerApellido) {
      formData.nombreCompleto = `${formData.primerNombre} ${formData.primerApellido}`.trim();
    }
    onSave(formData);
    onClose();
  };

  const isReadOnly = mode === 'view';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200/80 dark:border-zinc-800 overflow-hidden flex flex-col max-h-[90vh] transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                {mode === 'create' ? 'Nuevo Registro de Estudiante Presencial' : 
                 mode === 'edit' ? 'Editar Estudiante' : 'Ficha del Estudiante'}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {formData.categoriaCanonica || 'Movilidad Presencial'} — {formData.periodo || '2026-1'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="apple-press p-2 rounded-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Apple Style Segmented Tabs inside Modal */}
        <div className="px-6 pt-3 pb-1 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex space-x-2 text-xs">
          <button
            onClick={() => setActiveTab('general')}
            className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
              activeTab === 'general'
                ? 'bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            Datos Generales
          </button>
          <button
            onClick={() => setActiveTab('movilidad')}
            className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
              activeTab === 'movilidad'
                ? 'bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            Movilidad & Actividad
          </button>
          <button
            onClick={() => setActiveTab('detalles')}
            className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
              activeTab === 'detalles'
                ? 'bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            Convenio & Financiación
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {activeTab === 'general' && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    disabled={isReadOnly}
                    value={formData.nombreCompleto || ''}
                    onChange={(e) => handleChange('nombreCompleto', e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 disabled:opacity-75 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>
                <div>
                  <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Número de Documento
                  </label>
                  <input
                    type="text"
                    disabled={isReadOnly}
                    value={formData.documento || ''}
                    onChange={(e) => handleChange('documento', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 disabled:opacity-75 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Facultad
                  </label>
                  <select
                    disabled={isReadOnly}
                    value={formData.facultad || ''}
                    onChange={(e) => handleChange('facultad', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 disabled:opacity-75 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  >
                    <option value="Facultad de Humanidades y Ciencias Sociales">Facultad de Humanidades y Ciencias Sociales</option>
                    <option value="Facultad de Ciencias Contables, Económicas y Administrativas">Facultad de Ciencias Contables, Económicas y Administrativas</option>
                    <option value="Facultad de Ingeniería">Facultad de Ingeniería</option>
                    <option value="Facultad de Ciencias de la Salud">Facultad de Ciencias de la Salud</option>
                    <option value="Facultad de Educación">Facultad de Educación</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Programa Académico
                  </label>
                  <input
                    type="text"
                    disabled={isReadOnly}
                    value={formData.programa || ''}
                    onChange={(e) => handleChange('programa', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 disabled:opacity-75 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Código SNIES
                  </label>
                  <input
                    type="text"
                    disabled={isReadOnly}
                    value={formData.snies || ''}
                    onChange={(e) => handleChange('snies', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 disabled:opacity-75"
                  />
                </div>
                <div>
                  <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Periodo
                  </label>
                  <input
                    type="text"
                    disabled={isReadOnly}
                    value={formData.periodo || '2026-1'}
                    onChange={(e) => handleChange('periodo', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 disabled:opacity-75"
                  />
                </div>
                <div>
                  <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Semestre
                  </label>
                  <input
                    type="text"
                    disabled={isReadOnly}
                    value={formData.semestre || '1'}
                    onChange={(e) => handleChange('semestre', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 disabled:opacity-75"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'movilidad' && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Dirección
                  </label>
                  <select
                    disabled={isReadOnly}
                    value={formData.direccion || 'Saliente'}
                    onChange={(e) => handleChange('direccion', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 disabled:opacity-75"
                  >
                    <option value="Entrante">Entrante</option>
                    <option value="Saliente">Saliente</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Ámbito
                  </label>
                  <select
                    disabled={isReadOnly}
                    value={formData.ambito || 'Nacional'}
                    onChange={(e) => handleChange('ambito', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 disabled:opacity-75"
                  >
                    <option value="Nacional">Nacional</option>
                    <option value="Internacional">Internacional</option>
                    <option value="Regional">Regional</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Modalidad
                  </label>
                  <input
                    type="text"
                    disabled
                    value="Presencial"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-zinc-500 font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Tipo de Actividad / Movilidad (ID TIPO MOV)
                </label>
                <select
                  disabled={isReadOnly}
                  value={formData.tipoActividad || 'Asistencia a eventos'}
                  onChange={(e) => {
                    handleChange('tipoActividad', e.target.value);
                    handleChange('tipoActividadRaw', e.target.value);
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 disabled:opacity-75"
                >
                  <option value="Asistencia a eventos">Asistencia a eventos</option>
                  <option value="Misión académica">Misión académica</option>
                  <option value="Curso corto">Curso corto</option>
                  <option value="Pasantía o práctica">Pasantía o práctica</option>
                  <option value="Semestre académico de intercambio">Semestre académico de intercambio</option>
                  <option value="Estancia de investigación">Estancia de investigación</option>
                  <option value="Internacionalización de Extensión">Internacionalización de Extensión</option>
                  <option value="Sin Especificar">Sin Especificar</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    País e Institución Origen
                  </label>
                  <input
                    type="text"
                    disabled={isReadOnly}
                    placeholder="País de origen"
                    value={formData.paisOrigen || ''}
                    onChange={(e) => handleChange('paisOrigen', e.target.value)}
                    className="w-full px-3 py-2 mb-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 disabled:opacity-75"
                  />
                  <input
                    type="text"
                    disabled={isReadOnly}
                    placeholder="Institución de origen"
                    value={formData.institucionOrigen || ''}
                    onChange={(e) => handleChange('institucionOrigen', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 disabled:opacity-75"
                  />
                </div>
                <div>
                  <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    País e Institución Destino
                  </label>
                  <input
                    type="text"
                    disabled={isReadOnly}
                    placeholder="País de destino"
                    value={formData.paisDestino || ''}
                    onChange={(e) => handleChange('paisDestino', e.target.value)}
                    className="w-full px-3 py-2 mb-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 disabled:opacity-75"
                  />
                  <input
                    type="text"
                    disabled={isReadOnly}
                    placeholder="Institución de destino"
                    value={formData.institucionDestino || ''}
                    onChange={(e) => handleChange('institucionDestino', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 disabled:opacity-75"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Fecha Inicio
                  </label>
                  <input
                    type="date"
                    disabled={isReadOnly}
                    value={formData.fechaInicio ? formData.fechaInicio.split('T')[0] : ''}
                    onChange={(e) => handleChange('fechaInicio', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 disabled:opacity-75"
                  />
                </div>
                <div>
                  <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Fecha Fin
                  </label>
                  <input
                    type="date"
                    disabled={isReadOnly}
                    value={formData.fechaFin ? formData.fechaFin.split('T')[0] : ''}
                    onChange={(e) => handleChange('fechaFin', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 disabled:opacity-75"
                  />
                </div>
                <div>
                  <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Días Estadía
                  </label>
                  <input
                    type="number"
                    disabled={isReadOnly}
                    value={formData.diasEstadia || 1}
                    onChange={(e) => handleChange('diasEstadia', parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 disabled:opacity-75"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'detalles' && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Movilidad por Convenio
                  </label>
                  <select
                    disabled={isReadOnly}
                    value={formData.movilidadPorConvenio || 'Si'}
                    onChange={(e) => handleChange('movilidadPorConvenio', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 disabled:opacity-75"
                  >
                    <option value="Si">Sí</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Universidad del Convenio
                  </label>
                  <input
                    type="text"
                    disabled={isReadOnly}
                    value={formData.universidadConvenio || ''}
                    onChange={(e) => handleChange('universidadConvenio', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 disabled:opacity-75"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Nombre del Evento / Misión / Actividad
                </label>
                <input
                  type="text"
                  disabled={isReadOnly}
                  value={formData.nombreEvento || ''}
                  onChange={(e) => handleChange('nombreEvento', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 disabled:opacity-75"
                />
              </div>

              <div>
                <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Objeto de la Movilidad
                </label>
                <textarea
                  rows={2}
                  disabled={isReadOnly}
                  value={formData.objeto || ''}
                  onChange={(e) => handleChange('objeto', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 disabled:opacity-75"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Valor Financiación Nacional
                  </label>
                  <input
                    type="text"
                    disabled={isReadOnly}
                    value={formData.valorFinanciacionNacional || ''}
                    onChange={(e) => handleChange('valorFinanciacionNacional', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 disabled:opacity-75"
                  />
                </div>
                <div>
                  <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Valor Financiación Internacional
                  </label>
                  <input
                    type="text"
                    disabled={isReadOnly}
                    value={formData.valorFinanciacionInternac || ''}
                    onChange={(e) => handleChange('valorFinanciacionInternac', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 disabled:opacity-75"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Modal Footer */}
          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="apple-press px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            >
              {isReadOnly ? 'Cerrar' : 'Cancelar'}
            </button>
            {!isReadOnly && (
              <button
                type="submit"
                className="apple-press px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-semibold text-white shadow-sm flex items-center space-x-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{mode === 'create' ? 'Guardar Estudiante' : 'Actualizar Cambios'}</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
