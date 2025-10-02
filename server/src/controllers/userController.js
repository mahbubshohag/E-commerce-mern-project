const createError = require('http-errors');
const users = require('../models/userModel');

const getUsers = (req, res, next) => {
  try {
    res.status(200).json({ success: true, users: users });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers };