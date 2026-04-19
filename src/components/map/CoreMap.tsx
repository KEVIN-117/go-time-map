import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
// ¡CRÍTICO! Sin este CSS, el mapa se verá roto y los tiles desordenados
import "leaflet/dist/leaflet.css";
import type { Activity } from "@/types";
import { Handshake, HandHeart } from "lucide-react";

interface CoreMapProps {
    activities: Activity[];
    onMarkerClick?: (activityId: string) => void;
}

// Coordenadas centrales de Cochabamba
const DEFAULT_CENTER: [number, number] = [-17.38195, -66.15995];

// Helper para crear íconos personalizados rápidos y sin imágenes externas
const createCustomIcon = (type: "offer" | "need") => {
    const color = type === "offer" ? "bg-emerald-500" : "bg-rose-500";
    const emoji = type === "offer" ? "🤝" : "🙌";

    return L.divIcon({
        className: "custom-div-icon",
        html: `<div class="${color} text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg border-2 border-white text-lg">
             ${emoji}
           </div>`,
        iconSize: [60, 60],
        iconAnchor: [16, 16],
    });
};

export const CoreMap = ({ activities, onMarkerClick }: CoreMapProps) => {
    return (
        <div className="w-dvw h-dvh relative z-0">
            <MapContainer
                center={DEFAULT_CENTER}
                zoom={14}
                zoomControl={false}
                className="w-screen h-screen"
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://carto.com/">Carto</a>'
                />

                {activities && activities.map((activity) => (
                    <Marker
                        key={activity.id}
                        position={[activity.lat, activity.lng]}
                        icon={createCustomIcon(activity.type)}
                        eventHandlers={{
                            click: () => onMarkerClick?.(activity.id),
                        }}
                    >
                        <Popup className="rounded-lg">
                            <div className="p-1">
                                {activity.type === "offer" ? <Handshake className="text-emerald-500 mb-2" /> : <HandHeart className="text-rose-500 mb-2" />}
                                <h3 className="font-bold text-sm mb-1">{activity.title}</h3>
                                <p className="text-xs text-gray-600 line-clamp-2">{activity.description}</p>
                                <span className="text-[10px] text-gray-400 mt-2 block">
                                    Publicado por {activity.author}
                                </span>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};