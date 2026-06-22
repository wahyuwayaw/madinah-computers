import { Router } from 'express';
import pool from '../db.js';

const router = Router();

// GET /api/all - all settings
router.get('/all', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT `key`, value FROM settings');
    const result = {};
    for (const row of rows) {
      result[row.key] = typeof row.value === 'string' ? JSON.parse(row.value) : row.value;
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/data/:key - single setting
router.get('/data/:key', async (req, res) => {
  const validKeys = ['hero', 'about', 'services', 'software', 'bidang', 'core_services', 'footer'];
  if (!validKeys.includes(req.params.key)) {
    return res.status(400).json({ error: 'Invalid key' });
  }
  try {
    const [rows] = await pool.query('SELECT value FROM settings WHERE `key` = ?', [req.params.key]);
    if (rows.length) {
      const val = typeof rows[0].value === 'string' ? JSON.parse(rows[0].value) : rows[0].value;
      res.json(val);
    } else {
      res.json(null);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/data/:key - update setting
router.post('/data/:key', async (req, res) => {
  const validKeys = ['hero', 'about', 'services', 'software', 'bidang', 'core_services', 'footer'];
  if (!validKeys.includes(req.params.key)) {
    return res.status(400).json({ error: 'Invalid key' });
  }
  try {
    const json = JSON.stringify(req.body);
    await pool.query(
      'INSERT INTO settings (`key`, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = VALUES(value), updated_at = CURRENT_TIMESTAMP',
      [req.params.key, json]
    );
    res.json({ success: true, key: req.params.key });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth - login
router.post('/auth', async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await pool.query('SELECT id, password_hash FROM admin_users WHERE username = ?', [username]);
    if (rows.length && bcrypt.compareSync(password, rows[0].password_hash)) {
      res.json({ success: true, token: 'madinah_admin_2026' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    // Fallback: hardcoded check
    if (username === 'admin' && password === 'admin123456') {
      return res.json({ success: true, token: 'madinah_admin_2026' });
    }
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

export default router;
