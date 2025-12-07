# Quick Start Guide 🚀

## Langkah Cepat Setup (5 Menit)

### 1. Install Dependencies ✅
```bash
npm install
```

### 2. Setup Firebase Config ⚙️

**Edit file: `config/firebase.ts`**

Ganti bagian ini dengan kredensial Firebase Anda:
```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",              // <- Ganti ini
  authDomain: "YOUR_AUTH_DOMAIN",      // <- Ganti ini
  projectId: "YOUR_PROJECT_ID",        // <- Ganti ini
  storageBucket: "YOUR_STORAGE_BUCKET", // <- Ganti ini
  messagingSenderId: "YOUR_SENDER_ID",  // <- Ganti ini
  appId: "YOUR_APP_ID"                 // <- Ganti ini
};
```

**Cara mendapat kredensial:**
1. Buka https://console.firebase.google.com/
2. Pilih project Anda
3. Klik ⚙️ > Project Settings
4. Scroll ke "Your apps" > Pilih Web app
5. Copy kredensial

### 3. Enable Services di Firebase Console 🔐

**A. Enable Authentication:**
1. Firebase Console > Authentication
2. Sign-in method > Email/Password > Enable

**B. Enable Firestore:**
1. Firebase Console > Firestore Database
2. Create database > Test mode
3. Enable

### 4. Jalankan Aplikasi 🎯
```bash
npm start
```

Pilih platform:
- Press `a` untuk Android
- Press `i` untuk iOS
- Press `w` untuk Web

### 5. Test Aplikasi ✨

**Register User Baru:**
1. Klik "Daftar"
2. Isi email: `test@email.com`
3. Isi password: `password123`
4. Klik "Daftar"

**Login:**
1. Login dengan email dan password yang baru dibuat
2. Akan masuk ke home screen

**Tambah Data Mahasiswa:**
1. Di home screen, klik "+ Tambah Data Dummy"
2. Akan muncul 3 data mahasiswa
3. Pull to refresh untuk reload

**Logout:**
1. Klik "Logout" di kanan atas
2. Data login akan terhapus dari MMKV
3. Kembali ke halaman login

---

## Struktur Project 📁

```
├── app/
│   ├── _layout.tsx          # Root layout + AuthProvider
│   ├── login.tsx            # Login screen
│   ├── register.tsx         # Register screen
│   └── (tabs)/
│       └── index.tsx        # Home (list mahasiswa)
│
├── config/
│   └── firebase.ts          # ⚠️ Edit file ini!
│
├── contexts/
│   └── AuthContext.tsx      # Auth state management
│
├── services/
│   └── mahasiswaService.ts  # Firestore CRUD
│
└── utils/
    └── storage.ts           # MMKV utilities
```

---

## Fitur Yang Sudah Diimplementasikan ✅

### 1. Firebase Authentication
- ✅ Register user baru
- ✅ Login dengan email/password
- ✅ Logout
- ✅ Protected routes
- ✅ Auto-login menggunakan MMKV

### 2. MMKV Storage
- ✅ Simpan token authentication
- ✅ Simpan user data (email, uid)
- ✅ Persistent login state
- ✅ Clear storage saat logout

### 3. Firebase Firestore
- ✅ CRUD data mahasiswa
- ✅ Real-time fetch data
- ✅ Add dummy data untuk testing
- ✅ Display data dalam card view

---

## Data Mahasiswa Schema 📋

```typescript
interface Mahasiswa {
  nim: string;           // "2021001"
  nama: string;          // "Ahmad Rizki"
  jurusan: string;       // "Teknik Informatika"
  semester: number;      // 6
  email: string;         // "ahmad@email.com"
  tanggalLahir: string;  // "2003-05-15"
  alamat: string;        // "Jakarta"
}
```

---

## Troubleshooting 🔧

### ❌ Firebase Error
```
Error: Firebase not initialized
```
**Solusi:** Pastikan sudah edit `config/firebase.ts` dengan kredensial yang benar

### ❌ Auth Error
```
Error: auth/invalid-credential
```
**Solusi:** Email atau password salah, coba register lagi

### ❌ Firestore Error
```
Error: Missing or insufficient permissions
```
**Solusi:** 
1. Pastikan Firestore Database sudah di-enable
2. Cek Firestore Rules (harus allow read/write untuk authenticated users)

### ❌ Data Tidak Muncul
**Solusi:**
1. Cek internet connection
2. Pastikan sudah login
3. Tambah data dummy dengan klik tombol "+ Tambah Data Dummy"
4. Pull to refresh

---

## Next Steps 🎓

Setelah berhasil setup, Anda bisa:

1. **Tambah Fitur CRUD Manual**
   - Form tambah mahasiswa
   - Edit data mahasiswa
   - Hapus mahasiswa

2. **Improve UI/UX**
   - Loading states
   - Error handling
   - Toast notifications

3. **Tambah Fitur Lain**
   - Search mahasiswa
   - Filter by jurusan
   - Sort data
   - Pagination

4. **Security**
   - Pindahkan kredensial ke `.env`
   - Update Firestore Rules untuk production

---

## Resources 📚

- **README.md** - Dokumentasi lengkap
- **FIREBASE_SETUP.md** - Setup Firebase detail
- **Firebase Console** - https://console.firebase.google.com/

---

## Support 💬

Jika ada error atau pertanyaan:
1. Cek FIREBASE_SETUP.md untuk panduan detail
2. Cek Firebase Console untuk monitoring
3. Cek console.log() untuk debug

**Happy Coding! 🎉**
