const router = require('express').Router()
const loanController = require('../controllers/loanController')

// Gets all loans from the database
router.get('/loans', loanController.getAllLoans)

// Gets loan by id from the database
router.get('/loans/:id', loanController.getLoanById)

module.exports = router