const express = require('express');
const router = express.Router();
const { User, Post } = require('../models');
const TurndownService = require('turndown');
const { notAuthorised } = require('./common');
const error = (res) => {
    return res.json({
        resultCode: 102,
        type: 'error',
        message: 'All fields must be filled',
    })
};

router.get('/my-posts', async (req, res, next) => {
    // db.find({})
});

router.get('/add', (req, res) => {
    const { userId: id, userLogin: login } = req.session;
    if (!id || !login) {
        res.json("FALSE")
    } else {
        notAuthorised(id, login, res, () => {
            res.json({
                user: { id, login },
            })
        })
    }

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
    if (!title || !body) error(res);
    else {
        title.trim().replace(/ +(?=)/g, '');
        const turndownService = new TurndownService();
        try {
            console.log(`Body:::: `, body);
            let newPost = await Post.create({
                title,
                body: turndownService.turndown(body),
                author: userId,
            });
            await User.findOneAndUpdate({ _id: userId }, { "$push": { posts: newPost } });
            res.json({
                resultCode: 101,
                type: 'success',
                message: 'PostItem created'
            });
        } catch (e) {error(res)}
    }
});

router.put('/:postName/edit', async (req, res, next) => {
    const { userId: id, userLogin: login } = req.session;
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
