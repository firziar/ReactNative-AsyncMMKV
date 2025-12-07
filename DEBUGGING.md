# 🔧 DEBUGGING GUIDE

## Perubahan yang Sudah Dilakukan:

### 1. ✅ Update Interface Mahasiswa
- Sekarang support field: `NIM`, `Nama`, `Fakultas`, `Prodi` (sesuai database Firestore Anda)
- Tetap backward compatible dengan field lama (`nim`, `nama`, `jurusan`, dll)

### 2. ✅ Update Tampilan Card
- Menampilkan: NIM, Nama, Fakultas, Prodi
- Field optional (semester, email, dll) hanya muncul jika ada

### 3. ✅ Fix Logout Function
- Menambahkan `await` untuk `clearAuthStorage()`
- Menambahkan logging lengkap untuk debugging

### 4. ✅ Fix Add Dummy Data
- Data dummy disesuaikan dengan struktur database Anda
- Menambahkan logging untuk tracking

### 5. ✅ Menambahkan Console Logging
- Semua fungsi penting sekarang punya logging
- Mudah untuk debug masalah

---

## 🧪 Cara Testing:

### 1. Restart Development Server
```bash
# Stop server yang sedang jalan (Ctrl+C)
# Kemudian jalankan lagi:
npm start
```

### 2. Buka Console/Terminal
Perhatikan output di terminal untuk melihat log.

### 3. Test Fetch Data yang Sudah Ada
1. Login ke aplikasi
2. Di home screen, perhatikan console
3. Seharusnya muncul log:
   ```
   Fetching mahasiswa from Firestore...
   Document data: <id> { NIM: "...", Nama: "...", ... }
   Berhasil mengambil X data mahasiswa
   ```
4. Data Dapin dan lainnya seharusnya muncul di list

### 4. Test Tambah Dummy Data
1. Klik tombol "+ Tambah Data Dummy"
2. Perhatikan console, seharusnya muncul:
   ```
   handleAddDummy clicked
   ```
3. Klik "Ya" di dialog
4. Perhatikan console:
   ```
   Ya clicked, calling addDummyMahasiswa...
   Starting to add dummy data...
   Adding mahasiswa: { NIM: "...", Nama: "...", ... }
   Added with ID: ...
   Data dummy berhasil ditambahkan
   ```
5. Seharusnya muncul alert "Sukses"
6. List ter-refresh dan muncul 3 data baru

### 5. Test Logout
1. Klik tombol "Logout" di kanan atas
2. Perhatikan console:
   ```
   handleLogout clicked
   ```
3. Klik "Ya" di dialog
4. Perhatikan console:
   ```
   Ya logout clicked, calling logout...
   Starting logout process...
   Calling signOut...
   SignOut completed, clearing storage...
   clearAuthStorage called
   AsyncStorage cleared successfully
   Storage cleared, logout completed
   Logout completed, navigating to login...
   User signed out
   ```
5. Seharusnya redirect ke halaman login

---

## 🐛 Jika Masih Bermasalah:

### Masalah: Data tidak muncul
**Cek Console untuk:**
- Error "Permission denied" → Firestore Rules perlu diupdate
- Error "Collection not found" → Nama collection salah
- Error lainnya → Baca error message lengkap

**Solusi:**
1. Cek Firestore Rules di Firebase Console:
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

2. Pastikan user sudah login (authenticated)

### Masalah: Tombol tidak respond
**Cek Console:**
- Jika tidak ada log "handleAddDummy clicked" atau "handleLogout clicked"
  → Masalah di TouchableOpacity atau event handler

**Solusi:**
1. Restart app: `npm start` kemudian reload (R di terminal)
2. Clear cache: `npm start -- --clear`

### Masalah: Alert tidak muncul
**Kemungkinan:**
- React Native modal/alert library issue
- Platform specific issue (iOS vs Android)

**Solusi:**
1. Test di platform berbeda (iOS/Android/Web)
2. Lihat console untuk error message

### Masalah: Logout tidak redirect
**Cek Console untuk:**
- "Logout completed, navigating to login..." → Berhasil logout
- Error sebelum baris itu → Ada masalah di logout process

**Solusi:**
1. Pastikan `router.replace('/login')` dipanggil
2. Cek navigation di `_layout.tsx`

---

## 📱 Monitoring di Console

Ketika app berjalan, Anda akan melihat log seperti ini:

### Saat Login:
```
User signed in: user@email.com
```

### Saat Fetch Data:
```
Fetching mahasiswa from Firestore...
Document data: abc123 { NIM: "24060123130200", Nama: "Dapin", ... }
Berhasil mengambil 1 data mahasiswa
```

### Saat Add Dummy:
```
handleAddDummy clicked
Ya clicked, calling addDummyMahasiswa...
Starting to add dummy data...
Adding mahasiswa: { NIM: "24060123130200", ... }
Added with ID: xyz789
Data dummy berhasil ditambahkan
```

### Saat Logout:
```
handleLogout clicked
Ya logout clicked, calling logout...
Starting logout process...
Calling signOut...
SignOut completed, clearing storage...
clearAuthStorage called
AsyncStorage cleared successfully
Storage cleared, logout completed
Logout completed, navigating to login...
User signed out
```

---

## 🎯 Checklist Debug

- [ ] Server development running (`npm start`)
- [ ] Console terbuka dan terlihat
- [ ] Login berhasil
- [ ] Data yang sudah ada di Firestore muncul di list
- [ ] Klik "Tambah Data Dummy" → Alert muncul
- [ ] Klik "Ya" → Console log muncul
- [ ] Data baru muncul di list
- [ ] Klik "Logout" → Alert muncul
- [ ] Klik "Ya" → Console log muncul
- [ ] Redirect ke login screen

---

## 💡 Tips:

1. **Selalu perhatikan console** - Semua proses sekarang punya logging
2. **Screenshot error** - Jika ada error, screenshot console output
3. **Test step by step** - Jangan skip langkah
4. **Cek Firebase Console** - Verifikasi data benar-benar masuk/keluar dari Firestore

---

## 📞 Next Steps:

Jika setelah mengikuti panduan ini masih ada masalah:
1. Copy semua output console
2. Screenshot error yang muncul
3. Jelaskan step mana yang gagal

Happy Debugging! 🚀
