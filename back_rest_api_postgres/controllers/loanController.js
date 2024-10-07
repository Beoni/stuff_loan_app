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
        return res.status(200).json(result.rows)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

exports.createLoan = async (req, res) => {
    try {
        const { user_id, stuff_id, loan_start_date, loan_end_date } = req.body;
        const result = await database.pool.query(`
            INSERT INTO loan_events (user_id, stuff_id, loan_start_date, loan_end_date)
            VALUES ($1, $2, $3, $4) RETURNING *
        `, [user_id, stuff_id, loan_start_date, loan_end_date]);
        return res.status(200).json(result.rows)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

exports.updateLoan = async (req, res) => {
    try {
        const { user_id, stuff_id, loan_start_date, loan_end_date } = req.body;
        const id = req.params.id;
        const result = await database.pool.query(`
            UPDATE loan_events SET user_id = $1, stuff_id = $2, loan_start_date = $3, loan_end_date = $4
            WHERE id = $5 RETURNING *
        `, [user_id, stuff_id, loan_start_date, loan_end_date, id]);
        return res.status(200).json(result.rows)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

exports.deleteLoan = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await database.pool.query(`
            DELETE FROM loan_events WHERE id = $1 RETURNING *
        `, [id]);
        return res.status(200).json(result.rows)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}