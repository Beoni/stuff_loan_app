const router = require('express').Router()
const loanController = require('../controllers/loanController')

// Gets all loans from the database
router.get('/loans', loanController.getAllLoans)

// Gets loan by id from the database
router.get('/loans/:id', loanController.getLoanById)

// Creates loan in the database
router.post('/loans', loanController.createLoan)

// Updates loan in the database
router.put('/loans/:id', loanController.updateLoan)

// Deletes loan from the database
router.delete('/loans/:id', loanController.deleteLoan)

module.exports = router