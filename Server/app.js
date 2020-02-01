const express = require("express");
const bodyParser = require('body-parser');
const Post = require('./models/post');
const hbs = require("hbs");
const fs = require("fs");
const path = require("path");
const mongoose = require('mongoose');
const config = require('./config');
const routes = require('./routes');
const session = require('express-session');
const connectMongo = require('connect-mongo');


// Database
mongoose.Promise = global.Promise;
mongoose.set('debug', config.IS_PRODUCTION);

mongoose.connection
    .on('error', error => console.error(error))
    .on('close', () => console.log('Database connection closed.'))
    .once('open', () => {
        const info = mongoose.connections[0];
        console.log(`Connected to db ${info.host}:${info.port}/${info.name}`);
    });

mongoose.connect(config.MONGO_URL, {useMongoClient: true});

// EXPRESS

const app = express();
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/javascript', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));
app.use(session({
    secret: config.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));
// handlebars partials (some kind of components)
const partials = [
    'header',
    'footer',
    'sidebar',
];

partials.forEach(partial => {
    hbs.registerPartial(partial, fs.readFileSync(__dirname + `/views/layout/${partial}.hbs`, 'utf8'))
});

// Routes

app.get('/', (req, res) => {
    console.log(routes.auth.params);
    res.render("index", {
        
    })
});
// app.get('/api/auth/register', (req,res) => {
//     res.render('./layout/sidebar', {
        
//     })
// })

app.use('/api/auth', routes.auth);

// 404
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handler
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.render('error', {
        message: error.message,
        error: !config.IS_PRODUCTION ? error : {},
        title: "Oops..."
    })
});

app.listen(config.PORT, () => {
    console.log(`___SERVER LISTENING ON PORT ${config.PORT}___`)
});