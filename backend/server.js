const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.info(`Backend listening on port ${PORT}`);
});