const express = require('express')
const router = express.Router()

const questionController = require('../controllers/questionController')

router.get('/get-all', questionController.getAll);
router.get('/get/:id', questionController.getById);
router.post('/create', questionController.create);
router.put('/update/:id', questionController.update);
router.delete('/delete/:id', questionController.deleteOne);

module.exports = router