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
    const color = type === "offer" ? "bg-teal-500" : "bg-rose-400";
    const borderColor = type === "offer" ? "border-teal-600" : "border-rose-500";
    const emoji = type === "offer" ? "🤝" : "🙌";

    return L.divIcon({
        className: "custom-div-icon",
        html: `<div class="${color} ${borderColor} text-white w-14 h-14 flex items-center justify-center rounded-full shadow-2xl border-3 text-xl font-semibold hover:scale-110 transition-transform">
             ${emoji}
           </div>`,
        iconSize: [56, 56],
        iconAnchor: [28, 28],
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

                {activities.map((activity) => (
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
