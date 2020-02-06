const express = require("express");
const bodyParser = require('body-parser');
const fs = require("fs");
const path = require("path");
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const Post = require('./models/post');
const routes = require('./routes');
const config = require('./config');



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
mongoose.connect(config.MONGO_URL, { useMongoClient: true });


// EXPRESS

const app = express();
app.set('view engine', 'ejs');
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


// Routes
app.get('/', (req, res, next) => {
    const { userId: id, userLogin: login } = req.session;
    Post.find({}, function (err, docs) {
        if (err) return console.log(err);
        res.render("index", {
            user: { id, login },
            renderPostsPage: true,
            postData: docs
        });
    });    
});
//// Auth
app.use('/api/auth', routes.auth);
//// Post
app.use('/post', routes.post);



















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
    });
    // next()
});

app.listen(config.PORT, () => {
    console.log(`___SERVER LISTENING ON PORT ${config.PORT}___`)
});

// HBS-HELPERS


// -----------------------------------------------
// handlebars partials (some kind of components)
// RECURSIVELY AUTO-REGISTER PARTIALS
