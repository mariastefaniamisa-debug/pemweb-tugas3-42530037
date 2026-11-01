require('dotenv').config();
const express = require('express');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;
const PER_PAGE = 5;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// ===== READ: daftar + pencarian + paginasi =====
app.get('/', async (req, res) => {
    try {
        const q = (req.query.q || '').trim();
        const page = Math.max(parseInt(req.query.page) || 1, 1);
        const offset = (page - 1) * PER_PAGE;
        const keyword = '%' + q + '%';

    const [countRows] = await pool.execute(
        'SELECT COUNT(*) AS total FROM buku WHERE judul LIKE ? OR penulis LIKE ?',
        [keyword, keyword]
    );
    const totalPages = Math.max(Math.ceil(countRows[0].total / PER_PAGE), 1);

    const [rows] = await pool.execute(
      'SELECT * FROM buku WHERE judul LIKE ? OR penulis LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?',
        [keyword, keyword, String(PER_PAGE), String(offset)]
    );

    res.render('index', { buku: rows, q, page, totalPages });
    } catch (err) {
    console.error(err);
    res.status(500).send('Terjadi kesalahan pada server: ' + err.message);
    }
});

// ===== CREATE =====
app.get('/buku/tambah', (req, res) => {
    res.render('form', { buku: null, judulHalaman: 'Tambah Buku' });
});

app.post('/buku/tambah', async (req, res) => {
    try {
        const { judul, penulis, tahun_terbit, kategori } = req.body;
        await pool.execute(
            'INSERT INTO buku (judul, penulis, tahun_terbit, kategori) VALUES (?, ?, ?, ?)',
        [judul, penulis, tahun_terbit, kategori]
    );
    res.redirect('/');
    } catch (err) {
    console.error(err);
    res.status(500).send('Gagal menambah data: ' + err.message);
    }
});

// ===== UPDATE =====
app.get('/buku/:id/edit', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM buku WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).send('Data tidak ditemukan.');
        res.render('form', { buku: rows[0], judulHalaman: 'Edit Buku' });
    } catch (err) {
    console.error(err);
    res.status(500).send('Terjadi kesalahan pada server: ' + err.message);
    }
});

app.post('/buku/:id/edit', async (req, res) => {
    try {
        const { judul, penulis, tahun_terbit, kategori } = req.body;
        await pool.execute(
        'UPDATE buku SET judul = ?, penulis = ?, tahun_terbit = ?, kategori = ? WHERE id = ?',
        [judul, penulis, tahun_terbit, kategori, req.params.id]
    );
    res.redirect('/');
    } catch (err) {
    console.error(err);
    res.status(500).send('Gagal mengubah data: ' + err.message);
    }
});

// ===== DELETE =====
app.post('/buku/:id/hapus', async (req, res) => {
    try {
        await pool.execute('DELETE FROM buku WHERE id = ?', [req.params.id]);
        res.redirect('/');
    } catch (err) {
    console.error(err);
    res.status(500).send('Gagal menghapus data: ' + err.message);
    }
});

app.listen(PORT, () => console.log('Server berjalan di http://localhost:' + PORT));