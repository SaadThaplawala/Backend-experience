'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const userTable = await queryInterface.describeTable('Users');
    if (userTable.email) {
      await queryInterface.removeColumn('Users', 'email');
    }

    if (!userTable.fk_login_id) {
      await queryInterface.addColumn('Users', 'fk_login_id', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Logins',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      });
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.addColumn('Users', 'email', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
  }
};
