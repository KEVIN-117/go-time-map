import { useState, useRef } from "react";
import { Plus, MapPin, Image as ImageIcon, X } from "lucide-react";
import { uploadImageToCloudinary } from "../../lib/blob";
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

const INITIAL_FORM_STATE = {
    type: "offer" as "offer" | "need",
    category: "ayuda",
    title: "",
    description: "",
    author: "Kevin", // En el futuro esto vendrá del sistema de Auth
};

export const PublishActivity = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLocating, setIsLocating] = useState(false);
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const { mutateAsync: addActivity, isPending } = useAddActivity();

    // Estado del formulario centralizado
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);

    // 1. Mostrar Preview (NO sube a la nube todavía)
    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validar tipo de archivo
        if (!file.type.startsWith("image/")) {
            alert("Por favor selecciona una imagen válida");
            return;
        }

        // Validar tamaño (máximo 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert("La imagen debe ser menor a 5MB");
            return;
        }

        // Guardar archivo en memoria y crear preview local
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onload = (event) => {
            setImagePreview(event.target?.result as string);
        };
        reader.readAsDataURL(file);
    };

    // 2. Remover imagen antes de publicar
    const handleRemoveImage = () => {
        setImagePreview(null);
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    // 3. Manejar envío final (GPS + Cloudinary + Firebase)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLocating(true);

        // Obtener la ubicación real del celular
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    let finalImageUrl = undefined;

                    // A. Subir imagen a Cloudinary SOLO si hay un archivo seleccionado y vamos a publicar
                    if (selectedFile) {
                        setIsUploadingImage(true);
                        // IMPORTANTE: Asegúrate de que tu método de Cloudinary reciba el archivo o el base64
                        finalImageUrl = await uploadImageToCloudinary(selectedFile);
                        setIsUploadingImage(false);
                    }

                    // B. Enviar a Firebase
                    await addActivity({
                        ...formData,
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        imageUrl: finalImageUrl,
                    });

                    // C. Limpiar y cerrar
                    setIsOpen(false);
                    setFormData(INITIAL_FORM_STATE);
                    handleRemoveImage();
                } catch (error) {
                    console.error("Error al publicar:", error);
                    alert("Hubo un error al publicar. Intenta de nuevo.");
                    setIsUploadingImage(false);
                } finally {
                    setIsLocating(false);
                }
            },
            (error) => {
                console.error("Error de GPS:", error);
                alert("Necesitamos tu ubicación para colocar el pin en el mapa.");
                setIsLocating(false);
            },
            { enableHighAccuracy: true } // Crucial para móviles
        );
    };

    // Variable derivada para bloquear el botón si hay algún proceso en curso
    const isProcessing = isPending || isLocating || isUploadingImage;

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            {/* EL BOTÓN FLOTANTE (FAB) */}
            <SheetTrigger asChild>
                <Button
                    className="absolute bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl bg-linear-to-br from-primary to-teal-600 hover:from-primary hover:to-teal-700 text-white z-50 flex items-center justify-center group transition-all hover:scale-110"
                    size="icon"
                >
                    <Plus className="h-8 w-8 group-hover:rotate-90 transition-transform" />
                </Button>
            </SheetTrigger>

            {/* EL FORMULARIO DESLIZABLE */}
            <SheetContent side="bottom" className="rounded-t-3xl px-6 pb-10 pt-4 h-auto max-h-[90vh] xl:w-[50vw] md:w-[70vw] sm:w-screen mx-auto overflow-y-auto bg-background border-t-2 border-muted">
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

                    <div className="space-y-3">
                        <Label className="text-sm font-semibold text-foreground">Foto (opcional)</Label>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageSelect}
                            disabled={isProcessing}
                            className="hidden"
                        />
                        {imagePreview ? (
                            <div className="relative rounded-lg overflow-hidden border-2 border-primary bg-primary/5">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full h-48 object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isProcessing}
                                className="w-full border-2 border-dashed border-muted hover:border-primary rounded-lg p-6 transition-colors flex items-center justify-center gap-3 hover:bg-primary/5 disabled:opacity-50"
                            >
                                <ImageIcon className="h-5 w-5 text-muted-foreground" />
                                <div className="text-left">
                                    <p className="font-medium text-foreground">Añade una foto</p>
                                    <p className="text-xs text-muted-foreground">PNG, JPG o GIF (máximo 5MB)</p>
                                </div>
                            </button>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full font-bold py-6 text-base bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg transition-all mt-8"
                        disabled={isProcessing}
                    >
                        {isLocating ? (
                            <span className="flex items-center gap-2">
                                <MapPin className="animate-bounce h-5 w-5" /> Ubicando...
                            </span>
                        ) : isUploadingImage ? (
                            <span className="flex items-center gap-2">
                                <ImageIcon className="animate-pulse h-5 w-5" /> Subiendo foto...
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