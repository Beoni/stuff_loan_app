const database = require('../services/database');

exports.getAllUsers = async (req, res) => {
    try{
        const result = await database.pool.query( 'SELECT * FROM users');
        return res.status(200).json(result.rows);
    } catch (error) {
        return res.status(500).json({error: error.message})
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