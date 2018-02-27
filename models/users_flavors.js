'use strict';
module.exports = (sequelize, DataTypes) => {
  var users_flavors = sequelize.define('users_flavors', {
    userId: DataTypes.INTEGER,
    flavorId: DataTypes.INTEGER
  }, {});
  users_flavors.associate = function(models) {
    // associations can be defined here
  };
  return users_flavors;
};