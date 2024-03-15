const express = require('express');
const cors = require('cors');

const menuRouter = require('./routes/menu');
const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');

const app = express();

app.get('/health', (req, res) => {
  res.send("OK");
});

app.use(express.json());
app.use(express.static('public'));
app.use(cors(/* {
  origin: [
    'http://localhost:5173/',
    'http://172.16.5.16:5173/'
  ]
} */));
app.use('/api/menuitems', menuRouter);
app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);

// Default route
app.get('*', (req, res) => {
  res.status(404).json({ message: 'NOT FOUND' });
});


module.exports = app;