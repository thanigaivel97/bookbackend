const express = require('express');
const bookcontrol = require('../controllers/bookcontroller')
const isauth = require('../middleware/jwt')
const router = express.Router();

router.get('/getbooks', isauth, bookcontrol.getbooks);

router.post('/create', isauth, bookcontrol.createbooks);

router.put('/books', isauth, bookcontrol.updatebook);

router.delete('/books', isauth, bookcontrol.delete);

module.exports = router;