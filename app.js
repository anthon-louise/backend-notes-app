const express = require('express')

const userRoutes = require('./routes/user.routes')
const adminRoutes = require('./routes/admin.routes')
const folderRoutes = require('./routes/folder.routes')
const noteRoutes = require('./routes/note.routes')

const errorHandler = require('./middlewares/errorHandler')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/users', userRoutes)
app.use('/admins', adminRoutes)
app.use('/folders', folderRoutes)
app.use('/notes', noteRoutes)

app.use(errorHandler)

module.exports = app