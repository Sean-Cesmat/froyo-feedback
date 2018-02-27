'use strict';
var bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1,99],
          msg: "Invalid Name. Must be between 1 and 99 characters."
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: "Invalid email address."
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8,99],
          msg: "Invalid Password. Must be between 8 and 99 characters."
        }
      }
    },
    userType: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: function(pendingUser, options) {
        if (pendingUser && pendingUser.password) {
          var hash = bcrypt.hashSync(pendingUser.password, 10);
          pendingUser.password = hash;
        }
      }
    }
  });
  user.associate = function(models) {
    // associations can be defined here
    models.user.belongsToMany(models.flavor, {through: models.users_flavors});
    models.user.hasOne(models.profile);
  };
  user.prototype.validPassword = function(passwordTyped) {
    return bcrypt.compareSync(passwordTyped, this.password);
  }

  user.prototype.toJSON = function() {
    var userData = this.get();
    delete userData.password;
    return userData;
  };

  return user;
};
