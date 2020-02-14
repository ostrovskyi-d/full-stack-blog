const Post = require('./models/post');
const routes = require('./routes');
const config = require('./config');

const express = require("express");
const bodyParser = require('body-parser');
const hbs = require("hbs");
const fs = require("fs");
const path = require("path");
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mocks = require('./mocks');
const cors = require('cors');

// CORS OPTIONS
const whitelist = ['http://localhost:3000', 'http://localhost:3001'];
let corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },credentials: true
};

// Database
mongoose.Promise = global.Promise;
mongoose.set('debug', config.IS_PRODUCTION);

mongoose.connection
    .on('error', error => console.error(error))
    .on('close', () => console.log('Database connection closed.'))
    .once('open', () => {
        const info = mongoose.connections[0];
        console.log(`Connected to db ${info.host}:${info.port}/${info.name}`);
        mocks()
    });
mongoose.connect(config.MONGO_URL, {useMongoClient: true});


// EXPRESS

const app = express();

app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/javascript', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));
app.use(cors());

app.use(session({
    secret: config.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));

// Routes
app.get('/', cors(corsOptions), (req, res, next) => {
    const {userId: id, userLogin: login} = req.session;
    console.log(id, login);
    Post.find({}, (err, docs) => {
        if (!id || !login) {
            res.json({
                resultCode: 102,
                message: 'Not authorised',
                posts: docs
            })
        } else if (err) {
            res.send("error")
        } else {
            res.json({
                resultCode: 101,
                message: "Authorised",
                user: {id, login},
                posts: docs,
            });
        }
    });
});
//// Auth
app.use('/api/auth', routes.auth);
//// Post
app.use('/post', routes.post);
// 
app.use('/archive', routes.archive);


// 404
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handler
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
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
hbs.registerHelper("log", function (something) {
    console.log(something);
});
hbs.registerHelper('iff', (a, operator, b, opts) => {
    let bool = false;
    switch (operator) {
        case '==':
            bool = a === b;
            break;
        case '>':
            bool = a > b;
            break;
        case '<':
            bool = a < b;
            break;
        default:
            throw "Unknown operator " + operator;
    }

    if (bool) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});
// -----------------------------------------------
// handlebars partials (some kind of components)
// RECURSIVELY AUTO-REGISTER PARTIALS
const dir = path.join(__dirname, 'views');
const walkSync = (dir, filelist = []) => {
    fs.readdirSync(dir).forEach(file => {

        filelist = fs.statSync(path.join(dir, file)).isDirectory()
            ? walkSync(path.join(dir, file), filelist)
            : filelist.concat(path.join(dir, file));

    });
    return filelist;
};
let filelist = walkSync(dir);
if (filelist.length > 0) {
    filelist.forEach(filename => {
        let matches = /^([^.]+).hbs$/.exec(path.basename(filename));
        if (!matches) {
            return;
        }
        let name = matches[1];
        // console.log(name);
        let template = fs.readFileSync(filename, 'utf8');
        hbs.registerPartial(name, template);
    });
}