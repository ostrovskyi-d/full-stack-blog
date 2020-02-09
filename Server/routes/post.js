const express = require('express');
const router = express.Router();
const db = require('../models');
const TurndownService = require('turndown');
const {notAuthorised} = require('./common');
// const Post = require('../')
router.get('/posts/:postName', async (req, res, next) => {
    // const {userId: id, userLogin: login} = req.session;
    const {postName: url} = req.params;
    const {userId: id, userLogin: login} = req.session;
    url.trim().replace(/ +(?=)/g, '');
    try {
        const doc = await db.Post.findOne({url});
        const {url: postUrl, title, body, author} = doc;

        res.render('post/post', {
            postUrl,
            title,
            body,
            standAlone: true,
            author,
            user: {login, id}
        })
    } catch (e) {
        e.status = 404;
        next(e);
        throw new Error("Server error");
    }
});
router.get('/add', (req, res) => {
    const {userId: id, userLogin: login} = req.session;
    notAuthorised(id, login, res, () => {
        res.render('post/add', {
            user: {id, login},
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
                               }, ...req
                           }, res) => {

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