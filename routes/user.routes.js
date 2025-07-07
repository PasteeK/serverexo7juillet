const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/users', userController.getUsers);

router.post('/user', userController.createUser);

router.delete('/users/:id', userController.deleteUser);

module.exports = router;
