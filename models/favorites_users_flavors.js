'use strict';
module.exports = (sequelize, DataTypes) => {
  var favorites_users_flavors = sequelize.define('favorites_users_flavors', {
    userId: DataTypes.INTEGER,
    flavorId: DataTypes.INTEGER
  }, {});
  favorites_users_flavors.associate = function(models) {
    // associations can be defined here
  };
  return favorites_users_flavors;
};