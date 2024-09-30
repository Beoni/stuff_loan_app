const database = require('../services/database');

exports.getAllStuff = async (req, res) => {
    try {
        const result = await database.pool.query('SELECT * FROM stuff');
        return res.status(200).json(result.rows);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

exports.getStuffById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await database.pool.query('SELECT * FROM stuff WHERE id = $1', [id]);
        return res.status(200).json(result.rows);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

exports.createStuff = async (req, res) => {
    try {
        const { name, description, quantity } = req.body;
        const result = await database.pool.query('INSERT INTO stuff (name, description, quantity) VALUES ($1, $2, $3) RETURNING *', [name, description, quantity]);
        return res.status(200).json(result.rows);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

exports.updateStuff = async (req, res) => {
    try {
        const { name, description, quantity } = req.body;
        const id = req.params.id;
        const result = await database.pool.query('UPDATE stuff SET name = $1, description = $2, quantity = $3 WHERE id = $4 RETURNING *', [name, description, quantity, id]);
        return res.status(200).json(result.rows);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

exports.deleteStuff = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await database.pool.query('DELETE FROM stuff WHERE id = $1', [id]);
        return res.status(200).json(result.rows);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}