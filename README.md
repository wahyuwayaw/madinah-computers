# 🖥️ Madinah Computers — Company Profile

Website company profile untuk **Madinah Computers** — toko komputer, laptop, rakit PC gaming, CCTV & SmartHome.

**Stack:** React (Vite) + Node.js (Express) + MySQL + EJS Admin Panel

---

## 📸 Fitur

- **Hero Section** — banner utama dengan heading, subtitle, dan gambar
- **About** — profil perusahaan dengan gambar
- **Services** — daftar layanan (editable via admin)
- **Software** — daftar software yang tersedia
- **Footer** — kontak dan info toko
- **Admin Panel** — CRUD semua konten via EJS server-side rendering
- **Download Page** — link download file
- **MySQL Database-driven** — semua data tersimpan di MySQL

---

## ⚙️ Requirements

- **Node.js** v18+ (tested on v20)
- **MySQL** 5.7+ / MariaDB 10.4+
- **npm** atau **yarn**

---

## 🚀 Setup Local

### 1. Clone repo

```bash
git clone https://github.com/wahyuwayaw/madinah-computers.git
cd madinah-computers
```

### 2. Install dependencies

```bash
npm install
```

### 3. Buat database MySQL

```sql
CREATE DATABASE madinah_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE madinah_db;

-- Tabel settings (menyimpan semua konten website)
CREATE TABLE settings (
  `key` VARCHAR(100) NOT NULL PRIMARY KEY,
  value JSON NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Tabel admin users
CREATE TABLE admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Insert default admin (password: admin123456)
INSERT INTO admin_users (username, password_hash) VALUES (
  'admin',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
);

-- Insert default content
INSERT INTO settings (`key`, value) VALUES
('hero', '{"heading":"Madinah Computers Solusi Terbaik!","subtitle":"Jual & Beli Laptop, Rakit PC Gaming, Perbaikan, CCTV & SmartHome.","heroImage":""}'),
('about', '{"label":"Tentang Kami","heading":"Madinah Computers","description":"Melayani sejak 2015","image1":"","image2":""}'),
('services', '[]'),
('software', '[]'),
('footer', '{"phones":[],"emails":[],"address":"","socialMedia":[]}');
```

### 4. Buat file `.env`

```bash
cp .env.example .env
```

Edit `.env`:

```env
DB_HOST=127.0.0.1
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=madinah_db
SESSION_SECRET=random_secret_here
PORT=3002
```

### 5. Build frontend (React + Vite)

```bash
npm run build
```

### 6. Jalankan server

```bash
node server.js
```

Server berjalan di:
- **Website:** http://localhost:3002/
- **Admin:** http://localhost:3002/admin

### 7. Login Admin

- **Username:** `admin`
- **Password:** `admin123456`

---

## 📁 Struktur Project

```
madinah-computers/
├── server.js              # Express server utama
├── db.js                  # MySQL connection pool
├── routes/
│   ├── api.js             # API routes (CRUD settings)
│   └── admin.js           # Admin routes (EJS rendering)
├── views/
│   ├── admin/             # EJS admin templates
│   │   ├── login.ejs
│   │   ├── dashboard.ejs
│   │   ├── hero.ejs
│   │   ├── about.ejs
│   │   ├── services.ejs
│   │   ├── software.ejs
│   │   └── footer.ejs
│   └── partials/
│       ├── header.ejs     # Sidebar + topbar
│       └── footer.ejs     # JS sidebar toggle
├── public/
│   ├── admin.css          # Admin panel styles
│   ├── adapter.js         # localStorage → MySQL adapter
│   └── assets/            # Images (logo, produk, etc)
├── src/                   # React source code
├── dist/                  # Built frontend
├── .env.example           # Environment variables template
└── package.json
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/data/:key` | Ambil data (hero, about, services, software, footer) |
| POST | `/api/data/:key` | Update data |
| GET | `/api/data/all` | Ambil semua data |

---

## 🌐 Deploy ke Server

### Nginx config (reverse proxy)

```nginx
# API
location /madinah/api/ {
    proxy_pass http://127.0.0.1:3002/api/;
}

# Admin
location /madinah/admin/public/ {
    alias /path/to/madinah-computers/public/;
}
location /madinah/admin/ {
    proxy_pass http://127.0.0.1:3002/admin/;
}

# Frontend
location /madinah/ {
    alias /path/to/madinah-computers/dist/;
    try_files $uri $uri/ /madinah/index.html;
}
```

### systemd service

```ini
[Unit]
Description=Madinah Computers Backend
After=network.target mysql.service

[Service]
Type=simple
User=www
WorkingDirectory=/path/to/madinah-computers
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=5
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

---

## 📝 Catatan

- Admin panel menggunakan **EJS** (server-side rendering)
- Website publik menggunakan **React SPA** (client-side)
- Data adapter (`adapter.js`) meng-override `localStorage` → fetch dari MySQL API
- Upload gambar tersimpan di `public/assets/madinah/`
- Max upload size: **5MB**

---

## 🛠️ Tech Stack

- **Frontend:** React 18 + Vite
- **Backend:** Express.js + EJS
- **Database:** MySQL (mysql2 driver)
- **Auth:** express-session + bcryptjs
- **Upload:** Multer
- **CSS:** Custom (Inter font, Font Awesome icons)

---

**Made with ❤️ by Wahyu Sugiarto**
