import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { collection, query, onSnapshot, orderBy, addDoc, serverTimestamp } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../lib/firebase";
import type { Activity } from "@/types";

export const useActivities = () => {
    const queryClient = useQueryClient();

    useEffect(() => {
        const q = query(collection(db, "activities"), orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const activities = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Activity[];

            queryClient.setQueryData(["activities"], activities);
        }, (error) => {
            console.error("Error escuchando actividades:", error);
        });

        return () => unsubscribe();
    }, [queryClient]);

    return useQuery({
        queryKey: ["activities"],
        queryFn: () => queryClient.getQueryData(["activities"]) as Activity[] || [],
        staleTime: Infinity,
    });
};

export const useAddActivity = () => {
    return useMutation({
        mutationFn: async (newActivity: Omit<Activity, "id" | "createdAt" | "status">) => {
            const activitiesRef = collection(db, "activities");
            return await addDoc(activitiesRef, {
                ...newActivity,
                status: "active",
                createdAt: serverTimestamp(),
            });
        },
    });
};