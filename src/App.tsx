import { useState } from "react";
import { CoreMap } from "./components/map/CoreMap";
import { useActivities } from "./hooks/useActivities";
import { ActivityDetailSheet } from "./components/activities/ActivityDetailSheet";
import { PublishActivity } from "./components/activities/PublishActivity"; // <-- NUEVO

function App() {
  const { data: activities, isLoading, isError } = useActivities();
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="w-full h-dvh flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 animate-pulse">Cargando mapa de Cochabamba...</p>
      </div>
    );
  }

  // ... (manejo de isError se mantiene igual)

  return (
    <main className="relative w-full h-dvh overflow-hidden bg-gray-100">
      <CoreMap
        activities={activities}
        onMarkerClick={setSelectedActivityId}
      />

      <ActivityDetailSheet
        activityId={selectedActivityId}
        isOpen={!!selectedActivityId}
        onClose={() => setSelectedActivityId(null)}
      />

      {/* Botón flotante y formulario encapsulados */}
      <PublishActivity />
    </main>
  );
}

export default App;