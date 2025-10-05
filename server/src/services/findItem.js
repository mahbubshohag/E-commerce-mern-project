const createError = require('http-errors');
const User = require('../models/userModel');
const mongoose = require('mongoose');

const findWithId = async (id, options = {}) => {
   try{
   
   const item = await User.findById(id, options);

   if (!item) {
      throw createError(404, 'item does not exist with this id');
   }

   return item;
   } 
   catch (error) {
      if(error instanceof mongoose.Error.CastError) {
        throw createError(400, 'Invalid item ID');
      }
      throw error;
    }
}

module.exports = { findWithId };
