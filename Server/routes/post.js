const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/add', (req, res) => {
    const {userId: id, userLogin: login} = req.session;

    res.render('post/add', {

    })
});

module.exports = router;