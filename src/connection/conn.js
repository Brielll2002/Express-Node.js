const mysql = require('mysql')
require('dotenv').config()

try {
    const conn = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    })

    module.exports = conn
} catch (error) {
    console.error(error)
}