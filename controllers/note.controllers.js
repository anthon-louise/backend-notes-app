const asyncHandler = require('express-async-handler')
const validationSchema = require('../validations/validationSchema')
const pool = require('../config/db')

const createNote = asyncHandler(async (req, res) => {
    const bodyValue = await validationSchema.noteSchema.validateAsync(req.body)
    const {title, content} = bodyValue

    const idValue = await validationSchema.idSchema.validateAsync(req.params)
    const folderId = idValue.id

    const {userId} = req.user

    const [rows] = await pool.query(`
        SELECT * FROM folders WHERE id=? AND user_id=?
        `, [folderId, userId])
    if (rows.length === 0) {
        const err = new Error("Folder doesn't exist")
        err.status = 404
        throw err
    }
    
    const [result] = await pool.query(`
        INSERT INTO notes (title, content, folder_id, user_id) VALUES (?, ?, ?, ?)
        `, [title, content, folderId, userId])
    
        res.json({message: 'Notes created'})
})

const getNotes = asyncHandler(async (req, res) => {
    const {userId} = req.user

    const [rows] = await pool.query(`
        SELECT * FROM notes WHERE user_id=?
        `, [userId])

    res.json(rows)
})

const getNoteById = asyncHandler(async (req, res) => {
    const value = await validationSchema.idSchema.validateAsync(req.params)
    const noteId = value.id

    const {userId} = req.user

    const [rows] = await pool.query(`
        SELECT * FROM notes WHERE id=? AND user_id=? 
        `, [noteId, userId])
    if (rows.length === 0) {
        const err = new Error('Note not found')
        err.status = 404
        throw err
    }

    res.json(rows)
})

module.exports = {
    createNote,
    getNotes,
    getNoteById
}