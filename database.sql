CREATE DATABASE IF NOT EXISTS db_perpustakaan;
USE db_perpustakaan;

CREATE TABLE IF NOT EXISTS buku (
    id INT AUTO_INCREMENT PRIMARY KEY,
    judul VARCHAR(150) NOT NULL,
    penulis VARCHAR(100) NOT NULL,
    tahun_terbit INT NOT NULL,
    kategori VARCHAR(50) NOT NULL
);

INSERT INTO buku (judul, penulis, tahun_terbit, kategori) VALUES
('Laskar Pelangi', 'Andrea Hirata', 2005, 'Novel'),
('Bumi Manusia', 'Pramoedya Ananta Toer', 1980, 'Novel'),
('Filosofi Teras', 'Henry Manampiring', 2018, 'Psikologi'),
('Atomic Habits', 'James Clear', 2018, 'Pengembangan Diri'),
('Clean Code', 'Robert C. Martin', 2008, 'Teknologi'),
('Algoritma dan Pemrograman', 'Rinaldi Munir', 2016, 'Teknologi'),
('Sapiens', 'Yuval Noah Harari', 2011, 'Sejarah'),
('Cantik Itu Luka', 'Eka Kurniawan', 2002, 'Novel'),
('Pemrograman Web dengan Node.js', 'Budi Raharjo', 2020, 'Teknologi'),
('Negeri 5 Menara', 'Ahmad Fuadi', 2009, 'Novel'),
('Rich Dad Poor Dad', 'Robert Kiyosaki', 1997, 'Keuangan'),
('Madilog', 'Tan Malaka', 1943, 'Filsafat');