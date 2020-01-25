const express = require("express");
const bodyParser = require('body-parser');
const Post = require('./models/post');
const hbs = require("hbs");
const fs = require("fs");
const path = require("path");


const app = express();
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/javascript', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));

// handlebars partials (some kind of components)
hbs.registerPartial('header', fs.readFileSync(__dirname + '/views/layout/header.hbs', 'utf8'));
hbs.registerPartial('footer', fs.readFileSync(__dirname + '/views/layout/footer.hbs', 'utf8'));



app.get('/', (req, res) => {
    res.render("index")
});



module.exports = app;