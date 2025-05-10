const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const PORT = 3000;

const app = express();
app.use(express.json());

const connect = require('./db/config');
connect();

const authRoutes = require('./routes/authRoutes');

app.use('/', authRoutes);










app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});