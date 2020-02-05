const express = require('express');
const router = express.Router();
const db = require('../models');
const TurndownService = require('turndown');


router.get('/add', (req, res) => {
    const { userId: id, userLogin: login } = req.session;
    res.render('index', {
        user: { id, login },
        renderPostAddPage: true
    })
});
router.post('/add', async ({
    body: {
        postTitle: title,
        postBody: body
    }, ...req }, res) => {

    title.trim().replace(/ +(?=)/g, '');
    const turndownService = new TurndownService();
    const { userLogin: login } = req.session;
    const fields = [];
    const author = login;
    
    !title && fields.push('post-title');
    !body && fields.push('post-medium-editor');

    console.log(title, body);
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
            author
        })
        res.json({
            resultCode: 101,
            type: 'success',
            message: 'Post created'

        })
    }
});
module.exports = router;