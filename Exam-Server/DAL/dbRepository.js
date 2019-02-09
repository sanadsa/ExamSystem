var sql = require("mssql");
var config = require("./dbconfig");
var bcrypt = require('bcryptjs');


const dbPool = new sql.ConnectionPool(config, err => {
    if (err) {
        //   logger.log("error", "Can't create DB pool " + err + " stack:" + err.stack);
        console.log(err)
    }
});

class DBContext {

    login(email, password, callback) {
        var request = dbPool.request();
        request.input('Email', sql.VarChar(50), email);
        request.execute('spAdmins_login').then(function (req, err) {
            if (bcrypt.compareSync(password, req.recordset[0].Password)) {
                callback(req.recordset[0].Email);
            } else {
                console.log("error", "Execution error calling 'spQuestions_GetAll'");
                callback(null, { message: 'Failed connection' });
            }
        });
    }

    register(admin, callback) {
        var request = dbPool.request();
        var hashpassword = bcrypt.hashSync(admin.password, 10);
        console.log({ hashpassword });
        console.log(admin.password);
        request.input('Email', sql.VarChar(50), admin.email);
        request.input('FirstName', sql.VarChar(50), admin.firstName);
        request.input('LastName', sql.VarChar(50), admin.lastName);
        request.input('Password', sql.VarChar(50), hashpassword);
        request.input('IsActive', sql.Bit, false);
        request.input('OrganizationId', sql.Int, null);

        request.execute('spAdmins_Insert').then(function (req, err) {
            if (err) {
                callback(null, { message: 'Error occured while registeration' })
            } else {
                callback(req);
            }
        });
    }

    updatePassword(admin, callback) {
        var request = dbPool.request();
        var hashpassword = bcrypt.hashSync(admin.password, 10);
        request.input('Password', sql.VarChar(150), hashpassword);
        request.input('Email', sql.VarChar(50), admin.email);
        request.execute('spAdmins_UpdatePassword').then(function (req, err) {
            if (req) {
                callback(req);
            } else if (err) {
                callback(null, { message: 'Error occured ' })
            }
        });

    }
    addQuestion(question, callback) {
        var request = dbPool.request();
        request.input('Title', sql.VarChar(50), question.Title);
        request.input('QuestionType', sql.VarChar(50), question.QuestionType);
        request.input('QuestionContent', sql.VarChar(50), question.QuestionContent);
        request.input('Active', sql.Bit, false);
        request.input('LastUpdate', sql.Date, new Date());

        request.execute('spQuestions_INSERT').then(function (req, err) {
            if (err) {
                callback(null, { message: 'Error occured while inserting question' })
            } else {
                callback(req);
            }
        });
    }

    /**
     * get all questions
     * @param {*} callback 
     */
    getQuestions(callback) {
        var req = dbPool.request();

        req.execute("spQuestions_GetAll", (err, data) => {
            if (err) {
                throw new Error("Exec error calling 'spQuestions_GetAll'");
            }

            callback(data.recordset);
        });
    }

    /**
     * get all tests
     * @param {function to get result} callback 
     */
    getTests(callback) {
        var req = dbPool.request();

        req.execute("spTests_GetAll", (err, data) => {
            if (err) {
                throw new Error("Exec error calling 'spTests_GetAll'");
            }

            callback(data.recordset);
        });
    }
}

module.exports = new DBContext();
