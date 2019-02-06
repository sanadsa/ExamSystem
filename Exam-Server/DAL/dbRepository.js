var sql = require("mssql");
var config = require("./dbconfig");

const dbPool = new sql.ConnectionPool(config, err => {
    if (err) {
        logger.log("error", "Can't create DB pool " + err + " stack:" + err.stack);
        console.log(err)
    }
});

class DBContext {
    executeInDB(callback) {
        console.log(callback);
        var req = dbPool.request();
        console.log(req);
       // req.input("FName", sql.NVarChar(50), "Jerry");
        req.execute("spQuestions_GetAll", (err, data) => {
            if (err) {
                console.log("error", "Execution error calling 'spQuestions_GetAll'");
            }
            else {
                console.log(data.recordset);
                callback(data.recordset);
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
