require('dotenv').config();
const express = require('express');
const port = process.env.PORT;

const App = express();
App.use(express.json());
const db = require('./config/db');

 App.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 

module.exports = App;