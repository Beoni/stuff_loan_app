const router = require('express').Router()
const stuffController = require('../controllers/stuffController')

// Gets all stuff from the database
router.get('/stuff', stuffController.getAllStuff)

// Gets stuff by id from the database
router.get('/stuff/:id', stuffController.getStuffById)

router.post('/stuff', stuffController.createStuff)

router.put('/stuff/:id', stuffController.updateStuff)

router.delete('/stuff/:id', stuffController.deleteStuff)

module.exports = router
