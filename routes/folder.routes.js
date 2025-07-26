const express = require('express')
const router = express.Router()
const folderRoutes = require('../controllers/folder.controllers')
const auth = require('../middlewares/auth')

router.post('/', auth, folderRoutes.createFolder)

module.exports = router