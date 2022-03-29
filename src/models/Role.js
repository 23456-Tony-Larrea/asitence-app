const {DataTypes} =require ('sequelize');
const sequelize =require('./db');
const Role=sequelize.define('Role',{
    nameRole:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:false
    },
},{
timestamps:false,
tableName:'Roles'
});

module.exports=Role;