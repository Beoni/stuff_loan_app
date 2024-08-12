const express = require('express');
const database = require('./services/database');

const app = express();

// Gets all users from the database
app.get('/users', (req, res) => {
    database.pool.query( 'SELECT * FROM users').then((result)=>{
        return res.status(200).json(result.rows);
    }).catch((error) => {
        return res.status(500).json({error: error.message})
    })
     
})

// Gets user by id from the database
app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    database.pool.query( 'SELECT * FROM users WHERE id = $1', [id]).then((result)=>{
        return res.status(200).json(result.rows);
    }).catch((error) => {
        return res.status(500).json({error: error.message})
    })
})

// Gets all stuff from the database
app.get('/stuff', (req, res) => {
    database.pool.query( 'SELECT * FROM stuff').then((result)=>{
        return res.status(200).json(result.rows);
    }).catch((error) => {
        return res.status(500).json({error: error.message})
    })
})

// Gets stuff by id from the database
app.get('/stuff/:id', (req, res) => {
    const id = req.params.id;
    database.pool.query( 'SELECT * FROM stuff WHERE id =$1', [id]).then((result)=>{
        return res.status(200).json(result.rows);
    }).catch((error) => {
        return res.status(500).json({error: error.message})
    })
})

// Gets all loans from the database
app.get('/loans', (req, res) => {
    database.pool.query( 'SELECT * FROM loan_events').then((result)=>{
        return res.status(200).json(result.rows);
    }).catch((error) => {
        return res.status(500).json({error: error.message})
    })
})

// Gets loan by id from the database
app.get('/loans/:id', (req, res) => {
    const id = req.params.id;
    database.pool.query( 'SELECT * FROM loan_events WHERE id =$1', [id]).then((result)=>{
        return res.status(200).json(result.rows);
    }).catch((error) => {
        return res.status(500).json({error: error.message})
    })
})

// Add a new user to the database


app.listen(3000, () => console.log('Server running on port 3000'));