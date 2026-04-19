export interface Activity {
    id: string;
    type: "offer" | "need";
    category: string;
    lat: number;
    lng: number;
    status: "active" | "resolved";
    title: string;
    description: string;
    author: string;
    createdAt: any;
}

export interface Location {
    lat: number;
    lng: number;
}