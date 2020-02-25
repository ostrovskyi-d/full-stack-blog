import lorem from 'faker';
import Post from './models/post';
import User from './models/user';
const author = '5e355b06d6309d27f4488800';
import TurndownService from 'turndown';
const turndownService = new TurndownService();


export const mocks = async  () => {
    try {
        await User.remove();
        
        User.create({
            login: 'mockUser',
            password: 'mockPassword',
            _id: '5e355b06d6309d27f4488800'
        });
        await Post.remove();
        for (const ignored of Array.from({length: 20})) {
            let post = {
                title: lorem.words(5).charAt(0).toUpperCase() + lorem.words(5).slice(1),
                body: turndownService.turndown(lorem.words(100)),
                author
            };
            let createdPost = await Post.create(post);
            console.log(createdPost['_id']);
            await User.findOneAndUpdate({_id: '5e355b06d6309d27f4488800'}, {'$push': {posts: createdPost['_id']}});
            // userToPopulate.updateOne();
        }


    } catch (error) {
        throw new Error('Server Error', error)
    }
};