'use strict';
module.exports = (sequelize, DataTypes) => {
  var profile = sequelize.define('profile', {
    userId: DataTypes.INTEGER,
    topFlavor1: DataTypes.INTEGER,
    topFlavor2: DataTypes.INTEGER,
    topFlavor3: DataTypes.INTEGER,
    topFlavor4: DataTypes.INTEGER,
    topFlavor5: DataTypes.INTEGER,
    topFlavor6: DataTypes.INTEGER,
    birthday: DataTypes.DATE,
    emailNotify: DataTypes.STRING
  }, {});
  profile.associate = function(models) {
    // associations can be defined here
    models.profile.belongsTo(models.user);
  };
  return profile;
};
