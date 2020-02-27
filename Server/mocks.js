const faker = require('faker');
const { Post, User } = require('./models');
const author = '5e355b06d6309d27f4488800';
const TurndownService = require('turndown');
const turndownService = new TurndownService();


module.exports = async () => {
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
                title: faker.lorem.words(5).charAt(0).toUpperCase() + faker.lorem.words(5).slice(1),
                body: turndownService.turndown(faker.lorem.words(100)),
                author
            }
            let createdPost = await Post.create(post);
            console.log(createdPost['_id'])
            await User.findOneAndUpdate({_id: '5e355b06d6309d27f4488800'}, {'$push': {posts: createdPost['_id']}});
            // userToPopulate.updateOne();
        }

    } catch (error) {
        throw new Error('Server Error', error)
    }
};