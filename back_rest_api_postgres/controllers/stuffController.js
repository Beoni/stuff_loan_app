const database = require('../services/database');

// Method to get all stuff data
exports.getAllStuff = async (req, res) => {
    try {
        const result = await database.pool.query('SELECT * FROM stuff');

        // Check if there is no data
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'no data found' });
        }
        return res.status(200).json(result.rows);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// Method to get stuff data by id
exports.getStuffById = async (req, res) => {
    try {
        const id = req.params.id;
        
        // Check if id is provided
        if (!id) {
            return res.status(422).json({ error: 'id is required' });
        }

        const result = await database.pool.query('SELECT * FROM stuff WHERE id = $1', [id]);

        //Check if id exists
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'stuff not found' })
        }
        return res.status(200).json(result.rows);
       
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

exports.createStuff = async (req, res) => {
    try {
        const { name, description, quantity } = req.body;
        
        // Check if name is provided
        if (!name) {
            return res.status(422).json({ error: 'name is required' }); 
        }
        
        // Set quantity to 0 if not provided
        const finalQuantity = quantity !== undefined ? quantity : 0;
        
        // Check if quantity is a number
        if (isNaN(finalQuantity)) {
            return res.status(422).json({ error: 'quantity must be a number' });
        }

        const result = await database.pool.query('INSERT INTO stuff (name, description, quantity) VALUES ($1, $2, $3) RETURNING *', [name, description, finalQuantity]);
        return res.status(201).json(result.rows[0]);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

exports.updateStuff = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, description, quantity } = req.body;

        // Check if id is provided
        if (!id) {
            return res.status(422).json({ error: 'id is required' });
        }

        // Build the update query dynamically based on provided fields
        const fields = [];
        const values = [];
        let query = 'UPDATE stuff SET ';

        if (name !== undefined) {
            fields.push('name');
            values.push(name);
        }
        if (description !== undefined) {
            fields.push('description');
            values.push(description);
        }
        if (quantity !== undefined) {
            fields.push('quantity');
            values.push(quantity);
        }
        // Check if there are fields to update
        if (fields.length === 0) {
            return res.status(422).json({ error: 'No fields to update' });
        }

        fields.forEach((field, index) => {
            query += `${field} = $${index + 1}`;
            if (index < fields.length - 1) {
                query += ', ';
            }
        });

        query += ` WHERE id = $${fields.length + 1} RETURNING *`;
        values.push(id);

        const result = await database.pool.query(query, values);

        //Check if id exists
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'stuff not found' })
        }
        return res.status(201).json(result.rows[0]);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

exports.deleteStuff = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await database.pool.query('DELETE FROM stuff WHERE id = $1', [id]);

        //Check if id exists
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'stuff not found' })
        }
        return res.status(201).json(result.rows[0]);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}