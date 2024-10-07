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