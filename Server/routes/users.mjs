import Router from 'express';
const router = Router();
import Post from '../models/post';
import User from '../models/user';
// const config = require('../config');


router.get('/:userName/:page*?', async (req, res, next) => {
    const {userId, userLogin} = req.session;
    const userName = req.params.userName;
    try {
        const userData = await User.findOne({login: userName}).populate('posts');
        return res.json({
            userData
        });
    } catch (e) {
        throw new Error('Server Error')
    }
});

export default router;