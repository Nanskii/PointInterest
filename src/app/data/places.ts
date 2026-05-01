// Data tempat wisata & kuliner Indonesia (dummy)
export type Category = "nature" | "cultural" | "traditional" | "modern";
import type { Review } from "../components/PlaceDetail";

export interface Place {
  id: string;
  name: string;
  category: Category;
  region: string;
  address: string;
  description: string;
  rating: number;
  image: string;
  lat: number;
  lng: number;
  tags: string[];
  reviews?: Review[];
}

export const CATEGORY_META: Record<Category, { label: string; color: string; emoji: string }> = {
  nature: { label: "Wisata Alam", color: "#16a34a", emoji: "🌿" },
  cultural: { label: "Wisata Budaya", color: "#9333ea", emoji: "🏛️" },
  traditional: { label: "Kuliner Tradisional", color: "#ea580c", emoji: "🍛" },
  modern: { label: "Kuliner Modern", color: "#0ea5e9", emoji: "🍽️" },
};
