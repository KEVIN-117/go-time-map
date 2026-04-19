# GO Time Neighborhood Map

## Árbol de directorios de ejemplo basado estrictamente en Component Driven Development

```text
go-time-map/
├── public/                               # Assets públicos (favicon, manifest de PWA)
├── src/
│   ├── assets/                           # Imágenes, SVGs estáticos (emojis, logo)
│   │
│   ├── components/                       # 🔥 EL CORAZÓN DEL CDD (Todo lo visual vive aquí)
│   │   ├── ui/                           # 1. Componentes base (Generados automáticamente por shadcn: button, sheet, input...)
│   │   │
│   │   ├── layout/                       # 2. Estructura visual global
│   │   │   ├── Header.tsx
│   │   │   └── BottomNav.tsx
│   │   │
│   │   ├── map/                          # 3. Dominio Cartográfico (Aislado)
│   │   │   ├── CoreMap.tsx               # El contenedor de React-Leaflet
│   │   │   ├── ActivityMarker.tsx        # El pin visual en el mapa
│   │   │   └── MapControls.tsx           # Botones de zoom/ubicación
│   │   │
│   │   └── activities/                   # 4. Dominio de Negocio (Las acciones)
│   │       ├── ActivityCard.tsx          # La tarjeta visual de "Ofrezco/Necesito"
│   │       ├── ActivityForm.tsx          # El formulario visual para publicar
│   │       ├── ActivityFilters.tsx       # Los botones de filtro visuales
│   │       └── ActivityDetailSheet.tsx   # El Drawer de detalles (usando el Sheet de shadcn)
│   │
│   ├── hooks/                            # Lógica y estado (Totalmente separado de la UI)
│   │   ├── useActivities.ts              # Aquí vive TanStack Query + Firebase fetch
│   │   ├── useGeolocation.ts             # Lógica para obtener el GPS del celular
│   │   └── usePublish.ts                 # Mutación para subir datos a Firestore
│   │
│   ├── lib/                              # Configuraciones y utilidades
│   │   ├── firebase.ts                   # Inicialización de la app de Firebase
│   │   └── utils.ts                      # Merge de clases Tailwind (autogenerado por shadcn)
│   │
│   ├── types/                            # Contratos de datos (Crucial para no romper cosas)
│   │   └── index.ts                      # Interfaces: Activity, Location, User...
│   │
│   ├── App.tsx                           # Punto de ensamblaje (Solo agrupa Providers y Layout)
│   ├── index.css                         # Estilos globales y variables CSS de shadcn
│   └── main.tsx                          # Punto de entrada de React
```

### ¿Por qué esto es CDD Puro y te salvará en el Hackathon?

1. **Cero mezclas:** Si necesitas arreglar el botón de publicar, vas directo a `components/activities/ActivityForm.tsx`. La UI no está dividida arbitrariamente por "tamaño", sino por lo que representa.
2. **Desacoplamiento de Lógica:** Fíjate que en la carpeta `components/` **solo hay UI**. Si `ActivityCard.tsx` necesita mostrar datos, los recibe por `props`. La lógica pesada de Firebase y TanStack Query vive en `hooks/`. Esto significa que puedes diseñar la tarjeta visualmente con datos falsos (dummy data) hoy mismo, sin tener Firebase configurado.
3. **shadcn/ui en cuarentena:** Todos los componentes instalados con `npx shadcn-ui@latest add [componente]` irán automáticamente a `components/ui/`. Tu equipo sabrá que esos archivos rara vez se tocan, enfocándose en las carpetas `map` y `activities`.
