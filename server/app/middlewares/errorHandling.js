const errorHandling = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }
    console.log(err)
    return res.status(500).json({
        errors: 'Fatal Error!'
    })
}

module.exports = errorHandling