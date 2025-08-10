const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../db');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { first_name, last_name, username, email, password, role, department_id, referral_code } = req.body;

  if (referral_code !== 'PuneCity#123') {
    return res.status(400).json({ message: 'Invalid referral code' });
  }

  try {
    // Check if email or username already exists
    const checkUser = await pool.query(
      'SELECT id FROM admins WHERE email = $1 OR username = $2',
      [email, username]
    );
    if (checkUser.rows.length > 0) {
      return res.status(400).json({ message: 'Email or username already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new admin
    const result = await pool.query(
      `INSERT INTO admins (first_name, last_name, username, email, password, role, department_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [first_name, last_name, username, email, hashedPassword, role, department_id || null]
    );

    res.status(201).json({
      message: 'Admin registered successfully',
      adminId: result.rows[0].id
    });

  }catch (err) {
  console.error('❌ Admin Signup Error:', err.message);
  console.error('Request Data:', req.body);
  res.status(500).json({ message: 'Server error', error: err.message });
}

});


module.exports = router;
