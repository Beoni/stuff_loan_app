const database = require('../services/database');

exports.getAllUsers = async (req, res) => {
    try {
        const result = await database.pool.query('SELECT * FROM users');
        return res.status(200).json(result.rows);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

exports.getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await database.pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return res.status(200).json(result.rows);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

//Create a new user
exports.createUser = async (req, res) => {
    try {
        if (!req.body.name || !req.body.password) {
            return res.status(422).json({ error: 'name and password are required' });
        }

        const existisUser = await database.pool.query({
            text: 'SELECT EXISTS (SELECT * FROM users WHERE name = $1)',
            values: [req.body.name]
        })

        if (existisUser.rows[0].exists) {
            return res.status(409).json({ error: `user name ${req.body.name} already exists` });
        }

        const result = await database.pool.query({
            text: 'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *',
            values: [req.body.name, req.body.password]
        })
        return res.status(201).json(result.rows[0]);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}