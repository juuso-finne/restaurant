const express = require('express');
const app = express();
const menuRouter = require('./routes/menu');

app.get('/health', (req, res) => {
    res.send("OK");
});

app.use('/api/menu', menuRouter);

module.exports = app;