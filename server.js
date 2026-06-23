import express from 'express';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRouter from './routes/api.js';
import adminRouter from './routes/admin.js';
import pool from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3002;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'madinah_secret_2026',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

// CORS for API
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// API routes
app.use('/api', apiRouter);

// Admin routes
app.use('/admin', adminRouter);

// Serve adapter.js
app.get('/adapter.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'adapter.js'));
});

// Serve documentation
app.get('/docs', (req, res) => {
  res.sendFile(path.join(__dirname, 'docs.html'));
});

// Serve public assets (admin CSS, etc)
app.use('/public', express.static(path.join(__dirname, 'public')));

// Serve React dist (static assets first, then SPA fallback)
app.use(express.static(path.join(__dirname, 'dist')));

// SPA fallback
app.get('*', (req, res) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/admin')) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Init
async function init() {
  try {
    const conn = await pool.getConnection();
    console.log('✅ MySQL connected');
    conn.release();

    const [rows] = await pool.query('SELECT password_hash FROM admin_users WHERE username = ?', ['admin']);
    if (rows.length && rows[0].password_hash === '$2b$10$placeholder') {
      const hash = bcrypt.hashSync('admin123456', 10);
      await pool.query('UPDATE admin_users SET password_hash = ? WHERE username = ?', [hash, 'admin']);
      console.log('✅ Admin password hashed');
    }
  } catch (err) {
    console.error('⚠️  MySQL not available:', err.message);
  }

  app.listen(PORT, () => {
    console.log(`🚀 Madinah Computers on http://localhost:${PORT}`);
    console.log(`   Public: http://localhost:${PORT}/`);
    console.log(`   Admin:  http://localhost:${PORT}/admin`);
  });
}

init();
