import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";
import type { BlogPost } from "./types";

// Inisialisasi Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// Fungsi untuk mengubah data Firestore menjadi objek BlogPost
const mapToBlogPost = (doc: any): BlogPost => {
  const data = doc.data();
  return {
    id: doc.id,
    slug: data.slug,
    title: data.title,
    summary: data.metadesc,
    category: data.category.title,
    coverImage: data.image,
    publicationDate: new Date(data.created.seconds * 1000).toISOString(),
    authorName: 'Jane Doe', // Ganti dengan data penulis jika tersedia di Firestore
    authorImage: 'https://placehold.co/100x100.png', // Ganti dengan data penulis jika tersedia di Firestore
    content: data.description,
    contentText: data.description.replace(/<[^>]*>?/gm, ''), // Hapus tag HTML untuk teks biasa
  };
};

// Fungsi untuk mengambil semua postingan blog
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  if (!firebaseConfig.apiKey || firebaseConfig.apiKey.includes("PASTE_YOUR")) {
    console.warn("Konfigurasi Firebase belum diisi. Mengembalikan data kosong.");
    return [];
  }
  try {
    const blogsCollection = collection(db, "blog");
    const blogSnapshot = await getDocs(blogsCollection);
    const blogList = blogSnapshot.docs.map(doc => mapToBlogPost(doc));
    return blogList;
  } catch (error) {
    console.error("Error mengambil postingan blog:", error);
    return [];
  }
};
