var express = require('express');
var router = express.Router();
var mainDB = require('../DAL/dbRepository');

router.post('/createTest', function (req, res) {
    mainDB.createTest(req.body, function (respone, err) {
        if (respone) {
            const testId= respone;
            mainDB.addQuestionsToTest(req.body.questions, testId, function (result, err) {
                if (result) {
                    res.sendStatus(200).send(req.body);
                } else {
                    res.sendStatus(400).send(err);
                }
            });
        } else {
            res.sendStatus(400).send(err);
        }
    });
});


module.exports = router;
