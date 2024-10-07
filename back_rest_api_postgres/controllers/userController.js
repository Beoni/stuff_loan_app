const e = require('express');
const database = require('../services/database');

// Method to get all users
exports.getAllUsers = async (req, res) => {
    try {
        const result = await database.pool.query('SELECT * FROM users');
        return res.status(200).json(result.rows);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

// Method to get user by id
exports.getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await database.pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return res.status(200).json(result.rows);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const { name, password } = req.body;
        if (!name || !password) {
            return res.status(422).json({ error: 'name and password are required' });
        }

        // Check if user already exists and returns informative mesaage if true
        const existisUser = await database.pool.query({
            text: 'SELECT EXISTS (SELECT * FROM users WHERE name = $1)',
            values: [name]
        })
        
        if (existisUser.rows[0].exists) {
            return res.status(409).json({ error: `user name ${name} already exists` });
        }

        const result = await database.pool.query({
            text: 'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *',
            values: [name, password]
        })

        return res.status(201).json(result.rows[0]);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// Update user password
exports.updateUserPassword = async (req,res) => {
    try {
        const id = req.params.id;
        const { password } = req.body;
        // Check if name and password are provided
        if (!password) {
            return res.status(422).json({ error: 'password is required' })
        } else { 
           // Check if password is same as the old one
            const user = await database.pool.query({
                text: 'SELECT * FROM users WHERE id = $1',
                values: [id]
            })

            if (user.rows[0].password === password) {
                return res.status(409).json({ error: 'new password must be different from the old one' })
            }
        } 
        
        const result = await database.pool.query({
            text: 'UPDATE users SET passwor = $1 WHERE id = $2 RETURNING *',
            values: [password, id]
        })   

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'user not found' })
        }

        return res.status(200).json(result.rows[0]);
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// Update user name
exports.updateUserName = async (req,res) => {
    try {
        const id = req.params.id;
        const { name } = req.body;
         // Check if name is provided
        if (!name) {
            return res.status(422).json({ error: 'name is required' })
        } else if (name) { 
           // Check if name is same as the old one
            const user = await database.pool.query({
                text: 'SELECT * FROM users WHERE name = $1',
                values: [name]
            })

            if (user.rows[0].name === name) {
                return res.status(409).json({ error: 'new name must be different from the old one' })
              } 
        } else {
            // Check if the new name already exists
            const existisUser = await database.pool.query({
                text: 'SELECT EXISTS (SELECT * FROM users WHERE name = $1)',
                values: [name]
            })

            if (existisUser.rows[0].exists) {
                return res.status(409).json({ error: `user name ${name} already exists` });
            }
        }

        const result = await database.pool.query({
            text: 'UPDATE users SET name = $1 WHERE id = $2 RETURNING *',
            values: [name, id]
        })
        
        // Check if id exists
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'user not found' })
        }

        return res.status(200).json(result.rows[0]);
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// Update user role
exports.updateUserRole = async (req,res) => {
    try {
        const id = req.params.id;
        const role = req.body.role;
        // Check if role is provided
        if (!role) {
            return res.status(422).json({ error: 'role is required' })
        } 
        
        const result = await database.pool.query({
            text: 'UPDATE users SET role = $1 WHERE id = $2 RETURNING *',
            values: [role, id]
        })   

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'user not found' })
        }

        return res.status(200).json(result.rows[0]);
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// Delete user
exports.deleteUser = async (req,res) => {
    try {
        const id = req.params.id;
        const result = await database.pool.query({
            text: 'DELETE FROM users WHERE id = $1 RETURNING *',
            values: [id]
        })
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'user not found' })
        }
        // 204 No Content
        return res.status(204).send();
    }catch (error) {
        return res.status(500).json({ error: error.message });
    }

}