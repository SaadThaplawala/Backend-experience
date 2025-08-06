'use strict';


const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.define({
    loginId: {
      type: DataTypes.INTEGER,
      field: 'fk_login_id',
      allowNull: false,
      references: {
        model: 'Logins',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    firstName: {
     type: DataTypes.STRING,
     allowNull: false
    },
    lastName: {
     type: DataTypes.STRING,
     allowNull: false
    },
  }, {
    modelName: 'User',
  });
  return User;
};