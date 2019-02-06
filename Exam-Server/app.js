var express = require('express');
var questionRouter = require('./routes/questionRoutes');
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
var listener = app.listen(8000, () => {
    console.log('zubi is running on: ' + listener.address().port);
});

app.use('/api', questionRouter);