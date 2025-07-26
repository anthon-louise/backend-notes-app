const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({message: 'Not authorized'})
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET)
        req.user = decoded
        next()
    } catch (err) {
        return res.status(403).json({message: 'Invalid token'})
    }
}