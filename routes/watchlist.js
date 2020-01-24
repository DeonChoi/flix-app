const router = require('express').Router();
const verify = require('./verifyToken');

router.post('/add', verify, (req, res) => {
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

router.get('/saved', verify, (req,res) => {

    db.query(`SELECT * FROM watchlist WHERE user_email = '${req.user.user_email}'`, (err, result) => {
        if (err) {
            throw err;
        };
        console.log(result);
        res.send(result);
    });

});

router.delete('/:id', verify, (req,res) => {

    db.query(`DELETE FROM watchlist WHERE id = ${req.params.id}`, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send('Movie removed from watchlist...');
    });

});

module.exports = router;