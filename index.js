const express = require("express");
// const hbs = require('hbs');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({extended: true}));


const arr = ["NodeJS", "Express", "Handlebars"];
app.get('/', (req, res) => {
    res.render("index", {
        title: "Home",
        link: "/create",
        list: arr
    })
});
app.get('/create', (req, res) => {
    res.render('create');
});
app.post('/create', (req, res) => {
    // res.render("create");
    if(arr.includes(req.body.text)) {
        res.send("Already exist this list item")
    } else {
        arr.push(req.body.text);
        res.redirect('/')
    }
    console.log(req.body);
});

const PORT = 3000;



















app.listen(PORT, () => {
    console.log(`___SERVER LISTENING ON PORT ${PORT}___`)
});



