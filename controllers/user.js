'use strict';

const { Op } = require('sequelize');
const models = require( '../models/index');
const bcrypt = require('bcrypt');

// const listAllUsers = async () => {
//   const users = await models.User.findAll();
//   return users;
// };

const listAllUsers = async (req, res) => {
  try {
    let { page= 0 , limit = 5, sortBy = models.Users.id, order = 'ASC', search = '' } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    
    order = ['ASC', 'DESC'].includes(order.toUpperCase()) ? order.toUpperCase() : 'ASC';

    const allowedSortFields = {
      id: models.Users.id,
      loginId: models.Users.loginId,
      firstName: models.Users.firstName,
      lastName: models.Users.lastName,
      createdAt: models.Users.createdAt,
      updatedAt: models.Users.updatedAt
    };

    if (!allowedSortFields.includes(sortBy)) {
      sortBy = models.Users.id;
    }

    if ( Number.isNaN(page) || page <0 ){
      page = 0;
    }
    if (Number.isNaN(limit) || limit<0 ){
      limit = 5;
    }
    
    if (limit > 100) limit = 100;

    

    let whereClause = {};
    if (search) {
      search = search.trim();
        whereClause = {
            [Op.or]: [
                { firstName: { [Op.iLike]: `%${search}%` } },
                { lastName: { [Op.iLike]: `%${search}%` } }
            ]
        };
    }
 
    const users = await models.Users.findAndCountAll({
      limit: limit,
      offset: page * limit,
      order:[[sortBy,order]],
      where: whereClause
    })

    res.status(200).json({
      message: 'Users fetched successfully',
      users,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error during fetching users.' });
  }
};

const getUserByEmail =async (req,res) =>{
  try{
    const {email} = req.body;
    
    if (!email){
      return res.status(400).json("Email required.");
    }
    const user = await models.Users.findOne({
        include: [{
            model: models.Logins,
            where: {
              email: email
            },
            attributes: ["id", "email" ]
        }]
    });

    if ( !user ) {
      return res.status(401).json("Incorrect email");
    }



    return res.status(200).json({
      status: 'Success',
      data: {
        user
      }
    });
    }  catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error during fetching users.' });
    }
}

const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userExists = await models.Users.findOne({ where: { id: userId } });

    if (userExists){
      res.status(201).json({
      message: 'User found!',
      user: userExists,
      })
    }else{
      return res.status(400).json({message: `User doesn't exist`});
    }
    }catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error during user creation.' });
  }
};
    




module.exports = { listAllUsers, getUser, getUserByEmail };
