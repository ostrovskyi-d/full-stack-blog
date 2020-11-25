const express = require('express');
const router = express.Router();
const {User, Post} = require('../models');
const bcrypt = require('bcryptjs');


router.get('/:userName', async (req, res) => {
    const userName = req.params.userName;
    const userData = await User.findOne({login: userName}).populate('posts');

    res.json({
        userData
    });
    res.json({
        userData
    })
});

module.exports = router;