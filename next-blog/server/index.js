const routes = require('./routes');
const config = require('./config');
const express = require("express");
const next = require('next')
const dev = process.env.NODE_DEV !== 'production' //true false
const nextApp = next({dev})
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require("path");
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mocks = require('./mocks');
const cors = require('cors');


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
mongoose.connect(config.MONGO_URL);

// EXPRESS
nextApp.prepare().then(() => {
  // express code here
  const app = express();

// Middlewares
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(session({
    secret: config.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    }),
    unset: 'destroy'
  }));
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  let corsOptions = {
    origin: 'http://localhost:3000',
    // some legacy browsers (IE11, various SmartTVs) choke on 204,
    optionsSuccessStatus: 200,
    credentials: true
  };
  app.use(cors(corsOptions));

// Routes
  app.use('/', routes.archive);
  app.use('/api/auth', routes.auth);
  app.use('/posts', routes.post);
  app.use('/users', routes.users);
  app.use('/test', routes.test);

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


})
module.exports = nextApp;
