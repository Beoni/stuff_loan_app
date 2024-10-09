const router = require('express').Router()
const stuffController = require('../controllers/stuffController')

// Gets all stuff from the database
router.get('/stuff', stuffController.getAllStuff)

// Gets stuff by id from the database
router.get('/stuff/:id', stuffController.getStuffById)

// Creates stuff in the database
router.post('/stuff', stuffController.createStuff)

// Updates stuff in the database
router.put('/stuff/:id', stuffController.updateStuff)

// Deletes stuff from the database
router.delete('/stuff/:id', stuffController.deleteStuff)

module.exports = router
