// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// 
// Довести до ума реєстрацію
// 
// Помилка: тільки латинські символи і цифри
// Помилка: пароль не менше 6 символів
// 
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcryptjs');

// Crypt settings
const saltRounds = 10;


// register: storing name, email and password and redirecting to home page after signup
router.post('/register', async ({ body: { login, password, passwordConfirm }, ...rest }, res) => {

    const fields = [];

    !login && fields.push('login')
    !password && fields.push('password')
    !passwordConfirm && fields.push('password-repeat')


    if (!login || !password || !passwordConfirm) {
        const error = {
            resultCode: 102,
            status: 'error',
            message: "All fields must be filled",
            fields
        };
        res.json({ ...error })

    } else if (login.length < 3) {
        res.json({
            resultCode: 102,
            status: 'error',
            message: 'Login too short <br>(min symbols - 3, max symbols - 16)',
            fields
        })
    } else if (login.length > 16) {
        res.json({
            resultCode: 102,
            status: 'error',
            message: 'Login too long <br>(min symbols - 3, max symbols - 16)',
            fields
        })
    } else if (password !== passwordConfirm) {
        res.json({
            resultCode: 102,
            status: 'error',
            message: 'Passwords not equal',
            fields
        })
    } else {
        let user = await db.User.findOne({ login })
        if (!user) {
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                try {
                    let response = await db.User.create({
                        login,
                        password: hash
                    })
                } catch (err) {
                    res.json({
                        resultCode: 102,
                        message: "Error, try later",
                        fields: []
                    })
                };
                res.json({
                    resultCode: 101,
                    message: "User created",
                    fields
                })
                console.log('USER CREATED')
                res.redirect('/');
            });
        } else {
            console.log("REJECT USER CREATING: USER EXISTS")
            res.json({
                resultCode: 102,
                message: "User already exist",
                fields
            })
        }
    }
});
router.post('/login', async (req, res) => {
    const { login, password } = req.body;

    const fields = [];
    console.log(login, password)
    !login && fields.push('login');
    !password && fields.push('password');

    if (!login || !password) {
        res.json({
            resultCode: 102,
            status: 'error',
            message: 'All fields must be filled',
            fields
        })
    } else {
        let user = await db.User.findOne({ login });
        if (!user) {
            res.json({
                resultCode: 102,
                status: 'error',
                message: 'Login or password incorrect!',
                fields: ['login', 'password']
            })
        } else {
            bcrypt.compare(password, user.password, (err, result) => {
                console.log(result);
                if(result) {
                    res.json({
                        resultCode: 101,
                        status: 'success',
                        message: `Hello, ${login}!`
                    })
                } else {
                    res.json({
                        resultCode: 102,
                        status: 'error',
                        message: 'Login or password incorrect!',
                    })
                }
            })
            
           
        }
    }
});

module.exports = router;

