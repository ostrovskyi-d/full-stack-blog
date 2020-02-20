const faker = require('faker');
const db = require('./models');
const author = '5e355b06d6309d27f4488800';
const TurndownService = require('turndown');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

module.exports = async () => {
    await db.User.remove().then(() =>
        bcrypt.hash('testtest', saltRounds, async (err, hash) => {
            try {
                let user = await db.User.create({
                    login: 'test',
                    password: hash,
                    _id: author
                });
            } catch (e) {
                console.error("Error creating user in mock: ", e);
            }
        })
    );
    await db.Post.remove().then(() => {
        Array.from({length: 20}).forEach(() => {
            const turndownService = new TurndownService();
            db.Post.create({
                title: faker.lorem.words(5).charAt(0).toUpperCase() + faker.lorem.words(5).slice(1),
                body: turndownService.turndown(faker.lorem.words(100)),
                author
            }).then().catch(console.log)
        })
    }).catch(console.log)
};

module.exports = () => {

};