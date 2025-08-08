'use strict';

const models = require( '../models/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const dotenv = require('dotenv');

// dotenv.config();


const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json("Email and Password required.");
        }

        const user = await models.Logins.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json("Incorrect email or password");
        }

        const confirmPassword = await bcrypt.compare(password, user.password);

        if (confirmPassword) {
            const token = jwt.sign({ email: user.email }, process.env.TOKEN_SECRET, { expiresIn: '12h' });

            delete user.dataValues.password;

            return res.status(200).json({
                status: 'Success',
                data: {
                    user,
                    token
                }
            });
        } else {
            return res.status(401).json("Incorrect email or password");
        }

    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error during fetching users.' });
    }
};

const createUserWithLoginTest = async (req, res) => {
  try {
    const bulkUsers = [];

    for (let i = 1; i <= 25; i++) {
      const email = `john.doe${i}@example.com`;
      const firstName = 'John';
      const lastName = `Doe${i}`;
      const password = 'TestPass123';

      // Check if email already exists to avoid constraint error
      const existing = await models.Logins.findOne({ where: { email } });
      if (existing) continue;

      const hashedPassword = await bcrypt.hash(password, 10);

      const login = await models.Logins.create({
        email,
        password: hashedPassword,
      });

      const user = await models.Users.create({
        firstName,
        lastName,
        loginId: login.id,
      });

      bulkUsers.push({
        id: user.id,
        firstName,
        lastName,
        email,
        loginId: login.id,
      });
    }

    res.status(201).json({
      message: 'Test users created successfully',
      count: bulkUsers.length,
      users: bulkUsers,
    });
  } catch (err) {
    console.error('Bulk create error:', err);
    res.status(500).json({ message: 'Server error during bulk user creation.' });
  }
};

const createUserWithLogin = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

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


module.exports = { login, createUserWithLogin, createUserWithLoginTest };