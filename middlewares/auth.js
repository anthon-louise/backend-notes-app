const jwt = require('jsonwebtoken')
const pool = require('../config/db')

module.exports = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ message: 'Not authorized' })
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET)
        if (decoded.role === 'user') {
            const [rows] = await pool.query(`
            SELECT * FROM users WHERE id=?
            `, decoded.userId)
            if (rows.length === 0) {
                const err = new Error('No user found')
                err.status = 404
                throw err
            }
        } else if (decoded.role === 'admin') {
            const [rows] = await pool.query(`
            SELECT * FROM admins WHERE id=?
            `, decoded.userId)
            if (rows.length === 0) {
                const err = new Error('No admin found')
                err.status = 404
                throw err
            }
        } else {
            const err = new Error('Invalid role')
            err.status = 400
            throw err
        }
        req.user = decoded
        next()
    } catch (err) {
        return res.status(403).json({ message: 'Invalid user' })
    }
}