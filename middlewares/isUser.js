
module.exports = async (req, res, next) => { 
    if (req.user.role !== 'user') {
        const err = new Error('Unauthorized access')
        err.status = 401
        throw err
    }


    next()
}