import { useState } from "react";
import { CoreMap } from "./components/map/CoreMap";
import { useActivities } from "./hooks/useActivities";
import { ActivityDetailSheet } from "./components/activities/ActivityDetailSheet";
import { PublishActivity } from "./components/activities/PublishActivity"; // <-- NUEVO

function App() {
  const { data: activities, isLoading } = useActivities();
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="w-full h-dvh flex items-center justify-center bg-gradient-to-br from-background to-blue-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-muted border-t-primary"></div>
          <p className="text-lg font-medium text-foreground animate-pulse">Cargando mapa de Cochabamba...</p>
        </div>
      </div>
    );
  }

  // ... (manejo de isError se mantiene igual)

  return (
    <main className="relative w-full h-dvh overflow-hidden bg-background">
      <CoreMap
        activities={activities!}
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
