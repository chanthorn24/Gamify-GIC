const express = require('express');
const router = express.Router();

const questionTypeController = require('../controllers/questionTypeController');

router.get('/get-all', questionTypeController.getAll);
router.get('/get/:id', questionTypeController.getById);
router.post('/create', questionTypeController.create);
router.put('/update/:id', questionTypeController.update);
router.delete('/delete/:id', questionTypeController.deleteOne);

module.exports = router;