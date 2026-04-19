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
            <SheetContent side="bottom" className="rounded-t-3xl px-6 pb-10 pt-4 h-auto max-h-[90vh] xl:w-[50vw] md:w-[70vw] sm:w-screen mx-auto overflow-y-auto bg-background border-t-2 border-muted">
                <div className="mx-auto w-12 h-1.5 rounded-full bg-muted mb-6" />

                {activity.imageUrl && (
                    <div className="mb-6 rounded-lg overflow-hidden border-2 border-muted shadow-md">
                        <img
                            src={activity.imageUrl}
                            alt={activity.title}
                            className="w-full h-64 object-cover"
                        />
                    </div>
                )}

                <SheetHeader className="text-left space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                        <span className={`px-3 py-1.5 rounded-full text-sm font-bold text-white shadow-md ${isOffer ? "bg-teal-500" : "bg-rose-400"}`}>
                            {isOffer ? "🤝 Ofrezco" : "🙌 Necesito"}
                        </span>
                        <span className="px-3 py-1.5 bg-secondary bg-opacity-15 text-secondary text-xs uppercase tracking-wider font-semibold rounded-full">
                            {activity.category}
                        </span>
                    </div>

                    <SheetTitle className="text-3xl font-bold leading-tight text-foreground pt-2">
                        {activity.title}
                    </SheetTitle>

                    <div className="text-sm text-muted-foreground">
                        Publicado por <span className="font-semibold text-foreground">{activity.author}</span>
                    </div>
                </SheetHeader>

                <div className="space-y-6 my-8 pb-4">
                    <div>
                        <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">Descripción</h4>
                        <p className="text-base text-foreground leading-relaxed whitespace-pre-wrap bg-muted bg-opacity-30 p-4 rounded-lg">
                            {activity.description}
                        </p>
                    </div>
                </div>

                <div className="mt-8 space-y-3 sticky bottom-0 bg-background pt-4 border-t border-muted">
                    <Button
                        onClick={handleWhatsAppClick}
                        className="w-full bg-[#25D366] hover:bg-[#1EBE5A] text-white font-bold py-6 text-base shadow-lg rounded-xl transition-all"
                    >
                        Contactar por WhatsApp
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
};
