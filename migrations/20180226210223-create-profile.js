'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      topFlavor1: {
        type: Sequelize.INTEGER
      },
      topFlavor2: {
        type: Sequelize.INTEGER
      },
      topFlavor3: {
        type: Sequelize.INTEGER
      },
      topFlavor4: {
        type: Sequelize.INTEGER
      },
      topFlavor5: {
        type: Sequelize.INTEGER
      },
      topFlavor6: {
        type: Sequelize.INTEGER
      },
      birthday: {
        type: Sequelize.DATE
      },
      emailNotify: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('profiles');
  }
};