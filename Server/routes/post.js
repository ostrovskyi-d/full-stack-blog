const express = require('express');
const router = express.Router();
const db = require('../models');
const TurndownService = require('turndown');


router.get('/add', (req, res) => {
    const { userId: id, userLogin: login } = req.session;
    if (!id || !login) {
        res.redirect('/')
    } else {
        res.render('post/add', {
            user: { id, login },
            renderPostAddPage: true
        })
    }

});
router.post('/add', async ({
    body: {
        postTitle: title,
        postBody: body
    }, ...req }, res) => {
    const { userLogin: login, userId: id } = req.session;
    const turndownService = new TurndownService();
    const fields = [];
    title.trim().replace(/ +(?= )/g, '');


    !title && fields.push('post-title');
    !body && fields.push('post-medium-editor');
    if (!id || !login) {
        res.render('index', {
            
        })
    } else if (!title || !body) {
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
            author: id
        })
        res.json({
            resultCode: 101,
            type: 'success',
            message: 'Post created'

        })
    }
});
module.exports = router;