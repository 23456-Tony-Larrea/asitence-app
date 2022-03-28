const {DataTypes} =require ('sequelize');
const sequelize =require('./db');
const Role=sequelize.define('Role',{
    nameRole:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
},{
timestamps:false,
tableName:'Roles'
});

module.exports=Role;