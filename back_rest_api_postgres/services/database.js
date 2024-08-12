const {Pool} = require('pg')
//Includes the database connection information
const pool = new Pool({
    // user: 'postgres',
    // host: 'localhost',
    // database: 'stuff_loan_db',
    // password: 'salasana',
    // port: 5432,

    // This is the connection string that is used to connect to the database 
    // Replaces the above code
    connectionString: 'postgre://postgres:salasana@localhost:5432/stuff_loan_db'
})
// Exports the pool object so that it can be used in other files
module.exports = {
    pool
}