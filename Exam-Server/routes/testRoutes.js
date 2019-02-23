var express = require('express');
var router = express.Router();
var mainDB = require('../DAL/dbRepository');

router.post('/createTest', function (req, res) {
    mainDB.createTest(req.body, function (respone, err) {
        if (respone) {
            const testId = respone;
            mainDB.addQuestionsToTest(req.body.questions, testId, function (result, err) {
                if (result) {
                    res.status(200).send(result);
                } else {
                    res.status(400).send(err);
                }
            });
        } else {
            res.status(400).send(err);
        }
    });
});

router.get('/getTestsByField/:field', function (req, res) {
    const field = req.params['field'];
    console.log(field);

    mainDB.getTestsByField(field, function (result, error) {
        if (result) {
            res.status(200).send(result);
        } else if (error) {
            res.status(400).send(error);
        }
    })

});

router.get('/getTestById/:id/:field', function (req, res) {
    const testID = req.params['id'];
    const field = req.params['field'];
    console.log(field);

    mainDB.getTestById(testID,field, function (result, error) {
        if (result) {
            res.status(200).send(result);
        } else if (error) {
            res.status(400).send(error);
        }
    })

});

router.get('/getExam/:id', function (req, res) {
    const testID = req.params['id'];
    mainDB.getExam(testID, function (result, error) {
        if (result) {
            res.status(200).send(result);
        } else if (error) {
            res.status(400).send(error);
        }
    })
});

router.get('/getNextQuestion/', function (req, res) {
    mainDB.getNextQuestion(function (result, error) {
        if (result) {
            res.status(200).send(result);
        } else if (error) {
            res.status(400).send(error);
        }
    })
});


module.exports = router;
