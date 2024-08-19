const router = require('express').Router()
const stuffController = require('../controllers/stuffController')

// Gets all stuff from the database
router.get('/stuff', stuffController.getAllStuff)

// Gets stuff by id from the database
router.get('/stuff/:id', stuffController.getStuffById)

module.exports = router
