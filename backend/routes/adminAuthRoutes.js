const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const router = express.Router();

/**
 * Admin Signup
 */
router.post('/signup', async (req, res) => {
  const { first_name, last_name, username, email, password, role, department_id, referral_code } = req.body;

  // Referral code check
  if (referral_code !== 'PuneCity#123') {
    return res.status(400).json({ message: 'Invalid referral code' });
  }

  try {
    // Check if email or username exists
    const checkUser = await pool.query(
      'SELECT id FROM admins WHERE email = $1 OR username = $2',
      [email, username]
    );
    if (checkUser.rows.length > 0) {
      return res.status(400).json({ message: 'Email or username already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into DB
    const result = await pool.query(
      `INSERT INTO admins (first_name, last_name, username, email, password, role, department_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [first_name, last_name, username, email, hashedPassword, role, department_id || null]
    );

    res.status(201).json({
      message: 'Admin registered successfully',
      adminId: result.rows[0].id
    });
  } catch (err) {
    console.error('❌ Signup Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * Admin Login
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find admin
    const result = await pool.query(
      'SELECT * FROM admins WHERE email = $1',
      [email]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email' });
    }

    const admin = result.rows[0];

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate token
    const token = jwt.sign(
      { id: admin.id, role: admin.role, department_id: admin.department_id },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({
      token,
      role: admin.role,
      department_id: admin.department_id,
      message: `Login successful as ${admin.role}`
    });
  } catch (err) {
    console.error('❌ Login Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
