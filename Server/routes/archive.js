const express = require('express');
const router = express.Router();
const { Post } = require('../models');
const config = require('../config');

router.get('/:page', async (req, res) => {
    const { userId, userLogin } = req.session;
    const perPage = +config.PER_PAGE;
    const page = req.params.page || 1;
    try {
        const posts = await Post.find({}).skip(+perPage * page - perPage).limit(perPage)
        const count = await Post.count()
        res.render('index', {
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
        console.error(error)
    }


})

module.exports = router