const express = require('express');
const app = express();
const menuRouter = require('./routes/menu');
const usersRouter = require('./routes/users');

app.get('/health', (req, res) => {
    res.send("OK");
});

app.use(express.json());
app.use(express.static('public'));
app.use('/api/menuitems', menuRouter);
app.use('/api/users', usersRouter);

// Default route
app.get('*', (req, res) => {
    res.status(404).json({message: 'NOT FOUND'});
  });


module.exports = app;