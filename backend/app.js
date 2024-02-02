const express = require('express');
const app = express();
const menuRouter = require('./routes/menu');

app.get('/health', (req, res) => {
    res.send("OK");
});

app.use(express.json());
app.use((req, res, next) => {
    console.log('Incoming Request:', req.method, req.url, req.body);
    next();
});
app.use('/api/menuitems', menuRouter);


module.exports = app;