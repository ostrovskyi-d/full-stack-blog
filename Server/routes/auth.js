const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcryptjs');

// Crypt settings
const saltRounds = 10;


// register: storing name, email and password and redirecting to home page after signup
router.post('/register', async (req, res, next) => {
    const {login, password, passwordConfirm} = req.body;
    const fields = [];

    !login && fields.push('login');
    !password && fields.push('password');
    !passwordConfirm && fields.push('password-repeat');


    if (!login || !password || !passwordConfirm) {
        res.json({
            resultCode: 102,
            type: 'error',
            message: "All fields must be filled",
            fields
        });
    } else if (!/^[a-zA-Z0-9]+$/.test(login)) {
        res.json({
            resultCode: 102,
            type: 'error',
            message: 'Only latin letters and numbers',
            fields: ['login']
        })
    } else if (login.length < 3) {
        res.json({
            resultCode: 102,
            type: 'error',
            message: 'Login too short <br>(min symbols - 3, max symbols - 16)',
            fields
        })

    } else if (login.length > 16) {
        res.json({
            resultCode: 102,
            type: 'error',
            message: 'Login too long <br>(min symbols - 3, max symbols - 16)',
            fields
        })
    } else if (password.length < 6) {
        res.json({
            resultCode: 102,
            type: 'error',
            message: 'Minimum password length - 6 chars',
            fields: ['password']
        })
    } else if (password !== passwordConfirm) {
        res.json({
            resultCode: 102,
            type: 'error',
            message: 'Passwords not equal',
            fields
        })
    } else {
        let user = await db.User.findOne({login});
        if (!user) {
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                try {
                    let user = await db.User.create({
                        login,
                        password: hash
                    });
                    req.session.userId = user.id;
                    req.session.userLogin = user.login;
                    res.json({
                        resultCode: 101,
                        message: "User created",
                        fields
                    });
                } catch (err) {
                    res.json({
                        resultCode: 102,
                        message: "Error, try later",
                        fields: []
                    })
                }
            });
        } else {
            console.log("REJECT USER CREATING: USER EXISTS");
            res.json({
                resultCode: 102,
                message: "User already exist",
                fields
            })
        }
    }
});


router.post('/login', async (req, res, next) => {
    const {login, password} = req.body;

    const fields = [];
    console.log(login, password);
    !login && fields.push('login');
    !password && fields.push('password');

    if (!login || !password) {
        res.json({
            resultCode: 102,
            type: 'error',
            message: 'All fields must be filled',
            fields
        })
    } else {
        let user = await db.User.findOne({login});
        if (!user) {
            res.json({
                resultCode: 102,
                type: 'error',
                message: 'Login or password incorrect!',
                fields: ['login', 'password']
            })

        } else {
            bcrypt.compare(password, user.password, (err, result) => {
                console.log(result);
                if (result) {

                    // SESSION
                    req.session.userId = user.id;
                    req.session.userLogin = user.login;

                    res.json({
                        resultCode: 101,
                        type: 'success',
                        message: `Hello, ${login}!`
                    })
                } else {

                    res.json({
                        resultCode: 102,
                        type: 'error',
                        message: 'Login or password incorrect!',
                    })
                }
            })
        }
    }
});

router.get('/logout', (req, res, next) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) return next(err);
            else return res.redirect('/')
        });
    } else {
        res.redirect('/')
    }
});

module.exports = router;

