var express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var nodemailer = require('nodemailer');
var router = express.Router();
var mainDB = require('../DAL/dbRepository')



router.get('/restorePassword/:email', function (req, res) {
    const email = req.params['email'];
    restorePassword(email);
    res.send({ name: email });
});



router.post('/updatePassword', function (req, res) {
    console.log(req.body);
    res.send({ name: req.body.password });
});



router.get('/api/login/:email/:password', function (req, res) {
    const email = req.params['email'];
    const password = req.params['password'];
    console.log(email);
    var result = mainDB.login(email, password);
    // var user = {
    //     email: email,
    //     password: password
    // }
    // console.log(user);
    //res.send(JSON.stringify(user));
});

router.post('/api/register', function (req, res) {
    console.log(req.body);
    res.send('register okk');
});

function restorePassword(email) {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'sanadassdsad@gmail.com',
            pass: 'omer2803'
        }
    });

    var mailOptions = {
        from: 'sanadassdsad@gmail.com',
        to: email,
        subject: 'Forgot password',
        html: '<p>Click <a href="http://localhost:4200/restorePassword;email=' + email + '">here</a> to reset your password</p>'

    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = router;
