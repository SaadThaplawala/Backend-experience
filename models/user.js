'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
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
    freezeTableName: true,
    timeStamp: true
  });
  return User;
};