import { db } from '@/config/firebase';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    Timestamp,
    updateDoc,
    where
} from 'firebase/firestore';

// Interface untuk data mahasiswa - disesuaikan dengan Firestore
export interface Mahasiswa {
  id?: string;
  NIM?: string;
  Nama?: string;
  Fakultas?: string;
  Prodi?: string;
  // Fields lama untuk backward compatibility
  nim?: string;
  nama?: string;
  jurusan?: string;
  semester?: number;
  email?: string;
  tanggalLahir?: string;
  alamat?: string;
  createdAt?: any;
  updatedAt?: any;
}

const COLLECTION_NAME = 'mahasiswa';

// Tambah mahasiswa baru
export const addMahasiswa = async (mahasiswa: Omit<Mahasiswa, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...mahasiswa,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    console.log('Mahasiswa berhasil ditambahkan dengan ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error menambahkan mahasiswa:', error);
    throw error;
  }
};

// Ambil semua mahasiswa
export const getAllMahasiswa = async (): Promise<Mahasiswa[]> => {
  try {
    console.log('Fetching mahasiswa from Firestore...');
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const mahasiswaList: Mahasiswa[] = [];
    
    querySnapshot.forEach((doc) => {
      console.log('Document data:', doc.id, doc.data());
      mahasiswaList.push({
        id: doc.id,
        ...doc.data(),
      } as Mahasiswa);
    });
    
    console.log('Berhasil mengambil', mahasiswaList.length, 'data mahasiswa');
    return mahasiswaList;
  } catch (error) {
    console.error('Error mengambil data mahasiswa:', error);
    console.error('Error details:', JSON.stringify(error));
    throw error;
  }
};

// Ambil mahasiswa berdasarkan ID
export const getMahasiswaById = async (id: string): Promise<Mahasiswa | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as Mahasiswa;
    } else {
      console.log('Mahasiswa tidak ditemukan');
      return null;
    }
  } catch (error) {
    console.error('Error mengambil mahasiswa:', error);
    throw error;
  }
};

// Ambil mahasiswa berdasarkan NIM
export const getMahasiswaByNim = async (nim: string): Promise<Mahasiswa[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), where('nim', '==', nim));
    const querySnapshot = await getDocs(q);
    const mahasiswaList: Mahasiswa[] = [];
    
    querySnapshot.forEach((doc) => {
      mahasiswaList.push({
        id: doc.id,
        ...doc.data(),
      } as Mahasiswa);
    });
    
    return mahasiswaList;
  } catch (error) {
    console.error('Error mengambil mahasiswa by NIM:', error);
    throw error;
  }
};

// Ambil mahasiswa berdasarkan jurusan
export const getMahasiswaByJurusan = async (jurusan: string): Promise<Mahasiswa[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), where('jurusan', '==', jurusan));
    const querySnapshot = await getDocs(q);
    const mahasiswaList: Mahasiswa[] = [];
    
    querySnapshot.forEach((doc) => {
      mahasiswaList.push({
        id: doc.id,
        ...doc.data(),
      } as Mahasiswa);
    });
    
    return mahasiswaList;
  } catch (error) {
    console.error('Error mengambil mahasiswa by jurusan:', error);
    throw error;
  }
};

// Update mahasiswa
export const updateMahasiswa = async (id: string, data: Partial<Mahasiswa>) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
    console.log('Mahasiswa berhasil diupdate');
  } catch (error) {
    console.error('Error update mahasiswa:', error);
    throw error;
  }
};

// Hapus mahasiswa
export const deleteMahasiswa = async (id: string) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    console.log('Mahasiswa berhasil dihapus');
  } catch (error) {
    console.error('Error menghapus mahasiswa:', error);
    throw error;
  }
};

// Function helper untuk menambahkan data dummy (optional - untuk testing)
export const addDummyMahasiswa = async () => {
  console.log('Starting to add dummy data...');
  const dummyData = [
    {
      NIM: '24060123130200',
      Nama: 'Ahmad Rizki',
      Fakultas: 'Fakultas Sains dan Matematika',
      Prodi: 'Informatika',
    },
    {
      NIM: '24060123130201',
      Nama: 'Siti Nurhaliza',
      Fakultas: 'Fakultas Teknik',
      Prodi: 'Teknik Elektro',
    },
    {
      NIM: '24060123130202',
      Nama: 'Budi Santoso',
      Fakultas: 'Fakultas Ekonomi',
      Prodi: 'Manajemen',
    },
  ];

  try {
    for (const mahasiswa of dummyData) {
      console.log('Adding mahasiswa:', mahasiswa);
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...mahasiswa,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      console.log('Added with ID:', docRef.id);
    }
    console.log('Data dummy berhasil ditambahkan');
  } catch (error) {
    console.error('Error menambahkan data dummy:', error);
    console.error('Error details:', JSON.stringify(error));
    throw error;
  }
};
