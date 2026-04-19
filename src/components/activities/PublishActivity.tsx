import { useState } from "react";
import { Plus, MapPin } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { useAddActivity } from "../../hooks/useActivities";

export const PublishActivity = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLocating, setIsLocating] = useState(false);
    const { mutateAsync: addActivity, isPending } = useAddActivity();

    // Estado del formulario
    const [formData, setFormData] = useState({
        type: "offer" as "offer" | "need",
        category: "ayuda",
        title: "",
        description: "",
        author: "Kevin", // En el futuro esto vendrá del sistema de Auth
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLocating(true);
        try {
            // 2. Enviar a Firebase
            await addActivity({
                ...formData,
                lat: -17.3964373,//position.coords.latitude,
                lng: -66.1583299,//position.coords.longitude,
            });

            // 3. Limpiar y cerrar
            setIsOpen(false);
            setFormData({ ...formData, title: "", description: "" });
        } catch (error) {
            console.error("Error al publicar:", error);
            alert("Hubo un error al publicar. Intenta de nuevo.");
        } finally {
            setIsLocating(false);
        }

        // 1. Obtener la ubicación real del celular
        // navigator.geolocation.getCurrentPosition(
        //     async (position) => {
        //         try {
        //             // 2. Enviar a Firebase
        //             await addActivity({
        //                 ...formData,
        //                 lat: -17.3964373,//position.coords.latitude,
        //                 lng: -66.1583299,//position.coords.longitude,
        //             });

        //             // 3. Limpiar y cerrar
        //             setIsOpen(false);
        //             setFormData({ ...formData, title: "", description: "" });
        //         } catch (error) {
        //             console.error("Error al publicar:", error);
        //             alert("Hubo un error al publicar. Intenta de nuevo.");
        //         } finally {
        //             setIsLocating(false);
        //         }
        //     },
        //     (error) => {
        //         console.error("Error de GPS:", error);
        //         alert("Necesitamos tu ubicación para colocar el pin en el mapa.");
        //         setIsLocating(false);
        //     },
        //     { enableHighAccuracy: true } // Crucial para móviles
        // );
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            {/* EL BOTÓN FLOTANTE (FAB) */}
            <SheetTrigger asChild>
                <Button
                    className="absolute bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl bg-slate-900 hover:bg-slate-800 text-white z-50"
                    size="icon"
                >
                    <Plus className="h-6 w-6" />
                </Button>
            </SheetTrigger>

            {/* EL FORMULARIO DESLIZABLE */}
            <SheetContent side="bottom" className="rounded-t-2xl px-6 pb-8 pt-4 h-[auto] max-h-[90vh] overflow-y-auto">
                <div className="mx-auto w-12 h-1.5 rounded-full bg-gray-200 mb-6" />

                <SheetHeader className="text-left mb-6">
                    <SheetTitle className="text-2xl font-bold">Crear Publicación</SheetTitle>
                </SheetHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Selector de Tipo */}
                    <div className="grid grid-cols-2 gap-4">
                        <Button
                            type="button"
                            variant={formData.type === "offer" ? "default" : "outline"}
                            className={formData.type === "offer" ? "bg-emerald-500 hover:bg-emerald-600" : ""}
                            onClick={() => setFormData({ ...formData, type: "offer" })}
                        >
                            🤝 Ofrezco
                        </Button>
                        <Button
                            type="button"
                            variant={formData.type === "need" ? "default" : "outline"}
                            className={formData.type === "need" ? "bg-rose-500 hover:bg-rose-600" : ""}
                            onClick={() => setFormData({ ...formData, type: "need" })}
                        >
                            🙌 Necesito
                        </Button>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">Categoría</Label>
                        <select
                            id="category"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option value="comida">Comida</option>
                            <option value="herramientas">Herramientas</option>
                            <option value="ayuda">Ayuda General</option>
                            <option value="mascotas">Mascotas</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="title">Título corto</Label>
                        <Input
                            id="title"
                            placeholder="Ej: Necesito escalera por 2 horas"
                            required
                            maxLength={50}
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Detalles</Label>
                        <Textarea
                            id="description"
                            placeholder="Explica un poco más para que tus vecinos entiendan..."
                            required
                            rows={3}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full font-bold py-6 text-base"
                        disabled={isPending || isLocating}
                    >
                        {isLocating ? (
                            <span className="flex items-center gap-2">
                                <MapPin className="animate-bounce h-5 w-5" /> Obteniendo GPS...
                            </span>
                        ) : isPending ? (
                            "Publicando..."
                        ) : (
                            "Publicar en el mapa"
                        )}
                    </Button>
                </form>
            </SheetContent>
        </Sheet>
    );
};