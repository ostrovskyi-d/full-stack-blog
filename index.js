const express = require("express");
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send("started")
});

app.listen(PORT, () => {
    console.log(`___SERVER LISTENING ON PORT ${PORT}___`)
});



