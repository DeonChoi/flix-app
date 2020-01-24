const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation }= require('./validation');

router.post('/register', (req,res) => {

    const {error} = registerValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    };

    db.query(
        `SELECT * FROM users WHERE email = '${req.body.email}'`, 
        async (err, result) => {
            db.release();
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
                    db.release();
                    if (err) {
                        throw err;
                    }
                    console.log(result);
                    res.send('User added...');
                });
            };
        
        });

});

router.post('/login', (req,res) => {

    const {error} = loginValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    };

    db.query(
        `SELECT * FROM users WHERE email = '${req.body.email}'`,
        (err, result) => {
            db.release();
            if (err) {
                throw err;
            };
            if (result.length === 0) {
                return res.status(400).send('Email is not valid');
            } else {
                db.query(
                    `SELECT password FROM users WHERE email = '${req.body.email}'`, async (err, result) => {
                        db.release();
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

module.exports = router;