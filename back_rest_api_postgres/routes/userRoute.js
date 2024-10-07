const router = require('express').Router()
const userController = require('../controllers/userController')

// Gets all users from the database
router.get('/users', userController.getAllUsers)

// Gets user by id from the database
router.get('/users/:id', userController.getUserById)

// Create a new user
router.post('/users', userController.createUser)

// Update user Password
router.put('/users/password/:id', userController.updateUserPassword)

// Update user name
router.put('/users/name/:id', userController.updateUserName)

// Delete user
router.delete('/users/:id', userController.deleteUser) 

module.exports = router