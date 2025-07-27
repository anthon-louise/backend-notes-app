const express = require('express')
const router = express.Router()
const folderRoutes = require('../controllers/folder.controllers')
const auth = require('../middlewares/auth')
const isUser = require('../middlewares/isUser')

router.post('/', auth, isUser, folderRoutes.createFolder)
router.get('/', auth, isUser, folderRoutes.getFolder)
router.get('/:id', auth, isUser, folderRoutes.getFolderById)
router.delete('/:id', auth, isUser, folderRoutes.deleteFolder)
router.put('/:id', auth, isUser, folderRoutes.updateFolder)

module.exports = router