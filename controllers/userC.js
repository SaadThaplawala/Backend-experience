'use strict';
const User = require('../models/user');
const models = require( '../models/index');

// const listAllUsers = async () => {
//   const users = await models.User.findAll();
//   return users;
// };

const listAllUsers = async (req, res) => {
  try {
    const users = await models.User.findAll();

    res.status(200).json({
      message: 'Users fetched successfully',
      users,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error during fetching users.' });
  }
};



const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    let newUser;
    if (!firstName || !lastName) {
      return res.status(400).json({ message: 'First name and last name are required.' });
    }
    if (!email){
    newUser = await models.User.create({
      firstName,
      lastName,
      email: null,
    });
    } else{
    newUser = await models.User.create({
      firstName,
      lastName,
      email,
    });
    }

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error during user creation.' });
  }
};

module.exports = { listAllUsers, createUser };