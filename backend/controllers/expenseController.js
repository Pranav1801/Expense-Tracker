const { Expense, User } = require('../models');
const sequelize = require('../config/db'); // Add this line

const createExpense = async (req, res) => {
  console.log("dcgfswhgvwhvw", req.user.id)
  try {
    const expense = await Expense.create({...req.body, UserId: req.user.id});
    // expense.UserId = req.user.id;
    // JSON.stringify(expense)
    // console.log("bjkeakbjerkbekb", expense)
    res.status(201).send(expense);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getExpenses = async (req, res) => {
  // console.log("kabrkbkjrkkkgcfghjkekjrbnenb", req.user.dataValues.id)
  try {
    const expenses = await Expense.findAll({ where: { UserId: req.user.id } });
    // console.log("expenses", expenses)
    res.send(expenses);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({
      where: { id: req.params.id, UserId: req.user.id }
    });

    if (!expense) {
      return res.status(404).send({ error: 'Expense not found' });
    }

    await expense.update(req.body);
    res.send(expense);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({
      where: { id: req.params.id, UserId: req.user.id }
    });

    if (!expense) {
      return res.status(404).send({ error: 'Expense not found' });
    }

    await expense.destroy();
    res.send({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getExpenseStats = async (req, res) => {

  // console.log("headernkjqr3nbknw3kbk", req)
  try {
    const expenses = await Expense.findAll({
      where: { UserId: req.user.id },
      attributes: [
        'category',
        [sequelize.fn('SUM', sequelize.col('amount')), 'totalAmount']
      ],
      group: ['category']
    });

    res.send(expenses);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  getExpenseStats
};