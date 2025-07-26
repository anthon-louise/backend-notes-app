const express = require('express')
const router = express.Router()
const folderRoutes = require('../controllers/folder.controllers')
const auth = require('../middlewares/auth')

router.post('/', auth, folderRoutes.createFolder)
router.get('/', auth, folderRoutes.getFolder)
// router.get('/:id', auth, folderRoutes.getFolderById)
router.delete('/:id', auth, folderRoutes.deleteFolder)
router.put('/:id', auth, folderRoutes.updateFolder)

module.exports = router