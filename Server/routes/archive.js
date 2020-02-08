const express = require('express');
const router = express.Router();
const {Post} = require('../models');
const config = require('../config');

const posts = async (req, res) => {
    const {userId: id, userLogin: login} = req.session;
    const perPage = +config.PER_PAGE;

    const page = Math.abs(+req.params.page)
    try {
        const posts = await Post.find({}).skip(perPage * page - perPage).limit(perPage);
        const count = await Post.count();
        res.render('index', {
            postsData: posts,
            current: page,
            totalPages: Math.ceil(count / perPage),
            user: {id, login},
            nextPage: page + 1,
            prevPage: page - 1,
        })
    } catch (error) {
        console.error(error)
    }
}
router.get('/', (req, res) => posts(req, res));
router.get('/archive/:page', (req, res) => posts(req, res));

module.exports = router;