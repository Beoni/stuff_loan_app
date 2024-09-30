const router = require('express').Router()
const loanController = require('../controllers/loanController')

// Gets all loans from the database
router.get('/loans', loanController.getAllLoans)

// Gets loan by id from the database
router.get('/loans/:id', loanController.getLoanById)

router.post('/loans', loanController.createLoan)

router.put('/loans/:id', loanController.updateLoan)

router.delete('/loans/:id', loanController.deleteLoan)

module.exports = router