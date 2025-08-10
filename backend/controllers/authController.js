const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

// ENV variables (JWT secret & expiry)
const JWT_SECRET = process.env.JWT_SECRET || 'yoursecretkey';
const JWT_EXPIRES_IN = '1h';

// Referral Code
const REFERRAL_CODE = 'PuneCity#123';

/**
 * Admin Signup Controller
 */
exports.adminSignup = async (req, res) => {
    const { first_name, last_name, username, email, password, role, department_id, referral_code } = req.body;

    try {
        // Referral code check
        if (referral_code !== REFERRAL_CODE) {
            return res.status(400).json({ message: 'Invalid referral code' });
        }

        // Check if email already exists
        const existingAdmin = await pool.query('SELECT * FROM admins WHERE email = $1', [email]);
        if (existingAdmin.rows.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new admin
        const result = await pool.query(
            `INSERT INTO admins (first_name, last_name, username, email, password, role, department_id)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING id, first_name, last_name, username, email, role, department_id`,
            [first_name, last_name, username, email, hashedPassword, role, department_id || null]
        );

        res.status(201).json({
            message: 'Admin registered successfully',
            admin: result.rows[0]
        });

    } catch (err) {
        console.error('Signup Error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * Admin Login Controller
 */
exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find admin by email
        const result = await pool.query('SELECT * FROM admins WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const admin = result.rows[0];

        // Compare passwords
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: admin.id, role: admin.role },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        res.json({
            message: 'Login successful',
            token,
            role: admin.role,
            admin: {
                id: admin.id,
                first_name: admin.first_name,
                last_name: admin.last_name,
                username: admin.username,
                email: admin.email,
                role: admin.role
            }
        });

    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
