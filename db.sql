-- Madinah Computers Database Schema
CREATE DATABASE IF NOT EXISTS madinah_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE madinah_db;

-- Settings table (stores all site content as JSON)
CREATE TABLE IF NOT EXISTS settings (
  `key` VARCHAR(100) PRIMARY KEY,
  value JSON NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Insert default admin (password: admin123456, bcrypt hash)
-- We'll generate the hash in server.js on first run
INSERT IGNORE INTO admin_users (username, password_hash) VALUES ('admin', '$2b$10$placeholder');

-- Default settings
INSERT IGNORE INTO settings (`key`, value) VALUES
('hero', '{"heading":"Solusi Laptop & Komputer Terpercaya","subtitle":"Jual & Beli Laptop, Rakit PC Gaming, Perbaikan, CCTV & SmartHome. Melayani dengan profesional sejak 2015."}'),
('about', '{"label":"About","heading":"Tentang Madinah Computers","description":"Madinah Computers adalah toko komputer terpercaya yang berlokasi di Pasar Sentral Land, Parung Panjang.","image1":"/assets/madinah/toko-dalam-1.jpg","image2":"/assets/madinah/toko-dalam-2.jpg","servicesBadge":"LAYANAN UNGGULAN","servicesTitle":"Layanan Service Kami","servicesDesc":"Kami menangani berbagai kerusakan laptop, komputer, dan printer dengan teknisi profesional & berpengalaman"}'),
('footer', '{"companyName":"MADINAH COMPUTERS","logoPath":"/assets/logo/logo_madinahcomputers.png","officeAddress":"Sentraland Boulevard Blok RA33\\nParung Panjang","workshopAddress":"Sentraland Boulevard Blok RA33, Parung Panjang","phones":["0811-1112-369"],"emails":["madinahcomputers@gmail.com"],"contactPersons":[{"name":"Admin Madinah","phone":"0811-1112-369","email":"madinahcomputers@gmail.com"}],"partners":[]}');
