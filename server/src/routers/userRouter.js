const express = require('express');
const userRouter = express.Router();
const { 
    getUsers,
     getUser,
      deleteUserById, 
      getUserById,
      processRegister
     } = require('../controllers/userController');


     //GET: api/users
userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById);
userRouter.delete('/:id', deleteUserById);
userRouter.post('/process-register', processRegister);

module.exports = userRouter;