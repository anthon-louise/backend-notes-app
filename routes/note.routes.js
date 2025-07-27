const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const isUser = require('../middlewares/isUser')
const noteRoutes = require('../controllers/note.controllers')

router.post('/:id', auth, isUser, noteRoutes.createNote)
router.get('/', auth, isUser, noteRoutes.getNotes)
router.get('/:id', auth, isUser, noteRoutes.getNoteById)
router.delete('/:id', auth, isUser, noteRoutes.deleteNote)
router.put('/:id', auth, isUser, noteRoutes.updateNote)

module.exports = router