const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

router.post('/', userController.createUserWithLogin);
router.get('/', userController.listAllUsers);
router.get('/:id', userController.getUser);
router.post('/email',userController.getUserByEmail)


module.exports = router

