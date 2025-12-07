# Panduan Setup Firebase - Langkah Lengkap

## 1. Mendapatkan Kredensial Firebase

### A. Login ke Firebase Console
1. Buka https://console.firebase.google.com/
2. Login dengan akun Google Anda
3. Pilih project yang sudah Anda buat

### B. Mendapatkan Config Firebase
1. Di halaman Project Overview, klik ⚙️ (gear icon) di samping "Project Overview"
2. Pilih **Project settings**
3. Scroll ke bawah sampai bagian **"Your apps"**
4. Jika belum ada Web App:
   - Klik icon **</>** (Web)
   - Beri nama app (contoh: "ReactNativeApp")
   - Jangan centang "Firebase Hosting"
   - Klik **Register app**
5. Copy konfigurasi yang muncul (firebaseConfig)

### C. Paste Kredensial ke Project
1. Buka file `config/firebase.ts`
2. Replace bagian ini dengan kredensial Anda:

```typescript
const firebaseConfig = {
  apiKey: "AIzaSy...",                    // Ganti dengan API Key Anda
  authDomain: "your-app.firebaseapp.com", // Ganti dengan Auth Domain Anda
  projectId: "your-project-id",           // Ganti dengan Project ID Anda
  storageBucket: "your-app.appspot.com",  // Ganti dengan Storage Bucket Anda
  messagingSenderId: "123456789",         // Ganti dengan Messaging Sender ID Anda
  appId: "1:123:web:abc123"              // Ganti dengan App ID Anda
};
```

## 2. Enable Firebase Authentication

### A. Setup Email/Password Authentication
1. Di Firebase Console, klik **Authentication** di menu kiri
2. Jika baru pertama kali, klik **Get started**
3. Klik tab **Sign-in method**
4. Cari **Email/Password** di daftar providers
5. Klik pada **Email/Password**
6. Toggle **Enable** menjadi ON
7. Klik **Save**

### B. (Optional) Tambah User Manual
1. Klik tab **Users**
2. Klik **Add user**
3. Masukkan email dan password
4. Klik **Add user**

## 3. Setup Firestore Database

### A. Buat Database
1. Di Firebase Console, klik **Firestore Database** di menu kiri
2. Klik **Create database**
3. Pilih mode:
   - **Test mode** (untuk development) - recommended untuk belajar
   - **Production mode** (untuk production)
4. Pilih lokasi server (pilih yang terdekat, contoh: asia-southeast1)
5. Klik **Enable**

### B. Buat Collection Mahasiswa (Manual - Optional)
1. Klik **Start collection**
2. Collection ID: `mahasiswa`
3. Klik **Next**
4. Tambahkan document pertama (atau skip, nanti bisa dari app):
   - Document ID: Auto-ID
   - Fields:
     ```
     nim: "2021001" (string)
     nama: "Ahmad Rizki" (string)
     jurusan: "Teknik Informatika" (string)
     semester: 6 (number)
     email: "ahmad@email.com" (string)
     tanggalLahir: "2003-05-15" (string)
     alamat: "Jakarta" (string)
     ```
5. Klik **Save**

### C. Setup Firestore Rules

#### Untuk Development (Test Mode):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

**Penjelasan**: Hanya user yang sudah login (authenticated) yang bisa read/write.

#### Untuk Production (Lebih Ketat):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Collection mahasiswa
    match /mahasiswa/{mahasiswaId} {
      // Semua user yang login bisa read
      allow read: if request.auth != null;
      
      // Hanya user yang login bisa create/update/delete
      allow create, update, delete: if request.auth != null;
    }
  }
}
```

#### Cara Update Rules:
1. Di Firestore Database, klik tab **Rules**
2. Paste rules di atas
3. Klik **Publish**

## 4. Struktur Data Mahasiswa di Firestore

### Collection: `mahasiswa`

Setiap document memiliki struktur:

```json
{
  "nim": "2021001",
  "nama": "Ahmad Rizki",
  "jurusan": "Teknik Informatika",
  "semester": 6,
  "email": "ahmad.rizki@email.com",
  "tanggalLahir": "2003-05-15",
  "alamat": "Jl. Merdeka No. 123, Jakarta",
  "createdAt": Timestamp,
  "updatedAt": Timestamp
}
```

### Field Types:
- `nim`: string
- `nama`: string
- `jurusan`: string
- `semester`: number
- `email`: string
- `tanggalLahir`: string (format: YYYY-MM-DD)
- `alamat`: string
- `createdAt`: timestamp (auto-generated)
- `updatedAt`: timestamp (auto-generated)

## 5. Testing

### A. Test Authentication
1. Jalankan aplikasi: `npm start`
2. Klik "Daftar" untuk register user baru
3. Isi email dan password
4. Cek di Firebase Console > Authentication > Users
5. User baru harus muncul di daftar

### B. Test Firestore
1. Login ke aplikasi
2. Di home screen, klik "+ Tambah Data Dummy"
3. Cek di Firebase Console > Firestore Database
4. Collection `mahasiswa` harus ada dengan 3 documents

## 6. Monitoring

### Melihat Users
Firebase Console > Authentication > Users

### Melihat Data Mahasiswa
Firebase Console > Firestore Database > mahasiswa

### Melihat Logs
Firebase Console > Logs

## 7. Security Best Practices

### ⚠️ Jangan commit kredensial!

Buat file `.env` atau `.env.local`:
```
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

Update `.gitignore`:
```
.env
.env.local
```

Update `config/firebase.ts`:
```typescript
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};
```

## 8. Troubleshooting

### Error: "Failed to get document because the client is offline"
- Periksa koneksi internet
- Pastikan Firestore sudah di-enable di Firebase Console

### Error: "Missing or insufficient permissions"
- Cek Firestore Rules
- Pastikan user sudah login (authenticated)
- Pastikan rules allow read/write untuk authenticated users

### Error: "auth/network-request-failed"
- Periksa koneksi internet
- Coba restart aplikasi

### Error: "Firebase: Error (auth/invalid-api-key)"
- API Key salah atau tidak valid
- Cek kembali kredensial di `config/firebase.ts`
- Pastikan tidak ada spasi atau karakter aneh

## 9. Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Auth Documentation](https://firebase.google.com/docs/auth)
- [MMKV Documentation](https://github.com/mrousavy/react-native-mmkv)

## Checklist Setup

- [ ] Login ke Firebase Console
- [ ] Dapatkan kredensial Firebase Config
- [ ] Paste kredensial ke `config/firebase.ts`
- [ ] Enable Email/Password Authentication
- [ ] Buat Firestore Database
- [ ] Setup Firestore Rules
- [ ] Test register user baru
- [ ] Test login
- [ ] Test tambah data mahasiswa
- [ ] Test fetch data mahasiswa
- [ ] Verifikasi data di Firebase Console

Selamat! Setup Firebase sudah selesai! 🎉
