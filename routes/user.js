const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const auth = require('../middleware/auth');


router.post('/', auth.authenticateToken, userController.createUserWithLogin);
router.get('/', auth.authenticateToken, userController.listAllUsers);
router.get('/:id', auth.authenticateToken, userController.getUser);
router.post('/email', auth.authenticateToken,userController.getUserByEmail);


module.exports = router

