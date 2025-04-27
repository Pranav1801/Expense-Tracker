const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const expenseController = require('../controllers/expenseController');

router.post('/', auth, expenseController.createExpense);
router.get('/', auth,  expenseController.getExpenses);
router.put('/:id', auth, expenseController.updateExpense);
router.delete('/:id', auth, expenseController.deleteExpense);
router.get('/stats', auth, expenseController.getExpenseStats);

module.exports = router;