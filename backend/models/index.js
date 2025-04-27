const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

// // Import models (example for a User model)
const User = require('./User')(sequelize, DataTypes);
const Expense = require('./Expense')(sequelize, DataTypes);

User.hasMany(Expense);
Expense.belongsTo(User);

// Export everything
module.exports = { sequelize, User, Expense };