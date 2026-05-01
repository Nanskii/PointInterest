// Data tempat wisata & kuliner Indonesia (dummy)
export type Category = "nature" | "cultural" | "traditional" | "modern";

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
}

export const CATEGORY_META: Record<Category, { label: string; color: string; emoji: string }> = {
  nature: { label: "Wisata Alam", color: "#16a34a", emoji: "🌿" },
  cultural: { label: "Wisata Budaya", color: "#9333ea", emoji: "🏛️" },
  traditional: { label: "Kuliner Tradisional", color: "#ea580c", emoji: "🍛" },
  modern: { label: "Kuliner Modern", color: "#0ea5e9", emoji: "🍽️" },
};

export const PLACES: Place[] = [
  // WISATA ALAM
  { id: "n1", name: "Gunung Bromo", category: "nature", region: "Jawa Timur",
    address: "Taman Nasional Bromo Tengger Semeru, Jawa Timur",
    description: "Gunung berapi aktif yang ikonik, terkenal dengan pemandangan matahari terbit di atas lautan pasir.",
    rating: 4.8, image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800",
    lat: -7.9425, lng: 112.9530, tags: ["gunung api", "matahari terbit", "hiking"] },
  { id: "n2", name: "Kepulauan Raja Ampat", category: "nature", region: "Papua Barat",
    address: "Kabupaten Raja Ampat, Papua Barat",
    description: "Surga menyelam kelas dunia dengan keanekaragaman hayati laut terkaya di bumi.",
    rating: 4.9, image: "https://images.unsplash.com/photo-1516509458637-ea423d3f8467?w=800",
    lat: -0.2346, lng: 130.5256, tags: ["menyelam", "pantai", "pulau"] },
  { id: "n3", name: "Taman Nasional Komodo", category: "nature", region: "Nusa Tenggara Timur",
    address: "Pulau Komodo, Nusa Tenggara Timur",
    description: "Rumah bagi komodo legendaris dan pantai pink yang menakjubkan.",
    rating: 4.8, image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800",
    lat: -8.5500, lng: 119.4892, tags: ["satwa liar", "pantai", "pulau"] },
  { id: "n4", name: "Danau Toba", category: "nature", region: "Sumatera Utara",
    address: "Samosir, Sumatera Utara",
    description: "Danau vulkanik terbesar di dunia dengan pulau unik di tengahnya.",
    rating: 4.7, image: "https://images.unsplash.com/photo-1583309217394-d3b9a99c1b73?w=800",
    lat: 2.6845, lng: 98.8756, tags: ["danau", "pemandangan", "budaya"] },
  { id: "n5", name: "Tanjung Puting", category: "nature", region: "Kalimantan Tengah",
    address: "Taman Nasional Tanjung Puting, Kalimantan Tengah",
    description: "Terkenal dengan konservasi orangutan dan pelayaran sungai hutan hujan yang rimbun.",
    rating: 4.7, image: "https://images.unsplash.com/photo-1605552055839-cae9aab7e93c?w=800",
    lat: -2.7500, lng: 111.9500, tags: ["satwa liar", "hutan", "orangutan"] },
  { id: "n6", name: "Sawah Terasering Tegalalang", category: "nature", region: "Bali",
    address: "Tegalalang, Gianyar, Bali",
    description: "Sawah berundak hijau zamrud yang memamerkan warisan Subak.",
    rating: 4.6, image: "https://images.unsplash.com/photo-1531592937781-344ad608fabf?w=800",
    lat: -8.4317, lng: 115.2779, tags: ["sawah", "pemandangan", "bali"] },
  { id: "n7", name: "Gunung Rinjani", category: "nature", region: "Nusa Tenggara Barat",
    address: "Lombok, Nusa Tenggara Barat",
    description: "Gunung berapi tertinggi kedua di Indonesia dengan danau kawah yang menakjubkan.",
    rating: 4.8, image: "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=800",
    lat: -8.4116, lng: 116.4575, tags: ["gunung api", "pendakian", "danau"] },
  { id: "n8", name: "Pantai Pink", category: "nature", region: "Nusa Tenggara Timur",
    address: "Pulau Komodo, Nusa Tenggara Timur",
    description: "Salah satu dari hanya tujuh pantai berpasir merah muda di dunia.",
    rating: 4.7, image: "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=800",
    lat: -8.6097, lng: 119.6203, tags: ["pantai", "snorkel"] },
  { id: "n9", name: "Taman Nasional Wakatobi", category: "nature", region: "Sulawesi Tenggara",
    address: "Kabupaten Wakatobi, Sulawesi Tenggara",
    description: "Suaka karang murni yang sempurna untuk menyelam dan snorkeling.",
    rating: 4.8, image: "https://images.unsplash.com/photo-1582434201482-99d23a73074a?w=800",
    lat: -5.3133, lng: 123.5811, tags: ["menyelam", "karang", "laut"] },
  { id: "n10", name: "Kawah Ijen", category: "nature", region: "Jawa Timur",
    address: "Banyuwangi, Jawa Timur",
    description: "Terkenal dengan api biru memesona dan danau kawah berwarna toska.",
    rating: 4.7, image: "https://images.unsplash.com/photo-1604608672516-f1b9b1d1e1d6?w=800",
    lat: -8.0583, lng: 114.2422, tags: ["gunung api", "api biru", "pendakian"] },

  // WISATA BUDAYA
  { id: "c1", name: "Candi Borobudur", category: "cultural", region: "Jawa Tengah",
    address: "Magelang, Jawa Tengah",
    description: "Candi Buddha terbesar di dunia, mahakarya Warisan Dunia UNESCO.",
    rating: 4.9, image: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800",
    lat: -7.6079, lng: 110.2038, tags: ["candi", "warisan", "buddha"] },
  { id: "c2", name: "Candi Prambanan", category: "cultural", region: "Yogyakarta",
    address: "Sleman, Yogyakarta",
    description: "Kompleks candi Hindu megah abad ke-9 dan situs Warisan Dunia UNESCO.",
    rating: 4.8, image: "https://images.unsplash.com/photo-1584810359583-96fc9999df0d?w=800",
    lat: -7.7520, lng: 110.4915, tags: ["candi", "hindu", "warisan"] },
  { id: "c3", name: "Tana Toraja", category: "cultural", region: "Sulawesi Selatan",
    address: "Kabupaten Toraja, Sulawesi Selatan",
    description: "Terkenal dengan ritual pemakaman unik dan rumah adat Tongkonan.",
    rating: 4.7, image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800",
    lat: -3.0744, lng: 119.7411, tags: ["budaya", "tradisi", "ritual"] },

  // KULINER TRADISIONAL
  { id: "t1", name: "Warung Babi Guling Ibu Oka", category: "traditional", region: "Bali",
    address: "Jl. Tegal Sari No.2, Ubud, Bali",
    description: "Babi guling Bali legendaris dengan bumbu rempah yang kaya dan harum.",
    rating: 4.6, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
    lat: -8.5069, lng: 115.2625, tags: ["bali", "babi", "pedas"] },
  { id: "t2", name: "Sate Klathak Pak Pong", category: "traditional", region: "Yogyakarta",
    address: "Jl. Imogiri Timur, Bantul, Yogyakarta",
    description: "Sate kambing terkenal yang dipanggang dengan jeruji besi — klasik Yogyakarta.",
    rating: 4.7, image: "https://images.unsplash.com/photo-1529563021893-cc83c992d75d?w=800",
    lat: -7.8867, lng: 110.4069, tags: ["sate", "kambing", "panggang"] },
  { id: "t3", name: "Gudeg Yu Djum", category: "traditional", region: "Yogyakarta",
    address: "Jl. Wijilan, Yogyakarta",
    description: "Gudeg nangka manis ikonik, hidangan khas Yogyakarta.",
    rating: 4.5, image: "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=800",
    lat: -7.8030, lng: 110.3686, tags: ["nangka", "manis", "jawa"] },
  { id: "t4", name: "Soto Kudus Bu Jatmi", category: "traditional", region: "Jawa Tengah",
    address: "Kudus, Jawa Tengah",
    description: "Soto ayam kaya rempah dan harum disajikan dengan nasi dan kerupuk renyah.",
    rating: 4.5, image: "https://images.unsplash.com/photo-1583224964978-2257b960c3d3?w=800",
    lat: -6.8048, lng: 110.8405, tags: ["soto", "ayam"] },
  { id: "t5", name: "Rumah Makan Padang Sederhana", category: "traditional", region: "Sumatera Barat",
    address: "Padang, Sumatera Barat",
    description: "Masakan Padang otentik menampilkan rendang dan gulai ikonik.",
    rating: 4.6, image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800",
    lat: -0.9492, lng: 100.3543, tags: ["rendang", "pedas", "padang"] },
  { id: "t6", name: "Bakso Pak Sholeh", category: "traditional", region: "Jawa Tengah",
    address: "Solo, Jawa Tengah",
    description: "Bakso sapi yang dicintai dengan kuah gurih yang kaya rasa.",
    rating: 4.4, image: "https://images.unsplash.com/photo-1547928576-b822bc410bdf?w=800",
    lat: -7.5755, lng: 110.8243, tags: ["bakso", "kuah"] },
  { id: "t7", name: "Nasi Liwet Bu Wongso Lemu", category: "traditional", region: "Jawa Tengah",
    address: "Solo, Jawa Tengah",
    description: "Nasi santan klasik yang disajikan dengan ayam dan lauk gurih.",
    rating: 4.5, image: "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=800",
    lat: -7.5697, lng: 110.8276, tags: ["nasi", "santan"] },

  // KULINER MODERN
  { id: "m1", name: "Locavore Ubud", category: "modern", region: "Bali",
    address: "Jl. Dewisita No.10, Ubud, Bali",
    description: "Fine dining pemenang penghargaan menampilkan bahan lokal Indonesia.",
    rating: 4.8, image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
    lat: -8.5069, lng: 115.2625, tags: ["fine dining", "modern"] },
  { id: "m2", name: "Namaaz Dining", category: "modern", region: "Jakarta",
    address: "Jl. Gunawarman No.42, Jakarta",
    description: "Gastronomi molekuler Indonesia avant-garde dengan presentasi teatrikal.",
    rating: 4.7, image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
    lat: -6.2349, lng: 106.7993, tags: ["molekuler", "tasting"] },
  { id: "m3", name: "Kaum Jakarta", category: "modern", region: "Jakarta",
    address: "Menteng, Jakarta",
    description: "Restoran modern yang merayakan kekayaan kuliner warisan Indonesia.",
    rating: 4.6, image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800",
    lat: -6.1944, lng: 106.8294, tags: ["warisan", "tren"] },
];
