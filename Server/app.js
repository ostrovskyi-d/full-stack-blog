const express = require("express");
const bodyParser = require('body-parser');
const Post = require('./models/post');
const hbs = require("hbs");
const fs = require("fs");
const path = require("path");


const app = express();
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/javascript', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));

// handlebars partials (some kind of components)
const partials = [
    'header',
    'footer',
    'sidebar',
];

partials.forEach(partial => {
    hbs.registerPartial(partial, fs.readFileSync(__dirname + `/views/layout/${partial}.hbs`, 'utf8'))
})


app.get('/', (req, res) => {
    res.render("index", {
        // title: title
    })
});



module.exports = app;