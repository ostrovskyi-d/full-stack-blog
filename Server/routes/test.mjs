import Router from 'express';
const router = Router();
import User from '../models/user';
import Post from '../models/post';
import bcrypt from 'bcryptjs';


router.get('/:userName', async (req, res) => {
    const userName = req.params.userName;
    const userData = await User.findOne({login: userName}).populate('posts');

    res.json({
        userData
    });
    res.json({
        userData
    })
});

export default router;