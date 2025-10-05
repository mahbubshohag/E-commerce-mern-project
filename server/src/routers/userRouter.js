const express = require('express');
const userRouter = express.Router();
const { getUsers, getUser, deleteUser } = require('../controllers/userController');

userRouter.get('/', getUsers);
userRouter.get('/:id', getUser);
userRouter.delete('/:id', deleteUser);

module.exports = userRouter;