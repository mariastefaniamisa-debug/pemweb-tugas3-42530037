# Tugas 3 Pemrograman Web - CRUD Data Buku Perpustakaan

Implementasi web CRUD relasional dengan Express.js, MySQL Connection Pool, dan Prepared Statements.

## Identitas

| | |
|---|---|
| Nama | Maria Stefania Misa |
| NIM | 42530037 |
| Mata Kuliah | Pemrograman Web (4 SKS) |
| Tugas | Tugas 3 (T-03) - Sub-CPMK 2.3 |
| Tema | Data Buku Perpustakaan |

## Video Penjelasan (YouTube, Public)

https://youtu.be/sNl9K7xoJoE?si=2lYZFvoRZ3mNeneH

## Fitur

- **Create**: menambah buku baru lewat formulir.
- **Read**: menampilkan daftar buku dalam tabel, dengan pencarian (judul/penulis) dan paginasi (5 data per halaman).
- **Update**: mengubah data buku berdasarkan ID.
- **Delete**: menghapus data buku berdasarkan ID (dengan konfirmasi).

## Teknologi

- Node.js dan Express
- EJS (template view)
- MySQL dengan driver `mysql2` (versi Promise)
- `dotenv` untuk konfigurasi lingkungan

## Poin Teknis

1. **MySQL Connection Pool berbasis Promise**: `mysql2/promise` dengan `createPool` (lihat `db.js`).
2. **Prepared Statements**: seluruh query dinamis memakai tanda `?` melalui `pool.execute()`, tanpa penggabungan string, sehingga terlindungi dari SQL Injection.
3. **Isolasi kredensial**: konfigurasi database dibaca dari `.env` (tidak ikut ke GitHub). Contoh tersedia di `.env.example`.
4. **Post-Redirect-Get (PRG)**: setiap POST (tambah, edit, hapus) diakhiri `res.redirect('/')` agar refresh tidak menggandakan data.
5. **Skema database**: `database.sql` berisi DDL dan 12 data awal.

## Struktur Proyek

```
.
├── views/
│   ├── index.ejs      # halaman daftar + pencarian + paginasi
│   └── form.ejs       # formulir tambah / edit
├── app.js             # server Express dan seluruh rute CRUD
├── db.js              # MySQL Connection Pool
├── database.sql       # skema dan data awal
├── .env.example       # contoh konfigurasi
├── .gitignore
├── package.json
└── README.md
```

## Cara Menjalankan

1. Pastikan Node.js dan MySQL sudah terpasang dan MySQL sedang berjalan.
2. Pasang dependensi:
   ```
   npm install
   ```
3. Impor database:
   ```
   mysql -u root < database.sql
   ```
   (tambahkan `-p` bila root memakai password)
4. Salin berkas konfigurasi lalu sesuaikan isinya:
   ```
   cp .env.example .env
   ```
   Isi `.env`:
   ```
   PORT=3000
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=db_perpustakaan
   ```
5. Jalankan aplikasi:
   ```
   npm start
   ```
   atau `node app.js`
6. Buka http://localhost:3000

## Rute

| Metode | Rute | Fungsi |
|---|---|---|
| GET | `/` | Daftar buku (parameter `q` dan `page`) |
| GET | `/buku/tambah` | Formulir tambah |
| POST | `/buku/tambah` | Simpan buku baru, lalu redirect |
| GET | `/buku/:id/edit` | Formulir edit |
| POST | `/buku/:id/edit` | Simpan perubahan, lalu redirect |
| POST | `/buku/:id/hapus` | Hapus buku, lalu redirect |
