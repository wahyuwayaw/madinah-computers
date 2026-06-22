# 🖥️ PT Madinah Computers — Company Profile

Website company profile untuk **PT Madinah Computers**, toko komputer terpercaya di Parung Panjang. Dibangun dengan arsitektur **hybrid** yang menggabungkan React.js SPA (frontend publik) dan Express.js + EJS (backend + admin panel).

## 📸 Demo

| Halaman | URL |
|---------|-----|
| Website Publik | `http://localhost:3000/` |
| Panel Admin | `http://localhost:3000/admin` |
| Dokumentasi | `http://localhost:3000/docs` |
| API | `http://localhost:3000/api/all` |

**Default Admin:** `admin` / `admin123456`

## 🏗️ Arsitektur

```
┌───────────────────────────────────┐
│      React.js + Vite + Tailwind   │ ← Frontend Publik (SPA)
│      Landing, Katalog, Kontak     │
└──────────────┬────────────────────┘
               │ fetch() API
               ▼
┌───────────────────────────────────┐
│     Express.js 4.x + EJS          │ ← Backend
│     REST API + Admin SSR          │
└──────────────┬────────────────────┘
               │ mysql2
               ▼
┌───────────────────────────────────┐
│           MySQL 8                 │ ← Database
└───────────────────────────────────┘
```

## 🛠️ Tech Stack

- **Runtime:** Node.js 18+
- **Backend:** Express.js 4.21
- **Template:** EJS 3.1 (admin panel)
- **Database:** MySQL 8 + mysql2 driver
- **Frontend:** React 19 + Vite 7
- **CSS:** Tailwind CSS 3.4
- **Animations:** Framer Motion 12
- **Icons:** Lucide React + React Icons
- **Auth:** express-session + bcryptjs

## 📥 Instalasi

### 1. Clone & Install

```bash
git clone https://github.com/wahyuwayaw/madinah-computers.git
cd madinah-computers
npm install
```

### 2. Setup Database

```sql
-- Login ke MySQL
mysql -u root -p

-- Buat database & user
CREATE DATABASE madinah_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'madinah_api'@'localhost' IDENTIFIED BY 'Mad1n4hAPI!';
GRANT ALL PRIVILEGES ON madinah_db.* TO 'madinah_api'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

```bash
# Import skema
mysql -u madinah_api -p'Mad1n4hAPI!' madinah_db < db.sql
```

### 3. Run

```bash
# Development (2 terminal)
npm run start     # Backend: http://localhost:3000
npm run dev       # Frontend: http://localhost:5173

# Production (1 terminal)
npm run build     # Build React ke dist/
npm run start     # Semua jalan di http://localhost:3000
```

## 📂 Struktur Proyek

```
madinah-computers/
├── server.js              # Express server utama
├── db.js                  # MySQL connection pool
├── db.sql                 # Skema database
├── package.json
├── vite.config.js
├── docs.html              # Dokumentasi lengkap
├── routes/
│   ├── api.js             # REST API (/api/*)
│   └── admin.js           # Admin routes (/admin/*)
├── views/
│   ├── admin/             # EJS templates (login, dashboard, CRUD)
│   └── partials/          # Header, sidebar, footer
├── public/
│   ├── admin.css          # Admin panel styles
│   └── adapter.js         # localStorage → MySQL bridge
├── src/                   # React frontend source
│   ├── components/        # UI components
│   ├── pages/             # Page components
│   ├── context/           # React Context
│   └── data/              # Default data
└── dist/                  # Built frontend (output)
```

## 🔌 API Endpoints

| Method | Endpoint | Fungsi |
|--------|----------|--------|
| `GET` | `/api/all` | Ambil semua settings |
| `GET` | `/api/data/:key` | Ambil satu setting |
| `POST` | `/api/data/:key` | Update setting |
| `POST` | `/api/auth` | Login admin |

**Valid keys:** `hero`, `about`, `services`, `software`, `bidang`, `core_services`, `footer`

## ⚙️ Panel Admin

| Halaman | URL | Fungsi |
|---------|-----|--------|
| Dashboard | `/admin` | Ringkasan konten |
| Hero | `/admin/hero` | Edit heading & subtitle |
| About | `/admin/about` | Edit deskripsi & gambar |
| Services | `/admin/services` | CRUD layanan |
| Software | `/admin/software` | CRUD software |
| Footer | `/admin/footer` | Edit kontak & alamat |

## 📖 Dokumentasi

Buka [docs.html](docs.html) atau akses `/docs` saat server berjalan untuk dokumentasi lengkap termasuk:
- Arsitektur sistem
- Langkah instalasi detail
- Skema database
- Dokumentasi API
- Deployment guide
- Troubleshooting

## 📄 License

© 2026 PT Madinah Computers. All rights reserved.
