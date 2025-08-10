// backend/middlewares/verifySuperAdmin.js
const jwt = require('jsonwebtoken');

function verifySuperAdmin(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== 'superadmin') {
            return res.status(403).json({ error: 'Access denied. Super admin only.' });
        }

        req.admin = decoded; // store decoded info in req
        next();

    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}

module.exports = verifySuperAdmin;
