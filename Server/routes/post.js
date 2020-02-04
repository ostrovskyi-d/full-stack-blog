const express = require('express');
const router = express.Router();
const db = require('../models');


router.get('/add', (req, res) => {
    const {userId: id, userLogin: login} = req.session;
    res.render('index', {
        user: {id, login},
        renderPostAddPage: true
    })
});
router.post('/add', (req, res) => {
    const {postTitle: title, postBody: body} = req.body;
    const fields = [];
    !title && fields.push('post-title');
    !body && fields.push('post-medium-editor');

    console.log(title, body);
    if(!title || !body) {
        res.json({
            resultCode: 102,
            type: 'error',
            message: 'All fields must be filled',
            fields
        })
    } else {
        res.json({
            resultCode: 101,
            type: 'success',
            message: 'Post added successfully',
            fields
        })
    }
});
module.exports = router;