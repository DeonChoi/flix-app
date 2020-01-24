require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// const host = process.env.DB_HOST || 'localhost';
// const user = process.env.DB_USER || 'root';
// const password = process.env.DB_PASS || '';
// const database = process.env.DB_DATABASE || '';

const db = mysql.createConnection({
    host: 'us-cdbr-iron-east-05.cleardb.net',
    user: 'bc2a694101f054',
    password: 'eb9e36f2',
    database: 'heroku_8d7b752a20bb96e'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

const userRouter = require('./routes/user');
const watchlistRouter = require('./routes/watchlist');

app.use('/user', userRouter);
app.use('/watchlist', watchlistRouter);


if(process.env.NODE_ENV === 'production') {

    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname+'/client/build/index.html'));
    });

};


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});