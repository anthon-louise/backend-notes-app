const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validationSchema = require('../validations/validationSchema')
const pool = require('../config/db')

const registerAdmin = asyncHandler(async (req, res) => {
    const value = await validationSchema.userSchema.validateAsync(req.body)
    const { username, password } = value

    const [rows] = await pool.query(`
        SELECT * FROM admins WHERE username=?
        `, [username])
    if (rows.length > 0) {
        const err = new Error('Username already exists')
        err.status = 409
        throw err
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const [result] = await pool.query(`
        INSERT INTO admins (username, password) VALUES(?, ?)
        `, [username, hashedPassword])

    res.json({
        id: result.insertId,
        username
    })

})

const loginAdmin = asyncHandler(async (req, res) => {
    const value = await validationSchema.userSchema.validateAsync(req.body)
    const { username, password } = value

    const [rows] = await pool.query(`
        SELECT * FROM admins WHERE username=?
        `, [username])
    if (rows.length === 0) {
        const err = new Error('Username doesnt exists')
        err.status = 404
        throw err
    }

    const isValid = await bcrypt.compare(password, rows[0].password)
    if (!isValid) {
        const err = new Error('Invalid passsword')
        err.status = 500
        throw err
    }

    const token = jwt.sign(
        { userId: rows[0].id },
        process.env.SECRET,
        { expiresIn: '1h' }
    )

    res.cookie('token', token, {
        secure: false,
        httpOnly: true,
        maxAge: 3600000
    })

    res.json({ message: token })
})

const logoutAdmin = asyncHandler(async (req, res) => {
    res.clearCookie('token')
    res.json({message: 'Logout success'})
})

module.exports = {
    registerAdmin,
    loginAdmin,
    logoutAdmin
}