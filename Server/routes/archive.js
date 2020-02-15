const express = require('express');
const router = express.Router();
const { Post } = require('../models');
const config = require('../config');

router.get('/:page', async (req, res) => {
    const { userId, userLogin } = req.session;
    const perPage = +config.PER_PAGE;
    const page = req.params.page || 1;
    try {
        const gettingPosts =  Post.find({}).skip(+perPage * page - perPage).limit(perPage);
        const gettingCount = Post.count();
        const posts = await gettingPosts;
        const count = await gettingCount;

        res.json( {
            postData: posts,
            current: page,
            totalPages: Math.ceil(count / perPage),
            user: {
                id: userId,
                login: userLogin
            },
            renderPostsPage: true
        })
    } catch (error) {
        throw new Error(error)
    }
});
router.get('/', (req, res, next) => {
    const {userId: id, userLogin: login} = req.session;
    console.log(req.session);
    Post.find({}, (err, docs) => {
        if (!id || !login) {
            res.json({
                resultCode: 102,
                message: 'Not authorised',
                posts: docs
            })
        } else if (err) {
            res.send(err)
        } else {
            res.json({
                resultCode: 101,
                message: "Authorised",
                user: {id, login},
                posts: docs,
            });
        }
    });
});

module.exports = router;