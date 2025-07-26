const asyncHandler = require('express-async-handler')
const pool = require('../config/db')
const validationSchema = require('../validations/validationSchema')

const createFolder = asyncHandler(async (req, res) => {
    const value = await validationSchema.folderSchema.validateAsync(req.body)
    const {name} = value
    const userId = req.user.userId

    const [result] = await pool.query(`
        INSERT INTO folders (name, user_id) VALUES (?, ?)
        `, [name, userId])
    
    res.json({message: 'Folder created'})
})

module.exports = {
    createFolder
}

