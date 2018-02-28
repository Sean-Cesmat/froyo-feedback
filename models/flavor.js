'use strict';
module.exports = (sequelize, DataTypes) => {
  var flavor = sequelize.define('flavor', {
    name: DataTypes.STRING,
    flavorType: DataTypes.STRING,
    status: DataTypes.STRING,
    nutritionUrl: DataTypes.STRING
  }, {});
  flavor.associate = function(models) {
    // associations can be defined here
    models.flavor.belongsToMany(models.user, {through: models.users_flavors});
  };
  return flavor;
};
