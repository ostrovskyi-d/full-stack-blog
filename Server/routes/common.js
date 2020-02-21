const notAuthorised = (id, login, res, callback) => {
    if (!id && !login) {
        res.json({
            resultCode: 102,
            reason: "Not authorised, you must log in or register"
        })
    } else {
        callback()
    }

};

module.exports = { notAuthorised };