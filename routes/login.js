const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');

router.post('/', loginController.login);
router.post('/create', loginController.createUserWithLogin);
router.post('/createtest', loginController.createUserWithLoginTest);

module.exports = router;    

