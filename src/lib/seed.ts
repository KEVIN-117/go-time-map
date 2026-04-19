import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// Asumiendo que ya tienes tu db exportada desde src/lib/firebase.ts
import { db } from "./firebase";

export const seedDatabase = async () => {
    const activitiesRef = collection(db, "activities");

    const dummyData = [
        {
            type: "offer",
            category: "comida",
            // Coordenadas cerca de la Plaza 14 de Septiembre, Cochabamba
            lat: -17.3895,
            lng: -66.1568,
            status: "active",
            title: "Ofrezco porción de queque",
            description: "Hice queque de más esta tarde, ven con tu tupper. ¡Completamente gratis!",
            author: "Kevin",
            createdAt: serverTimestamp()
        },
        {
            type: "need",
            category: "herramientas",
            // Coordenadas cerca de El Prado, Cochabamba
            lat: -17.3820,
            lng: -66.1590,
            status: "active",
            title: "Necesito un taladro urgente",
            description: "Tengo que instalar un estante y mi taladro se quemó. Solo lo necesito por 1 hora.",
            author: "Ana",
            createdAt: serverTimestamp()
        },
        {
            type: "offer",
            category: "ayuda",
            // Coordenadas por la zona de Cala Cala
            lat: -17.3700,
            lng: -66.1585,
            status: "active",
            title: "Ayudo a pasear perritos",
            description: "Tengo tiempo libre hoy en la tarde por el parque Lincoln. Puedo llevar a 2 perritos.",
            author: "Marcelo",
            createdAt: serverTimestamp()
        }
    ];

    try {
        for (const data of dummyData) {
            await addDoc(activitiesRef, data);
        }
        console.log("¡Colección 'activities' creada y datos sembrados con éxito!");
    } catch (error) {
        console.error("Error al sembrar datos (revisa las reglas de Firestore):", error);
    }
};