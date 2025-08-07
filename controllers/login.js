'use strict';

const models = require( '../models/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();


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
            const token = jwt.sign({userId: user.id}, process.env.TOKEN_SECRET, { expiresIn: '12h' });

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

module.exports = { login };