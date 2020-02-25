import router from './routes';
import { IS_PRODUCTION, MONGO_URL, SESSION_SECRET, PORT } from './config';
import {Promise, set, connection, connect, connections} from 'mongoose';
import cookieParser from 'cookie-parser';
import express from "express";
import bodyParser from 'body-parser';
import path from "path";
// import mongoose from 'mongoose'
import session from 'express-session';
import connectMongo from 'connect-mongo';
const MongoStore = connectMongo(session)
import mocks from './mocks';
import cors from 'cors';
const __dirname = path.resolve();

// Database
(() => {
    Promise = global.Promise;
    set('debug', IS_PRODUCTION);

    connection
        .on('error', error => console.error(error))
        .on('close', () => console.log('Database connection closed.'))
        .once('open', () => {
            const info = connections[0];
            console.log(`Connected to db ${info.host}:${info.port}/${info.name}`);
            // mocks()
        });
    connect(MONGO_URL, { useMongoClient: true });
})()



// EXPRESS
const app = express();


// Middlewares
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: connection
    }),
    unset: 'destroy'
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let corsOptions = {
    origin: 'http://localhost:3000',
    // some legacy browsers (IE11, various SmartTVs) choke on 204,
    optionsSuccessStatus: 200,
    credentials: true
};
app.use(cors(corsOptions));

// Routes
app.use('/', router.archive);
app.use('/api/auth', router.auth);
app.use('/posts', router.post);
app.use('/users', router.users);
app.use('/test', router.test);

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
        error: !IS_PRODUCTION ? error : {},
        title: "Oops..."
    });
    // next()
});

app.listen(PORT, () => {
    console.log(`___SERVER LISTENING ON PORT ${PORT}___`)
});


export default app;