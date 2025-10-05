
const fs = require('fs');
const createError = require('http-errors');
const User = require('../models/userModel');
const { successResponse } = require('./responseController');
const mongoose = require('mongoose');
const { findWithId } = require('../services/findItem');


const getUsers = async (req, res, next) => {
  try {
    const search = req.query.search || '';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const searchRegExp = new RegExp('.*' + search + '.*', 'i');
   
    const filter = {
      isAdmin: { $ne: true }, // admin বাদ দেবে
      $or: [
        { name: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
        { phone: { $regex: searchRegExp } },
      ]
    };

    const options = {password: 0 }; // password  ফিল্ডগুলো রেসপন্সে যাবে না

    const users = await User.find(filter, options)
      .limit(limit)
      .skip((page - 1) * limit);

    const count = await User.countDocuments(filter);

    if(!users) {
      throw createError(404, 'No users found');
    };

  
    return successResponse(res, { statusCode: 200, message: "Users were returned successfully", 
      payload: {
        users,
      pagination: {
        totalUsers: count,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        previousPage: page - 1 > 0 ? page - 1 : null,
        nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
      },
      },
    });
   

  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
     const options = { password: 0 };
    const user = await findWithId(id, options);

    return successResponse(res, {
      statusCode: 200,
      message: "User was returned successfully",
      payload: {
        user,}
    });

  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return next(createError(400, 'Invalid user ID'));
    }
    next(error);
  }
};

  

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
     const options = { password: 0 };
    const user = await findWithId(id, options);

    


    const userImagePath = user.image;
    fs.access(userImagePath, (err) => {
      if(err){
        console.error('User image does not exist', err);
      }
      else {
        fs.unlink(userImagePath, (err) => {
          if(err){
            throw err;
          }
          console.log('user image was deleted');
        });
      }
    });

    await User.findByIdAndDelete(
      { _id: id,
        isAdmin: false },
       options);

   

    return successResponse(res, {
      statusCode: 200,
      message: "User was deleted successfully",
    });

  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return next(createError(400, 'Invalid user ID'));
    }
    next(error);
  }
};

module.exports = { getUsers, getUser, deleteUser };
