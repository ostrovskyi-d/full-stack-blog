const express = require('express');
const router = express.Router();
router.post('/register', (req, res) => {
    const {login, password, passwordConfirm} = req.body;

    if (!login || !password || !passwordConfirm) {
        res.json({
            status: 'error',
            message: "All fields must be filled",

        })
    } else if (login.length < 3) {
        res.json({
            status: 'error',
            message: 'Login too short (min symbols: 3, max symbols: 16)',
            fields: ['login']
        })
    } else if (login.length > 16) {
        res.json({
            status: 'error',
            message: 'Login too long (min symbols: 3, max symbols: 16)',
            fields: ['login'],
        })
    } else if (password !== passwordConfirm) {
        res.json({
            status: 'error',
            message: 'Passwords not equal',
            fields: ['password', 'passwordConfirm']
        })
    } else {
        res.json({...req.body})
    }
});
router.post('/login', (req, res) => {
    const {login, password} = req.body;
    if (!login || !password) {
        res.json({
            status: 'error',
            message: 'All fields must be filled',
            fields: ['login', 'password']
        })
    } else {
        res.json({...req.body})
    }
});

module.exports = router;

