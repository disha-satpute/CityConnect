const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

exports.register = async (req, res) => {
  const { name, email, password, role, department_id } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (name, email, password, role, department_id)
       VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, role`,
      [name, email, hashed, role || 'citizen', department_id || null]
    );
    res.status(201).json({ user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    const user = result.rows[0];
    if (!user) return res.status(400).json({ error: 'User not found' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role, department_id: user.department_id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
