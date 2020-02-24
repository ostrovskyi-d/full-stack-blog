const express = require('express');
const router = express.Router();
const {
    Post,
    User
} = require('../models');
// const config = require('../config');


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