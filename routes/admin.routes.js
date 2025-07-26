const express = require('express')
const router = express.Router()
const adminControllers = require('../controllers/admin.controllers')

router.post('/register', adminControllers.registerAdmin)
router.post('/login', adminControllers.loginAdmin)
router.post('/logout', adminControllers.logoutAdmin)

module.exports = router