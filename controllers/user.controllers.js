const asyncHandler = require('express-async-handler')
const validationSchema = require('../validations/validationSchema.js')
const pool = require('../config/db.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerUser = asyncHandler(async (req, res) => {
    const value = await validationSchema.userSchema.validateAsync(req.body)
    const { username, password } = value

    const [rows] = await pool.query(`
            SELECT * FROM users WHERE username=?
        `, [username])
    if (rows.length > 0) {
        const err = new Error('Username already exists')
        err.status = 409
        throw err
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const [result] = await pool.query(`
        INSERT INTO users (username, password) VALUES(?,?)
        `, [username, hashedPassword])

    res.json({
        id: result.insertId,
        username,
    })
})

const loginUser = asyncHandler(async (req, res) => {
    const value = await validationSchema.userSchema.validateAsync(req.body)
    const {username, password} = value

    const [rows] = await pool.query(`
        SELECT * FROM users WHERE username=?
        `, [username])
    if (rows.length === 0) {
        const err = new Error("Username doesn't exist")
        err.status = 404
        throw err
    }

    const isValid = await bcrypt.compare(password, rows[0].password)
    if (!isValid) {
        const err = new Error('Invalid password')
        err.status = 400
        throw err
    }

    const token = jwt.sign(
        {userId: rows[0].id},
        process.env.SECRET,
        {expiresIn: '1h'}
    )

    res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        maxAge: 3600000
    })

    res.json(token)
})

const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie('token')
    res.status(200).json({message: 'Log out successfully'})
})

module.exports = {
    registerUser,
    loginUser,
    logoutUser
}