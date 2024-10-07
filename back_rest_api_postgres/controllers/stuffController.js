const database = require('../services/database');

// Method to get all stuff data
exports.getAllStuff = async (req, res) => {
    try {
        const result = await database.pool.query('SELECT * FROM stuff');
        return res.status(200).json(result.rows);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// Method to get stuff data by id
exports.getStuffById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await database.pool.query('SELECT * FROM stuff WHERE id = $1', [id]);
        return res.status(200).json(result.rows);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}