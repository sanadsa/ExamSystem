var express = require('express');
var router = express.Router();
var mainDB = require('../DAL/dbRepository')

router.post('/createQuestion', function (req, res) {
    console.log(req.body);
    mainDB.addQuestion(req.body, function (result, err) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).send();
        }
    });
});

router.get('/questions', function (req, res, next) {
    mainDB.getQuestions(data => {
        res.json(data);
    })
});

router.get('/tests', function (req, res, next) {
    mainDB.getTests(data => {
        res.json(data);
    })
});

module.exports = router;
