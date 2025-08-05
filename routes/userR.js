const express = require('express')
const router = express.Router()
const userController = require('../controllers/userC')

router.post('/', userController.createUser);
router.get('/', userController.listAllUsers);



module.exports = router

