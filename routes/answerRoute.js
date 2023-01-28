const express = require('express')
const router = express.Router()

const answerController = require('../controllers/answerController')

router.get('/get-all', answerController.getAll); 
router.get('/get/:id', answerController.getById); 
router.post('/create', answerController.create); 
router.put('/update/:id', answerController.update); 
router.delete('/delete/:id', answerController.deleteOne); 

module.exports = router