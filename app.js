const express = require("express");
const bodyParser = require('body-parser');
const Post = require('./models/post');


const app = express();
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({extended: true}));

const admin = {
    email: "azatot2014@gmail.com",
    pass: '123123'
};

const store = {
    arr: ["NodeJS", "Express", "Handlebars"],
    isAdmin: false
};

app.get('/', (req, res) => {
    Post.find({}).then(posts => {
        res.render("index", {
            title: "Home",
            link: "/create",
            list: posts,
            loginPage: '/login',
            isAdmin: store.isAdmin,
            name: admin.email
        })
    })

});
app.get('/create', (req, res) => {
    res.render('create');
});
app.get('/login', (req, res) => {
    res.render('login')
});
app.post('/login', (req, res) => {
    if(req.body.email === admin.email && req.body.pass === admin.pass) {
        store.isAdmin = true;
        res.redirect('/')
    }
});

app.post('/create', (req, res) => {
    const {title, body} = req.body;
    if(store.arr.includes(req.body.text)) {
        res.send("Already exist this list item")
    } else {
        Post.create({
            title: title,
            body: body
        }).then(post => {
            console.log(post.id);
        });
        res.redirect('/')
    }
    console.log(req.body);
});

module.exports = app;