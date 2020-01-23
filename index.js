const express = require("express");
// const hbs = require('hbs');
const bodyParser = require('body-parser');

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
    res.render("index", {
        title: "Home",
        link: "/create",
        list: store.arr,
        loginPage: '/login',
        isAdmin: store.isAdmin,
        name: admin.email
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
    // res.render("create");
    if(store.arr.includes(req.body.text)) {
        res.send("Already exist this list item")
    } else {
        store.arr.push(req.body.text);
        res.redirect('/')
    }
    console.log(req.body);
});




















const PORT = 3000;
app.listen(PORT, () => {
    console.log(`___SERVER LISTENING ON PORT ${PORT}___`)
});



