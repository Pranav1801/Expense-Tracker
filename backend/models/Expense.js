const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// const Expense = sequelize.define('Expense', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   amount: {
//     type: DataTypes.DECIMAL(10, 2),
//     allowNull: false
//   },
//   category: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   description: {
//     type: DataTypes.TEXT,
//     allowNull: true
//   },
//   date: {
//     type: DataTypes.DATEONLY,
//     allowNull: false,
//     defaultValue: DataTypes.NOW
//   }
// });

// module.exports = Expense;


module.exports = (sequelize, DataTypes) => { 
  const Expense = sequelize.define('Expense', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
});

return Expense;
}