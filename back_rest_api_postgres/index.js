const express = require('express');
const database = require('./services/database');

const app = express();

app.get('/', (req, res) => {
    database.pool.query( 'SELECT * FROM users').then((result)=>{
        return res.status(200).json(result.rows);
    }).catch((error) => {
        return res.status(500).json({error: error.message})
    })
     
})




app.listen(3000, () => console.log('Server running on port 3000'));