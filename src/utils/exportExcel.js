import * as XLSX from 'xlsx';

export function exportStudentsToExcel(students, filename = 'Estudiantes_Presenciales_ORI_Mariana.xlsx') {
  // Format rows for human-friendly Excel export
  const rows = students.map((s, idx) => ({
    'No': idx + 1,
    'DIRECCIÓN': s.direccion,
    'ÁMBITO': s.ambito,
    'TIPO MOVILIDAD': s.tipoMovilidad,
    'CATEGORÍA': s.categoriaCanonica,
    'TIPO ACTIVIDAD (NORMALIZADO)': s.tipoActividad,
    'ID TIPO MOV / ACTIVIDAD (ORIGINAL)': s.tipoActividadRaw,
    'FACULTAD': s.facultad,
    'PROGRAMA': s.programa,
    'CÓDIGO SNIES': s.snies || '',
    'AÑO': s.ano || '2026',
    'SEMESTRE': s.semestre || '1',
    'PERIODO': s.periodo || '2026-1',
    'DOCUMENTO': s.documento || '',
    'TIPO DOC': s.tipoDocumento || '',
    'ESTUDIANTE': s.nombreCompleto || `${s.primerNombre || ''} ${s.primerApellido || ''}`.trim(),
    'PAÍS ORIGEN': s.paisOrigen || '',
    'INSTITUCIÓN ORIGEN': s.institucionOrigen || '',
    'PAÍS DESTINO': s.paisDestino || '',
    'INSTITUCIÓN DESTINO': s.institucionDestino || '',
    'FECHA INICIO': s.fechaInicio ? s.fechaInicio.split('T')[0] : '',
    'FECHA FIN': s.fechaFin ? s.fechaFin.split('T')[0] : '',
    'DÍAS ESTADÍA': s.diasEstadia || '',
    'CONVENIO': s.movilidadPorConvenio || '',
    'UNIVERSIDAD CONVENIO': s.universidadConvenio || '',
    'NOMBRE DEL EVENTO': s.nombreEvento || '',
    'OBJETO': s.objeto || '',
    'FINANCIACIÓN NACIONAL': s.valorFinanciacionNacional || '',
    'FINANCIACIÓN INTERNACIONAL': s.valorFinanciacionInternac || ''
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Estudiantes Presenciales');

  // Auto-fit column widths
  const maxProps = Object.keys(rows[0] || {}).map(key => ({
    wch: Math.max(key.length, ...rows.map(r => String(r[key] || '').length)) + 2
  }));
  worksheet['!cols'] = maxProps;

  XLSX.writeFile(workbook, filename);
}
