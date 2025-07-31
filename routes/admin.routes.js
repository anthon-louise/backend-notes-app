const express = require('express')
const router = express.Router()
const adminControllers = require('../controllers/admin.controllers')

router.post('/register', adminControllers.registerAdmin)
router.post('/login', adminControllers.loginAdmin)
router.post('/logout', adminControllers.logoutAdmin)
router.get('/users', adminControllers.getUsers)
router.get('/notes', adminControllers.getNotes)
router.delete('/users/:id', adminControllers.deleteUser)
router.delete('/notes/:id', adminControllers.deleteNotes)

module.exports = router