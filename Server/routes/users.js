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
    const userData = await User.findOne({login: userName}).populate('posts');

    res.json({
        userData
    });

    console.log('----USER----', user);
});

module.exports = router;