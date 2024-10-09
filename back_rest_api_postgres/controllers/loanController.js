const database = require('../services/database');

// Method to get all loans with user and stuff data
exports.getAllLoans = async (req, res) => {
    try {
        const result = await database.pool.query(`
            SELECT l.id, l.loan_start_date, l.returned_date, l.loan_end_date,

            (SELECT ROW_TO_JSON(user_obj) FROM (
                SELECT id, name, role FROM users WHERE id = l.user_id
            ) user_obj) AS user,

            (SELECT ROW_TO_JSON(stuff_obj) FROM(
                SELECT id, name, description, quantity FROM stuff WHERE id = l.stuff_id
            )stuff_obj) AS stuff

            FROM loan_events l
        `)
        return res.status(200).json(result.rows)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

// Method to get loan data by id allso with user and stuff data
exports.getLoanById = async (req, res) => {
    try {
        const id = req.params.id;
        // Check if id is provided
        if (!id) {
            return res.status(422).json({ error: 'id is required' });
        }
        const result = await database.pool.query(`
            SELECT l.id, l.loan_start_date, l.returned_date, l.loan_end_date,

            (SELECT ROW_TO_JSON(user_obj) FROM (
                SELECT id, name, role FROM users WHERE id = l.user_id
            ) user_obj) AS user,

            (SELECT ROW_TO_JSON(stuff_obj) FROM(
                SELECT id, name, description, quantity FROM stuff WHERE id = l.stuff_id
            )stuff_obj) AS stuff

            FROM loan_events l WHERE id = $1`, [id]
        );
        // Check if id exists
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'loan not found' });
        }
        return res.status(201).json(result.rows[0])
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

// Method to create a new loan
exports.createLoan = async (req, res) => {
    try {
        const { user_id, stuff_id, loan_start_date, loan_end_date } = req.body;

        // Check if all required fields are provided
        if (!user_id || !stuff_id || !loan_start_date || !loan_end_date) {
            return res.status(422).json({ error: 'user_id, stuff_id, loan_start_date and loan_end_date are required' });
        }

        // Check if loan_start_date and loan_end_date are valid dates
        if (isNaN(Date.parse(loan_start_date)) || isNaN(Date.parse(loan_end_date))) {
            return res.status(422).json({ error: 'loan_start_date and loan_end_date must be valid dates' });
        }

        // Check if user_id exists
        const userResult = await database.pool.query('SELECT id FROM users WHERE id = $1', [user_id]);
        if (userResult.rowCount === 0) {
            return res.status(404).json({ error: 'user_id does not exist' });
        }

        // Check if stuff_id exists
        const stuffResult = await database.pool.query('SELECT id FROM stuff WHERE id = $1', [stuff_id]);
        if (stuffResult.rowCount === 0) {
            return res.status(404).json({ error: 'stuff_id does not exist' });
        }

        const result = await database.pool.query(`
            INSERT INTO loan_events (user_id, stuff_id, loan_start_date, loan_end_date)
            VALUES ($1, $2, $3, $4) RETURNING *
        `, [user_id, stuff_id, loan_start_date, loan_end_date]);

        return res.status(200).json(result.rows);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
exports.updateLoan = async (req, res) => {
    try {
        const id = req.params.id;
        const { user_id, stuff_id, loan_start_date, loan_end_date, returned_date } = req.body;

        // Check if id is provided
        if (!id) {
            return res.status(422).json({ error: 'id is required' });
        }

        // Check if user_id exists
        if (user_id !== undefined) {
            const userResult = await database.pool.query('SELECT id FROM users WHERE id = $1', [user_id]);
            if (userResult.rowCount === 0) {
                return res.status(404).json({ error: 'user_id does not exist' });
            }
        }

        // Check if stuff_id exists
        if (stuff_id !== undefined) {
            const stuffResult = await database.pool.query('SELECT id FROM stuff WHERE id = $1', [stuff_id]);
            if (stuffResult.rowCount === 0) {
                return res.status(404).json({ error: 'stuff_id does not exist' });
            }
        }
        // Check if returned_date, loan_start_date and loan_end_date are valid dates
        if ( returned_date !== undefined) {
            if (isNaN(Date.parse(returned_date))) {
                return res.status(422).json({ error: 'returned_date must be a valid date' });
            }
        }
        if (loan_start_date !== undefined) {
            if (isNaN(Date.parse(loan_start_date))) {
                return res.status(422).json({ error: 'loan_start_date must be a valid date' });
            }
        }
        if (loan_end_date !== undefined) {
            if (isNaN(Date.parse(loan_end_date))) {
                return res.status(422).json({ error: 'loan_end_date must be a valid date' });
            }
        }

        // Build the update query dynamically based on provided fields
        const fields = [];
        const values = [];
        let query = 'UPDATE loan_events SET ';

        if (user_id !== undefined) {
            fields.push('user_id');
            values.push(user_id);
        }
        if (stuff_id !== undefined) {
            fields.push('stuff_id');
            values.push(stuff_id);
        }
        if (loan_start_date !== undefined) {
            fields.push('loan_start_date');
            values.push(loan_start_date);
        }
        if (loan_end_date !== undefined) {
            fields.push('loan_end_date');
            values.push(loan_end_date);
        }
        if (returned_date !== undefined) {
            fields.push('returned_date');
            values.push(returned_date);
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
        values.push(id); // Add id to the end of the values array

        const result = await database.pool.query(query, values);

        // Check if id exists
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'loan not found' });
        }

        return res.status(200).json(result.rows[0]);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

exports.deleteLoan = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await database.pool.query(`
            DELETE FROM loan_events WHERE id = $1 RETURNING *
        `, [id]);
        // Check if id exists
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'loan not found' });
        }
         // 204 No Content
         return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}