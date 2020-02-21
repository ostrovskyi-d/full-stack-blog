const express = require('express');
const router = express.Router();
const db = require('../models');
const TurndownService = require('turndown');
const {notAuthorised} = require('./common');
router.get('/:postName', async (req, res, next) => {
    const url = req.params.postName.trim().replace(/ +(?= )/g, '');
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;
    console.log(`RECEIVED URI-PARAMS:::►`, req.params);

    if (!url) {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    } else {
        try {
            const post = await db.Post.findOne({
                url
            }).populate('author');

            if (!post) {
                const err = new Error('Not Found');
                err.status = 404;
                next(err);
            } else {
                res.json({
                    resultCode: 101,
                    post: [post],
                    user: {
                        id: userId,
                        login: userLogin
                    }
                });
            }
        } catch (error) {
            console.error(error);
        }
    }
});
router.get('/add', (req, res) => {
    const {userId: id, userLogin: login} = req.session;
    notAuthorised(id, login, res, () => {
        res.json({
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

    if (!title || !body) {
        res.json({
            resultCode: 102,
            type: 'error',
            message: 'All fields must be filled',
        })
    } else {
        await db.Post.create({
            title,
            body: turndownService.turndown(body),
            author: userId
        });
        res.json({
            resultCode: 101,
            type: 'success',
            message: 'PostItem created'
        })
    }
});

router.put('/:postName/edit', async (req, res, next) => {
    const {userId: id, userLogin: login} = req.session;
    const postName = req.params.postName.trim().replace(/ +(?= )/g, '');
    notAuthorised(id, login, res, () => {
        try {
            res.json({
                message: "rout /posts/:postName/edit WORKING GOOOOD)))",
                receivedPost: postName,
            })
        } catch (e) {
            console.log(e)
        }

    });
});


module.exports = router;