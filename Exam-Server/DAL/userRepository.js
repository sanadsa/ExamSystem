var sql = require("mssql");
var config = require("./dbconfig");
const dbPool = new sql.ConnectionPool(config, err => {
    if (err) {
        console.log('dbPool Error: ' + err);
    }
});


class DBContext {
    /**
     * Add user to db
     * @param {*response function} callback 
     */
    addUser(user, callback) {
        console.log("in add user repo");
        console.log(user);
        var request = dbPool.request();
        request.input('FirstName', sql.VarChar(50), user.firstName);
        request.input('LastName', sql.VarChar(50), user.lastName);
        request.input('Email', sql.VarChar(50), user.email);
        request.input('Phone', sql.VarChar(50), user.phone);

        request.execute('spUsers_Insert').then(function (req, err) {
            if (err) {
                callback(null, { message: "Execution error calling '[spUsers_Insert]'" })
            } else {
                callback(req);
            }
        });
    }
}

module.exports = new DBContext();