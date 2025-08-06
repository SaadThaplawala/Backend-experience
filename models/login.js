'use strict';

module.exports = (sequelize, DataTypes) => {
  const Logins = sequelize.define('Logins', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: true
  });

  Logins.associate = function(models) {}

  return Logins;
};