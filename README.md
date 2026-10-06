# Tablero Interactivo de Movilidad Estudiantil Presencial (ORI Mariana 2026-1)

Plataforma analítica y sistema de gestión de movilidad estudiantil presencial de la **Oficina de Relaciones Internacionales (ORI) de la Universidad Mariana**, desarrollada con los principios de diseño y fluidez física de **Apple** (WWDC Design / Emil Kowalski).

---

## 🌟 Características Principales

1. **Segmentación Precisa e Independiente**:
   - **🎓 Entrantes Nacionales**: 487 estudiantes presenciales (+ 21 regionales).
   - **🌍 Entrantes Internacionales**: 51 estudiantes presenciales (procedentes de Ecuador, Perú, México, etc.).
   - **🏛️ Salientes Nacionales**: 332 estudiantes presenciales (+ 183 regionales).
   - **✈️ Salientes Internacionales**: 257 estudiantes presenciales (destinos en Bélgica, Ecuador, Perú, México, etc.).
   - **📍 Movilidad Regional**: 204 estudiantes vinculados a alianzas interinstitucionales regionales (U. Cesmag, Udenar, U. Libre).
   - **Total Presenciales**: **1,331 estudiantes** analizados.

2. **Análisis Profundo de `ID TIPO MOV / TIPO DE ACTIVIDAD`**:
   - Matriz cruzada interactiva y gráficos comparativos que relacionan cada tipo de actividad (Asistencia a eventos, Misiones académicas, Cursos cortos, Pasantías o prácticas, Semestres de intercambio, Estancias de investigación) contra cada categoría de movilidad.
   - Gráficos interactivos construidos con Recharts.

3. **Base de Datos Completa & Gestión (CRUD)**:
   - Vista de tabla dinámica con paginación, búsqueda instantánea y filtros combinables.
   - **Ver Ficha**: Modal interactivo estilo Apple Sheet con todos los datos del estudiante, convenios y financiación.
   - **Editar**: Modificación de cualquier campo con persistencia en el navegador (`localStorage`).
   - **Eliminar**: Eliminación de registros con confirmación suave.
   - **Nuevo Estudiante**: Formulario para registrar nuevos estudiantes de movilidad presencial.
   - **Exportación**: Descarga directa de los datos filtrados o completos en formato **Excel (.xlsx)** y **JSON**.
   - **Restaurar**: Botón para reiniciar la base de datos a los 1,331 registros originales del Excel.

4. **Diseño Estético Estilo Apple (Apple Design HIG)**:
   - Superficies de cristal translúcido con desenfoque de fondo (`backdrop-filter: blur(20px)`).
   - Microinteracciones táctiles en botones y tarjetas (`active:scale-[0.98]`).
   - Controles segmentados tipo cápsula (Segmented Controls).
   - Modo Claro y Modo Oscuro (Apple Dark Mode).
   - Tipografía SF Pro / Inter con ajuste óptico (`tracking-tight`).

5. **Hoja Integrada en el Archivo Excel**:
   - En el archivo `MATRIZ CONSOLIDADA COMPLETA 2026-1 (1).xlsm` se generó la hoja **`CONSOLIDADO EST. PRESENCIALES`** con tarjetas KPI, tabla dinámica cruzada por actividad y desglose por facultades con porcentajes.

---

## 🚀 Despliegue en Vercel

Este proyecto está 100% listo para ser desplegado en **Vercel**:

### Opción 1: Mediante GitHub / Vercel Web (Recomendado)
1. Sube este repositorio a tu cuenta de GitHub.
2. Ingresa a [vercel.com](https://vercel.com) e inicia sesión.
3. Haz clic en **"Add New..."** -> **"Project"**.
4. Selecciona tu repositorio.
5. Vercel detectará automáticamente **Vite** como framework:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Haz clic en **Deploy**. ¡Tu dashboard estará en línea en segundos con HTTPS automático!

### Opción 2: Mediante la CLI de Vercel
```bash
npx vercel
```
Sigue las instrucciones en la terminal y selecciona las opciones predeterminadas.

---

## 💻 Ejecución Local

Para ejecutar el proyecto en tu computadora:

```bash
# 1. Instalar dependencias (ya instaladas)
npm install

# 2. Iniciar servidor de desarrollo local
npm run dev

# 3. Compilar para producción
npm run build

# 4. Previsualizar compilación de producción
npm run preview
```

---

## 📁 Estructura del Proyecto

```text
├── src/
│   ├── components/
│   │   ├── Navbar.jsx               # Barra superior translúcida con acciones y tema
│   │   ├── SegmentedTabs.jsx        # Control segmentado de navegación estilo Apple
│   │   ├── FilterBar.jsx            # Filtros por facultad, programa, actividad y ámbito
│   │   ├── OverviewView.jsx         # Visión general con KPIs y gráficos principales
│   │   ├── SpecificCategoryView.jsx # Vistas dedicadas para cada grupo independiente
│   │   ├── ActivityMatrixView.jsx   # Matriz bidimensional cruzada (ID TIPO MOV)
│   │   ├── DatabaseCrudView.jsx     # Tabla completa con búsqueda, paginación y CRUD
│   │   └── StudentModal.jsx         # Modal estilo Apple sheet para ver/editar/crear
│   ├── data/
│   │   └── students.json            # 1,331 registros limpios de estudiantes presenciales
│   ├── utils/
│   │   └── exportExcel.js           # Utilidad SheetJS para exportar a Excel .xlsx
│   ├── App.jsx                      # Componente raíz con estado y filtros globales
│   ├── index.css                    # Estilos Tailwind y utilidades Apple Design
│   └── main.jsx                     # Punto de entrada de React
├── vercel.json                      # Configuración de rutas SPA para Vercel
├── package.json                     # Dependencias y scripts
└── MATRIZ CONSOLIDADA COMPLETA 2026-1 (1).xlsm # Archivo Excel con nueva hoja integrada
```
