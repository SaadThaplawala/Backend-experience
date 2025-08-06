const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

router.post('/', userController.createUserWithLogin);
router.get('/', userController.listAllUsers);



module.exports = router

