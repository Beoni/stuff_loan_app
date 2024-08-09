const {Pool} = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'stuff_loan_db',
    password: 'salasana',
    port: 5432,

    
    //connectionString: 'postgresql://postgres:salasana@localhost:5432/postgres'
})

module.exports = {
    pool
}