const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const noteRoutes = require('../controllers/note.controllers')

router.post('/:id', auth, noteRoutes.createNote)
router.get('/', auth, noteRoutes.getNotes)
router.get('/:id', auth, noteRoutes.getNoteById)

module.exports = router