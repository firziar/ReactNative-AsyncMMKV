# 📋 Setup Checklist - Firebase Auth Project

Print atau bookmark checklist ini untuk memastikan setup yang benar!

---

## ✅ Pre-Setup (Sebelum Mulai)

- [ ] Node.js sudah terinstall
- [ ] npm atau yarn sudah terinstall  
- [ ] Expo CLI sudah terinstall (`npm install -g expo-cli`)
- [ ] Punya akun Google untuk Firebase
- [ ] Sudah buat project di Firebase Console
- [ ] Android emulator / iOS simulator sudah siap (atau gunakan Expo Go)

---

## ✅ Firebase Console Setup

### 1. Project Setup
- [ ] Login ke https://console.firebase.google.com/
- [ ] Project Firebase sudah dipilih/dibuat
- [ ] Klik ⚙️ (Settings) > Project Settings
- [ ] Scroll ke "Your apps"
- [ ] Tambah Web app (klik icon **</>**)
- [ ] Copy kredensial Firebase Config

### 2. Authentication Setup
- [ ] Buka menu **Authentication**
- [ ] Klik **Get Started** (jika baru pertama)
- [ ] Klik tab **Sign-in method**
- [ ] Cari **Email/Password**
- [ ] Toggle **Enable** → ON
- [ ] Klik **Save**

### 3. Firestore Setup
- [ ] Buka menu **Firestore Database**
- [ ] Klik **Create database**
- [ ] Pilih **Start in test mode** (untuk development)
- [ ] Pilih lokasi (asia-southeast1 untuk Indonesia)
- [ ] Klik **Enable**
- [ ] Tunggu sampai database ready

### 4. Firestore Rules (Optional tapi recommended)
- [ ] Di Firestore, klik tab **Rules**
- [ ] Paste rules berikut:
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
- [ ] Klik **Publish**

---

## ✅ Local Project Setup

### 1. Install Dependencies
```bash
cd /Users/firzi/Documents/ProjectFirebase/FirebaseAuth
npm install
```
- [ ] Dependencies terinstall tanpa error
- [ ] Tidak ada error tentang peer dependencies

### 2. Configure Firebase
- [ ] Buka file `config/firebase.ts`
- [ ] Ganti `YOUR_API_KEY` dengan API Key dari Firebase
- [ ] Ganti `YOUR_AUTH_DOMAIN` dengan Auth Domain dari Firebase
- [ ] Ganti `YOUR_PROJECT_ID` dengan Project ID dari Firebase
- [ ] Ganti `YOUR_STORAGE_BUCKET` dengan Storage Bucket dari Firebase
- [ ] Ganti `YOUR_MESSAGING_SENDER_ID` dengan Messaging Sender ID
- [ ] Ganti `YOUR_APP_ID` dengan App ID dari Firebase
- [ ] Save file

### 3. Verify File Structure
- [ ] Folder `app/` ada
- [ ] File `app/login.tsx` ada
- [ ] File `app/register.tsx` ada
- [ ] File `app/(tabs)/index.tsx` ada
- [ ] File `config/firebase.ts` ada (sudah diedit)
- [ ] File `contexts/AuthContext.tsx` ada
- [ ] File `services/mahasiswaService.ts` ada
- [ ] File `utils/storage.ts` ada

---

## ✅ Run & Test

### 1. Start Development Server
```bash
npm start
```
- [ ] Server running tanpa error
- [ ] QR code muncul (untuk Expo Go)
- [ ] Atau pilih platform: `a` (Android), `i` (iOS), `w` (Web)

### 2. Test Registration
- [ ] App terbuka (tampil login screen)
- [ ] Klik "Daftar"
- [ ] Isi email: `test@email.com`
- [ ] Isi password: `password123`
- [ ] Isi konfirmasi password: `password123`
- [ ] Klik "Daftar"
- [ ] Muncul alert "Registrasi berhasil"
- [ ] Navigate ke login screen

### 3. Verify User in Firebase
- [ ] Buka Firebase Console → Authentication → Users
- [ ] User baru (test@email.com) muncul dalam list
- [ ] Status: Enabled

### 4. Test Login
- [ ] Di login screen, isi email: `test@email.com`
- [ ] Isi password: `password123`
- [ ] Klik "Login"
- [ ] Berhasil masuk ke home screen
- [ ] Muncul "Selamat Datang!" dan email user

### 5. Test Add Mahasiswa Data
- [ ] Di home screen, klik "+ Tambah Data Dummy"
- [ ] Konfirmasi "Ya"
- [ ] Muncul alert "Data dummy berhasil ditambahkan"
- [ ] List mahasiswa muncul (3 data)
- [ ] Setiap card menampilkan:
  - [ ] NIM
  - [ ] Nama
  - [ ] Jurusan
  - [ ] Semester
  - [ ] Email
  - [ ] Tanggal Lahir
  - [ ] Alamat

### 6. Verify Data in Firestore
- [ ] Buka Firebase Console → Firestore Database
- [ ] Collection `mahasiswa` ada
- [ ] Ada 3 documents
- [ ] Setiap document punya fields yang benar

### 7. Test Pull to Refresh
- [ ] Di home screen, swipe down
- [ ] Loading indicator muncul
- [ ] Data ter-refresh

### 8. Test Logout
- [ ] Klik tombol "Logout" di kanan atas
- [ ] Konfirmasi "Ya"
- [ ] Kembali ke login screen
- [ ] AsyncStorage cleared (user data terhapus)

### 9. Test Auto-Login
- [ ] Login lagi dengan test@email.com
- [ ] Masuk ke home screen
- [ ] Force close aplikasi (kill app)
- [ ] Buka aplikasi lagi
- [ ] Otomatis masuk ke home screen (tidak diminta login)
- [ ] ✅ Auto-login berhasil!

---

## ✅ Final Verification

### Firebase Console Check:
- [ ] Authentication → Users: User test@email.com ada
- [ ] Firestore → mahasiswa: Collection ada dengan data
- [ ] No errors in Firebase Console

### App Check:
- [ ] Login screen tampil dengan baik
- [ ] Register screen tampil dengan baik
- [ ] Home screen tampil dengan baik
- [ ] Data mahasiswa tampil dalam cards
- [ ] Logout berfungsi
- [ ] Auto-login berfungsi
- [ ] Pull to refresh berfungsi
- [ ] No console errors

### Code Quality:
- [ ] TypeScript tidak ada error (run `npx tsc --noEmit`)
- [ ] ESLint tidak ada error (run `npm run lint`)

---

## 🐛 Common Issues Checklist

### Issue: Firebase not initialized
- [ ] Cek `config/firebase.ts` sudah diedit dengan kredensial yang benar
- [ ] Semua fields terisi (tidak ada "YOUR_...")
- [ ] No typos in credentials

### Issue: auth/invalid-credential
- [ ] Email format benar (ada @)
- [ ] Password minimal 6 karakter
- [ ] User sudah register
- [ ] Email/Password Authentication enabled di Firebase Console

### Issue: Data tidak muncul
- [ ] Firestore Database sudah dibuat
- [ ] Rules sudah diset
- [ ] Internet connection OK
- [ ] Data dummy sudah ditambahkan
- [ ] Cek Firebase Console → Firestore untuk verifikasi data ada

### Issue: App crashes on startup
- [ ] Dependencies sudah terinstall semua (`npm install`)
- [ ] Cache cleared (`expo start -c`)
- [ ] Node modules fresh (`rm -rf node_modules && npm install`)

---

## 📱 Device Testing Checklist

### Test on Android:
- [ ] App runs on Android emulator
- [ ] Login works
- [ ] Register works
- [ ] Data fetch works
- [ ] Logout works
- [ ] Auto-login works

### Test on iOS:
- [ ] App runs on iOS simulator
- [ ] Login works
- [ ] Register works
- [ ] Data fetch works
- [ ] Logout works
- [ ] Auto-login works

### Test on Web (optional):
- [ ] App runs on browser
- [ ] Login works
- [ ] Register works
- [ ] Data fetch works
- [ ] Logout works

---

## 🎓 Documentation Reading Checklist

- [ ] Baca QUICKSTART.md untuk quick overview
- [ ] Baca FIREBASE_SETUP.md untuk setup detail
- [ ] Baca README.md untuk API reference
- [ ] Baca PROJECT_STRUCTURE.md untuk understand arsitektur
- [ ] Baca SUMMARY.md untuk feature overview

---

## ✨ Done!

Jika semua checklist di atas sudah ✅, maka:

🎉 **PROJECT SETUP COMPLETE!**

Anda sudah berhasil setup:
- ✅ Firebase Authentication
- ✅ AsyncStorage untuk persistence
- ✅ Firestore Database
- ✅ CRUD Mahasiswa
- ✅ Auto-login
- ✅ Protected routes

**Ready untuk development lebih lanjut!** 🚀

---

**Print checklist ini dan centang satu per satu untuk memastikan tidak ada yang terlewat!**

Last Updated: December 8, 2025
