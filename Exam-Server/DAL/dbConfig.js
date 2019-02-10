const DBConnection = {
    server: "DESKTOP-5K04ECP\\SQLEXPRESS",
    database: "NodeJsDb",
    user: "sanad",
    password: "123456789",
    options: {
        encrypt: true
    },
    pool: {
        min: 2
    }
}

module.exports = DBConnection;