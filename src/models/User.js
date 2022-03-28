const {DataTypes} = require('sequelize');
const sequelize = require('../models/db');
const Role = require('./Role');

const User = sequelize.define('User', {
    firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
  },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
    },
}, 
{
timestamps: false,
tableName: 'Users'
});
User.belongsTo(Role, {foreignKey: 'RoleId',as: 'role'});
Role.hasMany(User,);
module.exports = User;