# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
# Firebase Authentication dengan AsyncStorage & Firestore

Aplikasi React Native dengan Expo Router yang mengimplementasikan:
- Firebase Authentication dengan penyimpanan AsyncStorage
- Firebase Firestore untuk database mahasiswa
- Auto login menggunakan AsyncStorage

## Fitur

✅ **Authentication**
- Login dengan email dan password
- Register akun baru
- Logout
- Auto-login menggunakan AsyncStorage
- Protected routes

✅ **Firestore Database**
- CRUD data mahasiswa
- Real-time data fetching
- Tambah data dummy untuk testing

✅ **AsyncStorage**
- Simpan token authentication
- Simpan informasi user
- Persistent login state

> **Note**: Proyek ini menggunakan AsyncStorage untuk kompatibilitas dengan Expo. Untuk performa lebih baik di production native app, Anda bisa upgrade ke MMKV (lihat instruksi di bawah).

## Setup Firebase

### 1. Konfigurasi Firebase
Edit file `config/firebase.ts` dan ganti dengan kredensial Firebase Anda:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

Cara mendapatkan kredensial:
1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Pilih project Anda
3. Klik ⚙️ > Project Settings
4. Scroll ke bawah ke bagian "Your apps"
5. Pilih platform Web (</>) jika belum ada
6. Copy konfigurasi Firebase

### 2. Enable Authentication
1. Di Firebase Console, buka **Authentication**
2. Klik tab **Sign-in method**
3. Enable **Email/Password**

### 3. Setup Firestore Database
1. Di Firebase Console, buka **Firestore Database**
2. Klik **Create database**
3. Pilih **Start in test mode** (untuk development)
4. Pilih lokasi database

### 4. Firestore Rules (Development)
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Instalasi

```bash
# Install dependencies
npm install

# Start aplikasi
npm start
```

## Struktur Folder

```
├── app/                          # Screens
│   ├── _layout.tsx              # Root layout dengan AuthProvider
│   ├── login.tsx                # Login screen
│   ├── register.tsx             # Register screen
│   └── (tabs)/
│       └── index.tsx            # Home screen (list mahasiswa)
├── config/
│   └── firebase.ts              # Firebase configuration
├── contexts/
│   └── AuthContext.tsx          # Authentication context & provider
├── services/
│   └── mahasiswaService.ts      # Firestore CRUD operations
└── utils/
    └── storage.ts               # MMKV storage utilities
```

## Cara Menggunakan

### 1. Register User Baru
- Buka aplikasi
- Klik "Daftar"
- Isi email dan password (min 6 karakter)
- Klik "Daftar"

### 2. Login
- Masukkan email dan password yang sudah didaftarkan
- Klik "Login"
- Akan otomatis masuk ke home screen

### 3. Tambah Data Mahasiswa
- Di home screen, klik tombol "+ Tambah Data Dummy"
- Akan menambahkan 3 data mahasiswa contoh

### 4. Lihat Data Mahasiswa
- Data mahasiswa akan ditampilkan dalam bentuk card
- Pull to refresh untuk reload data
- Menampilkan: NIM, Nama, Jurusan, Semester, Email, Tanggal Lahir, Alamat

### 5. Logout
- Klik tombol "Logout" di kanan atas
- Konfirmasi logout
- Akan kembali ke halaman login
- Data login akan dihapus dari MMKV

## API Mahasiswa Service

### Interface Mahasiswa
```typescript
interface Mahasiswa {
  id?: string;
  nim: string;
  nama: string;
  jurusan: string;
  semester: number;
  email: string;
  tanggalLahir: string;
  alamat: string;
  createdAt?: any;
  updatedAt?: any;
}
```

### Available Functions

```typescript
// Tambah mahasiswa baru
addMahasiswa(mahasiswa: Omit<Mahasiswa, 'id' | 'createdAt' | 'updatedAt'>): Promise<string>

// Ambil semua mahasiswa
getAllMahasiswa(): Promise<Mahasiswa[]>

// Ambil mahasiswa by ID
getMahasiswaById(id: string): Promise<Mahasiswa | null>

// Ambil mahasiswa by NIM
getMahasiswaByNim(nim: string): Promise<Mahasiswa[]>

// Ambil mahasiswa by Jurusan
getMahasiswaByJurusan(jurusan: string): Promise<Mahasiswa[]>

// Update mahasiswa
updateMahasiswa(id: string, data: Partial<Mahasiswa>): Promise<void>

// Hapus mahasiswa
deleteMahasiswa(id: string): Promise<void>

// Tambah data dummy (untuk testing)
addDummyMahasiswa(): Promise<void>
```

## AsyncStorage Utilities

```typescript
// Save & Get User Token (async)
await saveUserToken(token: string)
await getUserToken(): Promise<string | null>

// Save & Get User Email (async)
await saveUserEmail(email: string)
await getUserEmail(): Promise<string | null>

// Save & Get User ID (async)
await saveUserId(userId: string)
await getUserId(): Promise<string | null>

// Login State (async)
await setLoggedIn(isLoggedIn: boolean)
await isLoggedIn(): Promise<boolean>

// User Data (async)
await saveUserData(userData: any)
await getUserData(): Promise<any | null>

// Clear Storage (async)
await clearAuthStorage()  // Clear auth data only
await clearAllStorage()   // Clear all data
```

## Upgrade ke MMKV (Optional - Untuk Native Apps)

Jika Anda sudah eject dari Expo atau menggunakan bare React Native, Anda bisa upgrade ke MMKV untuk performa lebih baik:

### 1. Install MMKV
```bash
npm install react-native-mmkv
cd ios && pod install && cd ..
```

### 2. Update `utils/storage.ts`
Ganti import AsyncStorage dengan MMKV:
```typescript
import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

// Ubah semua function menjadi synchronous
export const saveUserToken = (token: string) => {
  storage.set('user_token', token);
};

export const getUserToken = (): string | undefined => {
  return storage.getString('user_token');
};
// dst...
```

### 3. Update AuthContext
Hapus `await` dari semua pemanggilan storage function karena MMKV synchronous.

## Tech Stack

- **React Native**: 0.81.5
- **Expo**: ~54.0.23
- **Expo Router**: ~6.0.14
- **Firebase**: Latest
- **AsyncStorage**: @react-native-async-storage/async-storage
- **TypeScript**: ~5.9.2

## Notes

- AsyncStorage digunakan untuk menyimpan token dan informasi login (kompatibel dengan Expo)
- Authentication state di-manage oleh AuthContext dengan React Context API
- Navigation menggunakan Expo Router dengan file-based routing
- Protected routes otomatis redirect ke login jika user belum login
- Auto-login menggunakan Firebase onAuthStateChanged + AsyncStorage

## Troubleshooting

### Error: Firebase not initialized
- Pastikan sudah mengisi konfigurasi Firebase di `config/firebase.ts`

### Error: auth/email-already-in-use
- Email sudah terdaftar, gunakan email lain atau login

### Error: auth/invalid-credential
- Email atau password salah

### Data mahasiswa tidak muncul
- Pastikan Firestore sudah disetup dengan benar
- Cek Firestore Rules apakah sudah allow read/write
- Tambahkan data dummy dengan klik tombol "+ Tambah Data Dummy"

## License

MIT
