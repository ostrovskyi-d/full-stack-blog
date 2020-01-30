const app = require('./app');
const config = require('./config');
const database = require('./database');

database().then(info => {
    console.log(`Connected to db ${info.host}:${info.port}/${info.name}`);
    app.listen(config.PORT, () => {
        console.log(`___SERVER LISTENING ON PORT ${config.PORT}___`)
    });
}).catch((err) => {
    console.error(`Unable to connect to database ${err}`);
    process.exit(1);
});





