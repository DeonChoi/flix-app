require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mysql = require('mysql');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('./routes/verifyToken');

const { registerValidation, loginValidation }= require('./routes/validation');


const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const host = process.env.DB_HOST || 'localhost';
const user = process.env.DB_USER || 'root';
const password = process.env.DB_PASS || '';
const database = process.env.DB_DATABASE || '';

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

app.post('/user/register', (req,res) => {

    const {error} = registerValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    };

    db.query(
        `SELECT * FROM users WHERE email = '${req.body.email}'`, 
        async (err, result) => {
            if (err) {
                throw err;
            };
            if (result.length > 0){
                return res.send('Email already registered...');
            } else {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.password, salt);

                const newUser = {
                    firstname: req.body.firstName,
                    lastname: req.body.lastName,
                    email: req.body.email,
                    password: hashedPassword
                };

                db.query(`INSERT INTO users SET ?`, newUser, (err, result) => {
                    if (err) {
                        throw err;
                    }
                    console.log(result);
                    res.send('User added...');
                });
            };
        
        });

});

app.post('/user/login', (req,res) => {

    const {error} = loginValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    };

    db.query(
        `SELECT * FROM users WHERE email = '${req.body.email}'`,
        (err, result) => {
            if (err) {
                throw err;
            };
            if (result.length === 0) {
                return res.status(400).send('Email is not valid');
            } else {
                db.query(
                    `SELECT password FROM users WHERE email = '${req.body.email}'`, async (err, result) => {
                        if (err) {
                            throw err;
                        }
                        // console.log(typeof result);
                        // res.send(result[0].password);
                        const validPass = await bcrypt.compare(req.body.password, result[0].password);
                        if (!validPass) {
                            return res.status(400).send('Invalid password');
                        };

                        const token = jwt.sign({user_email: req.body.email},process.env.TOKEN_SECRET);
                        res.header('auth-token', token).send(token);
                        // res.send('Logged In');
                    });
               
            };
    });

});

app.post('/watchlist/add', verify, (req, res) => {
    console.log(req.user.user_email);
    console.log(req.body);

    db.query(`SELECT * FROM watchlist WHERE user_email = '${req.user.user_email}' AND movieID = ${req.body.movieID}`, (err, result) => {
        if (err) {
            throw err;
        };
        if (result.length > 0) {
            return res.send('Movie already added to watchlist...');
        } else {
            const newMovie = {
                movieID: req.body.movieID,
                title: req.body.title,
                release_date: req.body.release_date,
                vote_average: req.body.vote_average,
                vote_count: req.body.vote_count,
                overview: req.body.overview,
                poster_path: req.body.poster_path,
                user_email: req.user.user_email
            };

            db.query(`INSERT INTO watchlist SET ?`, newMovie, (err, result) => {
                if (err) {
                    throw err;
                }
                console.log(result);
                res.json('Movie added to watchlist...');
            });
        };
    });

});

app.get('/watchlist/movies', verify, (req,res) => {

    db.query(`SELECT * FROM watchlist WHERE user_email = '${req.user.user_email}'`, (err, result) => {
        if (err) {
            throw err;
        };
        console.log(result);
        res.send(result);
    });

});

app.delete('/watchlist/:id', verify, (req,res) => {

    db.query(`DELETE FROM watchlist WHERE id = ${req.params.id}`, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send('Movie removed from watchlist...');
    });

});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});