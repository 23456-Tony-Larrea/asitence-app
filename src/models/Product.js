const {DataTypes} =require ('sequelize');
const sequelize =require('./db');
const Product =sequelize.define('Product',{
  codProduct:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    allowNull:false,
    autoIncrement:true
  },
    nameProduct:{
        type:DataTypes.STRING,
        allowNull:false 
    },
    category:{
        type:DataTypes.STRING,
        allowNull:false
    },
    maker:{
        type:DataTypes.STRING,
        allowNull:false
    },
    price:{
        type:DataTypes.DECIMAL,
        allowNull:false
    }
},{  
    timestamps:false,
    tableName:'Products'
});

module.exports =Product;