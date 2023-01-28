const express = require('express');
const router = express.Router();

const roomTypeController = require('../controllers/roomTypeController');

router.get('/get-all', roomTypeController.getAll);
router.get('/get/:id', roomTypeController.getById);
router.post('/create', roomTypeController.create);
router.put('/update/:id', roomTypeController.update);
router.delete('/delete/:id', roomTypeController.deleteOne);

module.exports = router;