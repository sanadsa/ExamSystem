var express = require('express');
var router = express.Router();
var mainDB = require('../DAL/dbRepository');

router.post('/createTest', function (req, res) {
    console.log(req.body);
    
    mainDB.createTest(req.body,function(respone,err){
        if (respone) {
            res.status(200).send(req.body);
        }else{
            res.status(400).send(err);
        }
    });
});