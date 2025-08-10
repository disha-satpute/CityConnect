const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../config/db');

const router = express.Router();

/* -------------------- DEPARTMENTS CRUD -------------------- */

// Get all departments
router.get('/departments', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM departments ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching departments:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new department
router.post('/departments', async (req, res) => {
  const { name, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO departments (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding department:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update department
router.put('/departments/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const result = await pool.query(
      'UPDATE departments SET name=$1, description=$2 WHERE id=$3 RETURNING *',
      [name, description, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Department not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating department:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete department
router.delete('/departments/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM departments WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Department not found' });
    res.json({ message: 'Department deleted' });
  } catch (err) {
    console.error('Error deleting department:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/* -------------------- ADMINS MANAGEMENT -------------------- */

// Get all admins
router.get('/admins', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, username, email, first_name, last_name, role, department_id, created_at FROM admins ORDER BY id ASC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching admins:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create admin
router.post('/admins', async (req, res) => {
  const { username, email, password, first_name, last_name, role, department_id } = req.body;
  try {
    // Check if username or email exists
    const check = await pool.query(
      'SELECT id FROM admins WHERE username=$1 OR email=$2',
      [username, email]
    );
    if (check.rows.length > 0) {
      return res.status(400).json({ message: 'Username or Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO admins (username, email, password, first_name, last_name, role, department_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, username, email, role`,
      [username, email, hashedPassword, first_name, last_name, role, department_id || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating admin:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete admin
router.delete('/admins/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM admins WHERE id=$1 RETURNING id', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Admin not found' });
    res.json({ message: 'Admin deleted' });
  } catch (err) {
    console.error('Error deleting admin:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/* -------------------- REPORTS / COMPLAINTS -------------------- */

// Get all reports
router.get('/reports', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT r.*, d.name AS department_name
       FROM reports r
       LEFT JOIN departments d ON r.department_id = d.id
       ORDER BY r.created_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching reports:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update report status + feedback
router.put('/reports/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status, admin_feedback } = req.body;
  try {
    const result = await pool.query(
      'UPDATE reports SET status=$1, admin_feedback=$2 WHERE id=$3 RETURNING *',
      [status, admin_feedback || null, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Report not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating report:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/* -------------------- TASKS -------------------- */

// Get all tasks
router.get('/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY submitted_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify task & award eco coins
router.put('/tasks/:id/verify', async (req, res) => {
  const { id } = req.params;
  const { is_verified, eco_coins_awarded, admin_feedback } = req.body;
  try {
    const result = await pool.query(
      'UPDATE tasks SET is_verified=$1, eco_coins_awarded=$2, admin_feedback=$3 WHERE id=$4 RETURNING *',
      [is_verified, eco_coins_awarded, admin_feedback || null, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Task not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error verifying task:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
