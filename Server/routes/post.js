const express = require('express');
const router = express.Router();
const db = require('../models');
const TurndownService = require('turndown');
const { notAuthorised } = require('./common');

router.get('/add', (req, res) => {
    const { userId: id, userLogin: login } = req.session;
    notAuthorised(id, login, res, () => {
        res.render('post/add', {
            user: { id, login },
            renderPostAddPage: false
        })
    })
});
router.post('/add', async ({
    body: {
        postTitle: title,
        postBody: body, 
    },
    session: {
        userId,
        userLogin
    }, ...req }, res) => {

    title.trim().replace(/ +(?=)/g, '');
    const turndownService = new TurndownService();
    // const { userLogin: login } = req.session;
    const fields = [];

    !title && fields.push('post-title');
    !body && fields.push('post-medium-editor');

    if (!title || !body) {
        res.json({
            resultCode: 102,
            type: 'error',
            message: 'All fields must be filled',
            fields
        })
    } else {
        await db.Post.create({
            title,
            body: turndownService.turndown(body),
            author: userId
        })
        res.json({
            resultCode: 101,
            type: 'success',
            message: 'Post created'

        })
    }
});
module.exports = router;