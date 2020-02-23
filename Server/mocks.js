const faker = require('faker');
const {Post, User} = require('./models');
const author = '5e355b06d6309d27f4488800';
const TurndownService = require('turndown');
// const bcrypt = require('bcryptjs');
// const saltRounds = 10;

// module.exports = () => {
//     // create mock for User with existed id
//     Post.remove()
//         .then(() => {
//             Array.from({length: 20}).forEach(() => {
//                 const turndownService = new TurndownService();
//                 Post.create({
//                     title: faker.lorem.words(5).charAt(0).toUpperCase() + faker.lorem.words(5).slice(1),
//                     body: turndownService.turndown(faker.lorem.words(100)),
//                     author
//                 })
//             }).then(console.log).catch((e) => console.log(e))
//         })
// };

module.exports = async () => {
    await Post.remove();
    Array.from({length: 20}).forEach(() => {
        const turndownService = new TurndownService();
        Post.create({
            title: faker.lorem.words(5).charAt(0).toUpperCase() + faker.lorem.words(5).slice(1),
            body: turndownService.turndown(faker.lorem.words(100)),
            author
        })
    });
    await User.remove();
    User.create({
        login: 'mockUser',
        password: 'mockPassword',
        _id: '5e355b06d6309d27f4488800',

    })


};