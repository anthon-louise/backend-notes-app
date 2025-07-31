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

const getUsers = asyncHandler(async (req, res) => {
    const [rows] = await pool.query(`
        SELECT username, id FROM users
        `)
    res.json(rows)
})

const getNotes = asyncHandler(async (req, res) => {
    const [rows] = await pool.query(`
        SELECT
            users.username,
            folders.name,
            notes.title,
            notes.content,
            notes.created_at,
            notes.id
        FROM users
        JOIN folders ON users.id = folders.user_id
        LEFT JOIN notes ON folders.id = notes.folder_id
        `)

    res.json(rows)
})

const deleteUser = asyncHandler(async (req, res) => {
    const value = await validationSchema.idSchema.validateAsync(req.params)
    const userId = value.id

    const [rows] = await pool.query(`
        SELECT * FROM users WHERE id=?
        `, [userId])
    if (rows.length === 0) {
        const err = new Error('No user exists')
        err.status = 404
        throw err
    }

    await pool.query(`
        DELETE FROM users WHERE id=?
        `, userId)

    res.json({message: 'Successfully deleted'})
})

const deleteNotes = asyncHandler(async (req, res) => {
    const value = await validationSchema.idSchema.validateAsync(req.params)
    const noteId = value.id

    const [rows] = await pool.query(`
        SELECT * FROM notes WHERE id=?
        `, [noteId])
    if (rows.length === 0) {
        const err = new Error('Notes did not exist')
        err.status = 404
        throw err
    }

    await pool.query(`
        DELETE FROM notes WHERE id=?
        `, [noteId])

    res.json({message: 'Note deleted'})
})

module.exports = {
    registerAdmin,
    loginAdmin,
    logoutAdmin,
    getUsers,
    getNotes,
    deleteUser,
    deleteNotes
}