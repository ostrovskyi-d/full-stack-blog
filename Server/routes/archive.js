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
        // Created promises-variables for parralel operations
        const postsPromise = Post.find({})
            .skip(perPage * reqPage - perPage)
            .limit(perPage)
            .populate('author')
            .sort({
                createdAt: -1
            })
        const countPromise = Post.count();
        const posts = await postsPromise;
        const count = await countPromise;
        if (userId && userLogin) {
            res.json({
                resultCode: 101,
                message: 'Authorised',
                posts: posts,
                current: reqPage,
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
                totalPages: Math.ceil(count / perPage),
                currentPage: reqPage,
                totalPages: Math.ceil(count / perPage),

            })
        }

    } catch (error) {
        console.error(`Server Error: `, error)
    }
}
router.get('/archive/:page', (req, res) => posts(req, res));
router.get('/', (req, res) => posts(req, res));
router.get('/posts/:postName', async (req, res, next) => {
    const url = req.params.postName.trim().replace(/ +(?= )/g, '');
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;

    if (!url || url === undefined || url === null) {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    } else {
        try {
            const post = await Post.findOne({
                url
            });

            if (!post) {
                const err = new Error('Not Found');
                err.status = 404;
                next(err);
            } else {
                res.json({
                    resultCode: 101,
                    post,
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
})
// router.get('/:page', async (req, res) => {
//     const { userId, userLogin } = req.session;
//     const perPage = +config.PER_PAGE;
//     const page = req.params.page || 1;
//     try {
//         const gettingPosts =  Post.find({}).skip(+perPage * page - perPage).limit(perPage);
//         const gettingCount = Post.count();
//         const posts = await gettingPosts;
//         const count = await gettingCount;

//         res.json( {
//             postData: posts,
//             current: page,
//             totalPages: Math.ceil(count / perPage),
//             user: {
//                 id: userId,
//                 login: userLogin
//             },
//             renderPostsPage: true
//         })
//     } catch (error) {
//         throw new Error(error)
//     }
// });


// router.get('/', (req, res, next) => {
//     const {userId: id, userLogin: login} = req.session;
//     console.log(req.session);
//     Post.find({}, (err, docs) => {
//         if (!id || !login) {
//             res.json({
//                 resultCode: 102,
//                 message: 'Not authorised',
//                 posts: docs
//             })
//         } else if (err) {
//             res.send(err)
//         } else {
//             res.json({
//                 resultCode: 101,
//                 message: "Authorised",
//                 user: {id, login},
//                 posts: docs,
//             });
//         }
//     });
// });

module.exports = router;