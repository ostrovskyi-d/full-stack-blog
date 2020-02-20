const express = require('express');
const router = express.Router();
const {
    Post
} = require('../models');
const config = require('../config');


const posts = async (req, res) => {
    const {
        userId,
        userLogin
    } = req.session;
    const perPage = +config.PER_PAGE;
    const reqPage = req.params.page || 1;
    try {
        // Created promises-variables for parallel operations
        const postsPromise = Post.find({})
            .skip(perPage * reqPage - perPage)
            .limit(perPage)
            .populate('author')
            .sort({
                createdAt: -1
            });
        const countPromise = Post.count();
        const posts = await postsPromise;
        const count = await countPromise;

        if (userId && userLogin) {
            res.json({
                resultCode: 101,
                message: 'Authorised',
                posts: posts,
                perPage: perPage,
                totalPostsCount: count,
                currentPage: Number(reqPage),
                totalPages: Math.ceil(count / perPage),
                user: {
                    id: userId,
                    login: userLogin
                },
            })
        } else {
            res.json({
                resultCode: 102,
                message: 'Not authorised',
                posts: posts,
                perPage: perPage,
                totalPostsCount: count,
                currentPage: Number(reqPage),
                totalPages: Math.ceil(count / perPage),
            })
        }

    } catch (error) {
        console.error(`Server Error: `, error)
    }
};
router.get('/archive/:page', (req, res) => posts(req, res));
router.get('/', (req, res) => posts(req, res));
router.get('/posts/:postName', async (req, res, next) => {
    const url = req.params.postName.trim().replace(/ +(?= )/g, '');
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;

    if (!url) {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    } else {
        try {
            const post = await Post.findOne({
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

module.exports = router;