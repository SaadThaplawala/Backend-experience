'use strict';

const login = require("./login");

module.exports = (sequelize, DataTypes) => {
  const test = sequelize.define('tests', { 
    temp: DataTypes.STRING,
    userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'fk_user_id',
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
  }, {
  freezeTableName : true,
  timestamps: true  
  });
  test.associate = function(models) {
    // models.tests.hasOne(models.Users),
    models.tests.belongsTo(models.Users, {
      foreignKey: 'fk_user_id'
    })
  }
  return test;
};