import React, { useState, useEffect, useMemo } from 'react';
import initialStudentsData from './data/students.json';
import Navbar from './components/Navbar';
import SegmentedTabs from './components/SegmentedTabs';
import FilterBar from './components/FilterBar';
import OverviewView from './components/OverviewView';
import SpecificCategoryView from './components/SpecificCategoryView';
import ActivityMatrixView from './components/ActivityMatrixView';
import DatabaseCrudView from './components/DatabaseCrudView';
import StudentModal from './components/StudentModal';
import { 
  Building2, 
  Globe2, 
  GraduationCap, 
  PlaneTakeoff, 
  MapPin, 
  CheckCircle2 
} from 'lucide-react';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'ori_mariana_presencial_students_v1';

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Students state with localStorage persistence
  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading saved students:', e);
    }
    return initialStudentsData;
  });

  const saveStudents = (newStudents) => {
    setStudents(newStudents);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newStudents));
    } catch (e) {
      console.error('Error saving students to localStorage:', e);
    }
  };

  const handleResetData = () => {
    if (window.confirm('¿Deseas restaurar la base de datos con los registros originales del archivo Excel? Se perderán las modificaciones no guardadas.')) {
      setStudents(initialStudentsData);
      localStorage.removeItem(STORAGE_KEY);
      confetti({ particleCount: 40, spread: 50 });
    }
  };

  // Active view tab
  const [activeTab, setActiveTab] = useState('overview');

  // Filters state
  const [filters, setFilters] = useState({
    facultad: 'all',
    programa: 'all',
    tipoActividad: 'all',
    categoria: 'all',
    search: ''
  });

  const resetFilters = () => {
    setFilters({
      facultad: 'all',
      programa: 'all',
      tipoActividad: 'all',
      categoria: 'all',
      search: ''
    });
  };

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.facultad !== 'all') count++;
    if (filters.programa !== 'all') count++;
    if (filters.tipoActividad !== 'all') count++;
    if (filters.categoria !== 'all') count++;
    if (filters.search.trim() !== '') count++;
    return count;
  }, [filters]);

  // Dynamic filter lists
  const facultiesList = useMemo(() => {
    const set = new Set();
    students.forEach(s => {
      if (s.facultad) set.add(s.facultad);
    });
    return Array.from(set).sort();
  }, [students]);

  const programsList = useMemo(() => {
    const set = new Set();
    students.forEach(s => {
      if (filters.facultad === 'all' || s.facultad === filters.facultad) {
        if (s.programa) set.add(s.programa);
      }
    });
    return Array.from(set).sort();
  }, [students, filters.facultad]);

  const activitiesList = useMemo(() => {
    const set = new Set();
    students.forEach(s => {
      if (s.tipoActividad) set.add(s.tipoActividad);
    });
    return Array.from(set).sort();
  }, [students]);

  // Filtered students
  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      if (filters.facultad !== 'all' && s.facultad !== filters.facultad) return false;
      if (filters.programa !== 'all' && s.programa !== filters.programa) return false;
      if (filters.tipoActividad !== 'all' && s.tipoActividad !== filters.tipoActividad) return false;
      if (filters.categoria !== 'all') {
        const cat = `${s.direccion} ${s.ambito}`;
        if (cat !== filters.categoria) return false;
      }
      if (filters.search) {
        const term = filters.search.toLowerCase();
        const matches = (
          (s.nombreCompleto && s.nombreCompleto.toLowerCase().includes(term)) ||
          (s.documento && String(s.documento).includes(term)) ||
          (s.programa && s.programa.toLowerCase().includes(term)) ||
          (s.facultad && s.facultad.toLowerCase().includes(term)) ||
          (s.institucionDestino && s.institucionDestino.toLowerCase().includes(term)) ||
          (s.institucionOrigen && s.institucionOrigen.toLowerCase().includes(term)) ||
          (s.tipoActividad && s.tipoActividad.toLowerCase().includes(term))
        );
        if (!matches) return false;
      }
      return true;
    });
  }, [students, filters]);

  // Tab counts
  const counts = useMemo(() => {
    return {
      total: filteredStudents.length,
      entranteNac: filteredStudents.filter(s => s.direccion === 'Entrante' && s.ambito === 'Nacional').length,
      entranteInter: filteredStudents.filter(s => s.direccion === 'Entrante' && s.ambito === 'Internacional').length,
      salienteNac: filteredStudents.filter(s => s.direccion === 'Saliente' && s.ambito === 'Nacional').length,
      salienteInter: filteredStudents.filter(s => s.direccion === 'Saliente' && s.ambito === 'Internacional').length,
      regional: filteredStudents.filter(s => s.ambito === 'Regional').length,
    };
  }, [filteredStudents]);

  // Modal State
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: 'view', // 'view', 'edit', 'create'
    student: null
  });

  const handleOpenView = (student) => {
    setModalState({ isOpen: true, mode: 'view', student });
  };

  const handleOpenEdit = (student) => {
    setModalState({ isOpen: true, mode: 'edit', student });
  };

  const handleOpenCreate = () => {
    setModalState({ isOpen: true, mode: 'create', student: null });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, mode: 'view', student: null });
  };

  const handleSaveStudent = (studentData) => {
    if (modalState.mode === 'create') {
      const newId = Math.max(...students.map(s => Number(s.id) || 0), 0) + 1;
      const created = {
        ...studentData,
        id: newId,
        No: newId,
        categoriaCanonica: `${studentData.direccion} ${studentData.ambito}`
      };
      saveStudents([created, ...students]);
      confetti({ particleCount: 40, spread: 50 });
    } else {
      // Edit
      const updated = students.map(s => s.id === studentData.id ? studentData : s);
      saveStudents(updated);
    }
  };

  const handleDeleteStudent = (studentId) => {
    const updated = students.filter(s => s.id !== studentId);
    saveStudents(updated);
  };

  // Cross-Matrix Click Handler
  const handleFilterByActivityAndCategory = (activityName, categoryKey) => {
    setFilters(prev => ({
      ...prev,
      tipoActividad: activityName,
      categoria: categoryKey
    }));
    setActiveTab('database');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f7] dark:bg-[#000000] text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-200">
      {/* Translucent Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        totalCount={students.length}
        filteredCount={filteredStudents.length}
        students={filteredStudents}
        onResetData={handleResetData}
      />

      {/* Segmented Navigation Controls */}
      <SegmentedTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        counts={counts}
      />

      {/* Dynamic Filter Bar (Visible across relevant views) */}
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        facultiesList={facultiesList}
        programsList={programsList}
        activitiesList={activitiesList}
        resetFilters={resetFilters}
        activeFilterCount={activeFilterCount}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1 pb-16">
        {activeTab === 'overview' && (
          <OverviewView
            students={filteredStudents}
            onSelectCategory={(tabId) => setActiveTab(tabId)}
          />
        )}

        {activeTab === 'entrante-nacional' && (
          <SpecificCategoryView
            categoryKey="entrante-nacional"
            title="Estudiantes Entrantes Nacionales"
            subtitle="Estudiantes procedentes de universidades colombianas que realizaron movilidad académica presencial en la Universidad Mariana."
            icon={Building2}
            accentColor="#0071e3"
            students={filteredStudents.filter(s => s.direccion === 'Entrante' && s.ambito === 'Nacional')}
            onViewStudent={handleOpenView}
          />
        )}

        {activeTab === 'entrante-internacional' && (
          <SpecificCategoryView
            categoryKey="entrante-internacional"
            title="Estudiantes Entrantes Internacionales"
            subtitle="Estudiantes extranjeros que llegaron presencialmente a la Universidad Mariana para misiones, intercambios y eventos."
            icon={Globe2}
            accentColor="#af52de"
            students={filteredStudents.filter(s => s.direccion === 'Entrante' && s.ambito === 'Internacional')}
            onViewStudent={handleOpenView}
          />
        )}

        {activeTab === 'saliente-nacional' && (
          <SpecificCategoryView
            categoryKey="saliente-nacional"
            title="Estudiantes Salientes Nacionales"
            subtitle="Estudiantes de la Universidad Mariana que realizaron movilidad presencial en otras universidades del territorio colombiano."
            icon={GraduationCap}
            accentColor="#34c759"
            students={filteredStudents.filter(s => s.direccion === 'Saliente' && s.ambito === 'Nacional')}
            onViewStudent={handleOpenView}
          />
        )}

        {activeTab === 'saliente-internacional' && (
          <SpecificCategoryView
            categoryKey="saliente-internacional"
            title="Estudiantes Salientes Internacionales"
            subtitle="Estudiantes de la Universidad Mariana que viajaron al exterior (Bélgica, Ecuador, Perú, México, etc.) para prácticas, congresos y cursos."
            icon={PlaneTakeoff}
            accentColor="#ff9500"
            students={filteredStudents.filter(s => s.direccion === 'Saliente' && s.ambito === 'Internacional')}
            onViewStudent={handleOpenView}
          />
        )}

        {activeTab === 'regional' && (
          <SpecificCategoryView
            categoryKey="regional"
            title="Movilidad Estudiantil Regional"
            subtitle="Movilidad estudiantil presencial articulada con universidades de la región (Nariño, Cauca, Valle del Cauca) como U. Cesmag, Udenar y U. Libre."
            icon={MapPin}
            accentColor="#0284c7"
            students={filteredStudents.filter(s => s.ambito === 'Regional')}
            onViewStudent={handleOpenView}
          />
        )}

        {activeTab === 'matrix' && (
          <ActivityMatrixView
            students={filteredStudents}
            onFilterByActivityAndCategory={handleFilterByActivityAndCategory}
          />
        )}

        {activeTab === 'database' && (
          <DatabaseCrudView
            students={filteredStudents}
            onOpenCreate={handleOpenCreate}
            onOpenEdit={handleOpenEdit}
            onOpenView={handleOpenView}
            onDeleteStudent={handleDeleteStudent}
            onResetData={handleResetData}
          />
        )}
      </main>

      {/* Student Detail / Edit / Create Modal */}
      <StudentModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        student={modalState.student}
        mode={modalState.mode}
        onSave={handleSaveStudent}
      />

      {/* Footer */}
      <footer className="w-full border-t border-zinc-200/80 dark:border-zinc-800/80 py-6 text-center text-xs text-zinc-500 dark:text-zinc-400 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Universidad Mariana — Oficina de Relaciones Internacionales (ORI)</span>
          <span className="text-[11px] text-zinc-400">Consolidado Oficial de Estudiantes Presenciales 2026-1 • Listo para Vercel</span>
        </div>
      </footer>
    </div>
  );
}
