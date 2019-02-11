var express = require('express');
var questionRouter = require('./routes/questionRoutes');
var authenticationRouter = require('./routes/authenticationRoutes');
var testRouter = require('./routes/testRoutes');

const cors = require('cors');
const bodyParser = require('body-parser');

var app = express();
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.listen(8000, () => {
    console.log('server ba avir');
});

app.use('/api/Question', questionRouter);
app.use('/api/Authentication', authenticationRouter);
app.use('/api/Tests', testRouter);
