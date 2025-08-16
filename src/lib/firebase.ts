import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";
import type { BlogPost, AuthorProfile } from "./types";

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

// Fungsi untuk mengambil data profil penulis
export const getAuthorProfile = async (): Promise<AuthorProfile> => {
  const defaultSocials = {
    twitter: '#',
    linkedin: '#',
    github: '#',
    facebook: '#',
    instagram: '#',
    youtube: '#',
    tiktok: '#',
    email: '#',
    phone: '#',
  };
  
  const defaultProfile: AuthorProfile = {
    name: 'PenaMaya',
    bio: "Seorang penulis yang bersemangat, ahli strategi digital, dan pembelajar seumur hidup, Jane telah berbagi wawasannya tentang kreativitas, produktivitas, dan personal branding selama lebih dari satu dekade. Saat tidak sedang menulis, dia menjelajahi jalur pendakian baru atau meringkuk dengan buku yang bagus.",
    tagline: 'Wawasan, cerita, dan ide dari penulis kami.',
    picture: 'https://placehold.co/200x200.png',
    banner: 'https://placehold.co/600x400.png',
    metadesc: 'A personal blog platform for writers and creators.',
    keyword: 'blog, writing, creativity, personal development',
    socialMediaLinks: defaultSocials,
  };

  if (!firebaseConfig.apiKey || firebaseConfig.apiKey.includes("PASTE_YOUR")) {
    console.warn("Konfigurasi Firebase belum diisi. Mengembalikan data profil default.");
    return defaultProfile;
  }
  try {
    const profileDocRef = doc(db, "settings", "profile");
    const contactDocRef = doc(db, "settings", "contact");

    const [profileDoc, contactDoc] = await Promise.all([
        getDoc(profileDocRef),
        getDoc(contactDocRef)
    ]);
    
    const profileData = profileDoc.exists() ? profileDoc.data() : {};
    const contactData = contactDoc.exists() ? contactDoc.data() : {};

    if (!profileDoc.exists()) {
        console.warn("Dokumen profil tidak ditemukan di Firestore. Mengembalikan data default.");
    }
     if (!contactDoc.exists()) {
        console.warn("Dokumen kontak tidak ditemukan di Firestore. Mengembalikan data default.");
    }

    return {
      name: profileData.name || defaultProfile.name,
      bio: profileData.description || defaultProfile.bio,
      tagline: profileData.tagline || defaultProfile.tagline,
      picture: profileData.logo || defaultProfile.picture,
      banner: profileData.banner || defaultProfile.banner,
      metadesc: profileData.metadesc || defaultProfile.metadesc,
      keyword: profileData.keyword || defaultProfile.keyword,
      socialMediaLinks: {
          ...defaultSocials,
          ...contactData
      },
    };

  } catch (error) {
    console.error("Error mengambil profil penulis:", error);
    return {
      ...defaultProfile,
      bio: "Terjadi kesalahan saat mengambil bio.",
      tagline: "Terjadi kesalahan saat mengambil tagline.",
    };
  }
};
