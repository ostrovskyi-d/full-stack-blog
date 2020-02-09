const faker = require('faker');
const models = require('./models');
const author = '5e355b06d6309d27f4488800';
const TurndownService = require('turndown');

module.exports = () => {
        Array.from({length: 20}).forEach(() => {
            const turndownService = new TurndownService(); 
            models.Post.create({
                title: faker.lorem.words(5),
                body: turndownService.turndown(faker.lorem.words(100)),
                author
            }).then().catch(console.log)
        }) 
};