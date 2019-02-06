var express = require('express');
var router = express.Router();
var mainDB = require('../DAL/dbRepository')

router.post('/createQuestion', function (req, res, next) {
    console.log(req.body);
    mainDB.executeInDB(data => {
        res.json(data);
    })
});

router.post('/createQuestion', function (req, res, next) {
    console.log(req.body);
    mainDB.executeInDB(data => {
        res.json(data);
    })
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
