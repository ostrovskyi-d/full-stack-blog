const notAuthorised = (id, login, res, callback) => {
    if (!id && !login) {
        res.redirect('/')
    } else {
        callback()
    }

}

module.exports = { notAuthorised }