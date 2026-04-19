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
                    className="absolute bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl bg-gradient-to-br from-primary to-teal-600 hover:from-primary hover:to-teal-700 text-white z-50 flex items-center justify-center group transition-all hover:scale-110"
                    size="icon"
                >
                    <Plus className="h-8 w-8 group-hover:rotate-90 transition-transform" />
                </Button>
            </SheetTrigger>

            {/* EL FORMULARIO DESLIZABLE */}
            <SheetContent side="bottom" className="rounded-t-3xl px-6 pb-10 pt-4 h-[auto] max-h-[90vh] overflow-y-auto bg-background border-t-2 border-muted">
                <div className="mx-auto w-12 h-1.5 rounded-full bg-muted mb-6" />

                <SheetHeader className="text-left mb-8">
                    <SheetTitle className="text-3xl font-bold text-foreground">Crear Publicación</SheetTitle>
                    <p className="text-sm text-muted-foreground mt-2">Ayuda a tu vecindario en 1 hora</p>
                </SheetHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Selector de Tipo */}
                    <div>
                        <Label className="text-sm font-semibold text-foreground mb-3 block">¿Qué quieres hacer?</Label>
                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                type="button"
                                variant={formData.type === "offer" ? "default" : "outline"}
                                className={`py-6 rounded-xl font-bold transition-all ${formData.type === "offer" ? "bg-teal-500 hover:bg-teal-600 text-white shadow-lg" : "border-2 border-muted hover:border-primary text-foreground"}`}
                                onClick={() => setFormData({ ...formData, type: "offer" })}
                            >
                                🤝 Ofrezco
                            </Button>
                            <Button
                                type="button"
                                variant={formData.type === "need" ? "default" : "outline"}
                                className={`py-6 rounded-xl font-bold transition-all ${formData.type === "need" ? "bg-rose-400 hover:bg-rose-500 text-white shadow-lg" : "border-2 border-muted hover:border-primary text-foreground"}`}
                                onClick={() => setFormData({ ...formData, type: "need" })}
                            >
                                🙌 Necesito
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="category" className="text-sm font-semibold text-foreground">Categoría</Label>
                        <select
                            id="category"
                            className="flex h-11 w-full rounded-lg border-2 border-muted bg-background px-4 py-2.5 text-base font-medium text-foreground ring-offset-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option value="comida">🍽️ Comida</option>
                            <option value="herramientas">🔧 Herramientas</option>
                            <option value="ayuda">💪 Ayuda General</option>
                            <option value="mascotas">🐕 Mascotas</option>
                        </select>
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="title" className="text-sm font-semibold text-foreground">Título corto</Label>
                        <Input
                            id="title"
                            placeholder="Ej: Necesito escalera por 2 horas"
                            required
                            maxLength={50}
                            className="h-11 rounded-lg border-2 border-muted focus:border-primary text-base font-medium focus:ring-2 focus:ring-primary/20 transition-colors"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="description" className="text-sm font-semibold text-foreground">Detalles</Label>
                        <Textarea
                            id="description"
                            placeholder="Explica un poco más para que tus vecinos entiendan..."
                            required
                            rows={4}
                            className="rounded-lg border-2 border-muted focus:border-primary text-base font-medium focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full font-bold py-6 text-base bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg transition-all mt-8"
                        disabled={isPending || isLocating}
                    >
                        {isLocating ? (
                            <span className="flex items-center gap-2">
                                <MapPin className="animate-bounce h-5 w-5" /> Obteniendo GPS...
                            </span>
                        ) : isPending ? (
                            <span className="flex items-center gap-2">
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                Publicando...
                            </span>
                        ) : (
                            "Publicar en el mapa"
                        )}
                    </Button>
                </form>
            </SheetContent>
        </Sheet>
    );
};
