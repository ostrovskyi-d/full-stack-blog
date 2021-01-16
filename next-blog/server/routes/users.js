const express = require('express');
const router = express.Router();
const {
    Post,
    User
} = require('../models');
// const config = require('../config');

router.get('/users', async (req, res, next) => {
    const {userId, userLogin} = req.session;
    try {
        const users = await User.find({});
        return res.json({
            users
        })
    } catch (e) {
        throw new Error('Server Error')
    }
})

router.get('/:userName/:page*?', async (req, res, next) => {
    const {userId, userLogin} = req.session;
    const userName = req.params.userName;
    try {
        const userData = await User.findOne({login: userName}).populate('posts');
        return res.json({
            userData
        });
    } catch (e) {
        throw new Error('Server Error')
    }
});

module.exports = router;
