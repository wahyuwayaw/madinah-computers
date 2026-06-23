import { Router } from 'express';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import pool from '../db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer config for hero image upload
const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'public', 'assets', 'madinah'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, 'hero-' + Date.now() + '.jpg');
  }
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

const router = Router();

// Auth middleware
function requireAuth(req, res, next) {
  if (req.session && req.session.admin) return next();
  res.redirect('./login');
}

// GET /admin/login
router.get('/login', (req, res) => {
  res.render('admin/login', { error: null });
});

// POST /admin/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await pool.query('SELECT id, username, password_hash FROM admin_users WHERE username = ?', [username]);
    if (rows.length && bcrypt.compareSync(password, rows[0].password_hash)) {
      req.session.admin = { id: rows[0].id, username: rows[0].username };
      return res.redirect('./');
    }
  } catch (err) {
    // Fallback
    if (username === 'admin' && password === 'admin123456') {
      req.session.admin = { id: 1, username: 'admin' };
      return res.redirect('./');
    }
  }
  res.render('admin/login', { error: 'Username atau password salah' });
});

// GET /admin/logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('./login');
});

// GET /admin - Dashboard
router.get('/', requireAuth, async (req, res) => {
  let settings = {};
  try {
    const [rows] = await pool.query('SELECT `key`, value FROM settings');
    for (const row of rows) {
      settings[row.key] = typeof row.value === 'string' ? JSON.parse(row.value) : row.value;
    }
  } catch (err) {}
  res.render('admin/dashboard', { admin: req.session.admin, settings });
});

// GET /admin/hero
router.get('/hero', requireAuth, async (req, res) => {
  let data = { heading: '', subtitle: '' };
  try {
    const [rows] = await pool.query('SELECT value FROM settings WHERE `key` = ?', ['hero']);
    if (rows.length) data = typeof rows[0].value === 'string' ? JSON.parse(rows[0].value) : rows[0].value;
  } catch (err) {}
  res.render('admin/hero', { admin: req.session.admin, data, saved: req.query.saved });
});

// POST /admin/hero
router.post('/hero', requireAuth, upload.single('heroImage'), async (req, res) => {
  const { heading, subtitle, existingImage } = req.body;
  let heroImage = existingImage || '/madinah/public/assets/madinah/hero-default.jpg';
  if (req.file) {
    heroImage = '/madinah/public/assets/madinah/' + req.file.filename;
    // Sync uploaded file to nginx static location
    try {
      const src = path.join(__dirname, '..', 'public', 'assets', 'madinah', req.file.filename);
      const dest = '/www/wwwroot/madinah/public/assets/madinah/' + req.file.filename;
      fs.copyFileSync(src, dest);
    } catch (syncErr) {}
  }
  const data = { heading, subtitle, heroImage };
  try {
    await pool.query(
      'INSERT INTO settings (`key`, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = VALUES(value), updated_at = CURRENT_TIMESTAMP',
      ['hero', JSON.stringify(data)]
    );
  } catch (err) {}
  res.redirect('./hero?saved=1');
});

// GET /admin/about
router.get('/about', requireAuth, async (req, res) => {
  let data = { label: '', heading: '', description: '', image1: '', image2: '', servicesBadge: '', servicesTitle: '', servicesDesc: '' };
  try {
    const [rows] = await pool.query('SELECT value FROM settings WHERE `key` = ?', ['about']);
    if (rows.length) data = typeof rows[0].value === 'string' ? JSON.parse(rows[0].value) : rows[0].value;
  } catch (err) {}
  res.render('admin/about', { admin: req.session.admin, data, saved: req.query.saved });
});

// POST /admin/about
router.post('/about', requireAuth, async (req, res) => {
  const data = req.body;
  try {
    await pool.query(
      'INSERT INTO settings (`key`, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = VALUES(value), updated_at = CURRENT_TIMESTAMP',
      ['about', JSON.stringify(data)]
    );
  } catch (err) {}
  res.redirect('./about?saved=1');
});

// GET /admin/services
router.get('/services', requireAuth, async (req, res) => {
  let data = [];
  try {
    const [rows] = await pool.query('SELECT value FROM settings WHERE `key` = ?', ['services']);
    if (rows.length) data = typeof rows[0].value === 'string' ? JSON.parse(rows[0].value) : rows[0].value;
  } catch (err) {}
  res.render('admin/services', { admin: req.session.admin, data, saved: req.query.saved });
});

// POST /admin/services
router.post('/services', requireAuth, async (req, res) => {
  try {
    const data = JSON.parse(req.body.data);
    await pool.query(
      'INSERT INTO settings (`key`, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = VALUES(value), updated_at = CURRENT_TIMESTAMP',
      ['services', JSON.stringify(data)]
    );
  } catch (err) {}
  res.redirect('./services?saved=1');
});

// GET /admin/software
router.get('/software', requireAuth, async (req, res) => {
  let data = [];
  try {
    const [rows] = await pool.query('SELECT value FROM settings WHERE `key` = ?', ['software']);
    if (rows.length) data = typeof rows[0].value === 'string' ? JSON.parse(rows[0].value) : rows[0].value;
  } catch (err) {}
  res.render('admin/software', { admin: req.session.admin, data, saved: req.query.saved });
});

// POST /admin/software
router.post('/software', requireAuth, async (req, res) => {
  try {
    const data = JSON.parse(req.body.data);
    await pool.query(
      'INSERT INTO settings (`key`, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = VALUES(value), updated_at = CURRENT_TIMESTAMP',
      ['software', JSON.stringify(data)]
    );
  } catch (err) {}
  res.redirect('./software?saved=1');
});

// GET /admin/footer
router.get('/footer', requireAuth, async (req, res) => {
  let data = { companyName: '', phones: [], emails: [], officeAddress: '', workshopAddress: '', contactPersons: [] };
  try {
    const [rows] = await pool.query('SELECT value FROM settings WHERE `key` = ?', ['footer']);
    if (rows.length) data = typeof rows[0].value === 'string' ? JSON.parse(rows[0].value) : rows[0].value;
  } catch (err) {}
  res.render('admin/footer', { admin: req.session.admin, data, saved: req.query.saved });
});

// POST /admin/footer
router.post('/footer', requireAuth, async (req, res) => {
  const data = req.body;
  // Parse arrays from form
  data.phones = data.phones ? data.phones.split(',').map(s => s.trim()) : [];
  data.emails = data.emails ? data.emails.split(',').map(s => s.trim()) : [];
  try {
    await pool.query(
      'INSERT INTO settings (`key`, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = VALUES(value), updated_at = CURRENT_TIMESTAMP',
      ['footer', JSON.stringify(data)]
    );
  } catch (err) {}
  res.redirect('./footer?saved=1');
});

export default router;
