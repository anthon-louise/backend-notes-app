const asyncHandler = require('express-async-handler')
const pool = require('../config/db')
const validationSchema = require('../validations/validationSchema')

const createFolder = asyncHandler(async (req, res) => {
    const value = await validationSchema.folderSchema.validateAsync(req.body)
    const { name } = value
    const userId = req.user.userId

    await pool.query(`
        INSERT INTO folders (name, user_id) VALUES (?, ?)
        `, [name, userId])

    res.json({ message: 'Folder created' })
})

const getFolder = asyncHandler(async (req, res) => {
    const { userId } = req.user

    const [rows] = await pool.query(`
        SELECT * FROM folders WHERE user_id=?
        `, [userId])

    res.json(rows)
})


// const getFolderById = asyncHandler(async (req, res) => {
//     const value = await validationSchema.idSchema.validateAsync(req.params)
//     const folderId = value.id


// })

const deleteFolder = asyncHandler(async (req, res) => {
    const value = await validationSchema.idSchema.validateAsync(req.params)
    const folderId = value.id
    const { userId } = req.user

    const [rows] = await pool.query(`
        SELECT * FROM folders WHERE id=? AND user_id=?
        `, [folderId, userId])
    if (rows.length === 0) {
        const err = new Error('No folder found')
        err.status = 404
        throw err
    }

    await pool.query(`
        DELETE FROM folders WHERE id=? AND user_id=?
        `, [folderId, userId])

    res.json({ message: 'Deleted' })
})

const updateFolder = asyncHandler(async (req, res) => {
    const bodyValue = await validationSchema.folderSchema.validateAsync(req.body)
    const { name } = bodyValue

    const idValue = await validationSchema.idSchema.validateAsync(req.params)
    const folderId = idValue.id

    const {userId} = req.user

    const [rows] = await pool.query(`
        SELECT * FROM folders WHERE id=? AND user_id=?
        `, [folderId, userId])
    if (rows.length === 0) {
        const err = new Error('No folder found')
        err.status = 404
        throw err
    }

    await pool.query(`
        UPDATE folders SET name=? WHERE id=? AND user_id=?
        `, [name, folderId, userId])

    res.json({message: 'Update success'})
})

module.exports = {
    createFolder,
    getFolder,
    deleteFolder,
    updateFolder
}

