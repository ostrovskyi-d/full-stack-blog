const faker = require('faker');
const models = require('./models');
const author = '5e355b06d6309d27f4488800';
const TurndownService = require('turndown');

module.exports = () => {
    models.Post.remove().then(() => {
        Array.from({length: 20}).forEach(() => {
            const turndownService = new TurndownService(); 
            models.Post.create({
                    title: faker.lorem.words(5).charAt(0).toUpperCase() + faker.lorem.words(5).slice(1),
                body: turndownService.turndown(faker.lorem.words(100)),
                author
            }).then().catch(console.log)
        }) 
    }).catch(console.log)
}