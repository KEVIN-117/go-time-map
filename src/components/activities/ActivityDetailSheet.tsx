import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { useActivities } from "../../hooks/useActivities";

interface ActivityDetailSheetProps {
    activityId: string | null;
    isOpen: boolean;
    onClose: () => void;
}

export const ActivityDetailSheet = ({ activityId, isOpen, onClose }: ActivityDetailSheetProps) => {
    const { data: activities } = useActivities();

    const activity = activities?.find((a) => a.id === activityId);

    if (!activity) return null;

    const handleWhatsAppClick = () => {
        const text = `¡Hola ${activity.author}! Vi tu publicación "${activity.title}" en GO Time.`;
        window.open(`https://wa.me/59160000000?text=${encodeURIComponent(text)}`, "_blank");
    };

    const isOffer = activity.type === "offer";

    return (
        <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <SheetContent side="bottom" className="rounded-t-2xl px-6 pb-8 pt-4 h-auto max-h-[90vh] xl:w-[50vw] md:w-[70vw] sm:w-screen  mx-auto overflow-y-auto">
                <div className="mx-auto w-12 h-1.5 rounded-full bg-gray-200 mb-6" />

                <SheetHeader className="text-left space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold text-white ${isOffer ? "bg-emerald-500" : "bg-rose-500"}`}>
                            {isOffer ? "🤝 Ofrezco" : "🙌 Necesito"}
                        </span>
                        <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                            {activity.category}
                        </span>
                    </div>

                    <SheetTitle className="text-2xl font-bold leading-tight">
                        {activity.title}
                    </SheetTitle>

                    <div className="text-sm text-gray-500 pb-2">
                        Publicado por <span className="font-semibold text-gray-700">{activity.author}</span>
                    </div>
                </SheetHeader>

                <div className="mt-4">
                    <h4 className="text-sm font-semibold mb-2">Descripción</h4>
                    <SheetDescription className="text-base text-gray-700 whitespace-pre-wrap">
                        {activity.description}
                    </SheetDescription>
                </div>

                <div className="mt-8">
                    <Button
                        onClick={handleWhatsAppClick}
                        className="w-full bg-[#25D366] hover:bg-[#1EBE5A] text-white font-bold py-6 text-lg shadow-lg"
                    >
                        Contactar por WhatsApp
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
};