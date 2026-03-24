require('dotenv').config();
const express = require('express');
const port = process.env.PORT;
const patientRoutes = require('./routes/patients');
const App = express();
App.use(express.json());
const db = require('./config/db');
App.use('/api/patients',patientRoutes);
 App.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 

module.exports = App;