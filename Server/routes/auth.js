const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcryptjs');

// Crypt settings
const saltRounds = 10;


// register: storing name, email and password and redirecting to home page after signup
router.post('/register', async (req, res, next) => {
    const login = req.body['login'],
        password = req.body['password'],
        passwordConfirm = req.body['password-repeat'];

    if (!login || !password || !passwordConfirm) {
        res.json({
            resultCode: 102,
            type: 'error',
            message: "All fields must be filled",
        });
    } else if (!/^[a-zA-Z0-9]+$/.test(login)) {
        res.json({
            resultCode: 102,
            type: 'error',
            message: 'Only latin letters and numbers',
        })
    } else if (login.length < 3) {
        res.json({
            resultCode: 102,
            type: 'error',
            message: 'Login too short <br>(min symbols - 3, max symbols - 16)',
        })

    } else if (login.length > 30) {
        res.json({
            resultCode: 102,
            type: 'error',
            message: 'Login too long <br>(min symbols - 3, max symbols - 16)',
        })
    } else if (password.length < 6) {
        res.json({
            resultCode: 102,
            type: 'error',
            message: 'Minimum password length - 6 chars',
        })
    } else if (password !== passwordConfirm) {
        res.json({
            resultCode: 102,
            type: 'error',
            message: 'Passwords not equal',
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
                        userId: user.id,
                        userLogin: user.login,
                    });
                    // res.redirect('/');
                } catch (err) {
                    res.json({
                        resultCode: 102,
                        message: "Error, try later",
                    })
                }
            });
        } else {
            console.log("REJECT USER CREATING: USER EXISTS");
            res.json({
                resultCode: 102,
                message: "User already exist",
            })
        }
    }
});


router.post('/login', async (req, res, next) => {
    const {login, password} = req.body;
    if (!login || !password) {
        res.json({
            resultCode: 102,
            type: 'error',
            message: 'All fields must be filled',
        })
    } else {
        try {
            let user = await db.User.findOne({login});
            if (!user) {
                res.json({
                    resultCode: 102,
                    type: 'error',
                    message: 'Login or password incorrect!',
                })

            } else {
                return bcrypt.compare(password, user.password, (err, result) => {
                    console.log('USER::::::::', user);
                    if (result) {
                        // SESSION
                        req.session.userId = user.id;
                        req.session.userLogin = user.login;

                        res.json({
                            resultCode: 101,
                            message: 'Successful logged in',
                            type: 'success',
                            userLogin: user.login,
                            userId: user.id
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
        } catch (e) {
            throw new Error('Server Error')
        }

    }
});

router.get('/logout', (req, res, next) => {

    if (req.session) {
        req.session.destroy(err => {
            req.session = null;
            res.json({
                resultCode: 101,
                message: 'Successful logged out of your account'
            })
        });
    } else {
        res.redirect('/')
    }
});

module.exports = router;

