'use strict';

const models = require( '../models/index');
const bcrypt = require('bcrypt');

// const listAllUsers = async () => {
//   const users = await models.User.findAll();
//   return users;
// };

const listAllUsers = async (req, res) => {
  try {
    const users = await models.Users.findAll({
    });

    res.status(200).json({
      message: 'Users fetched successfully',
      users,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error during fetching users.' });
  }
};



const createUserWithLogin = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    // if (!email){
    // newUser = await models.User.create({
    //   firstName,
    //   lastName,
    //   email: null,
    // });
    // } else{
    // newUser = await models.User.create({
    //   firstName,
    //   lastName,
    //   email,
    // });
    // }

    const userexists = await models.Logins.findOne({where: { email }});
    if (userexists){
      return res.status(400).json({message: 'User with this email already exists.'});
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newLogin =  await models.Logins.create({
        email,
        password: hashedPassword,
      });
    console.log("Login", newLogin);

     const newUser = await models.Users.create({
        firstName,
        lastName,
        loginId: newLogin.dataValues.id,
      });

      console.log("User", newUser);

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newLogin.email,
        loginId: newUser.loginId,
      },
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error during user creation.' });
  }
};

module.exports = { listAllUsers, createUserWithLogin };
