import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Edit, Delete } from '@mui/icons-material';
import { Box } from '@mui/material';
import ExpenseForm from '../components/ExpenseForm';
import { getExpenses, deleteExpense } from '../api/api';

const ExpensesPage = () => {
const [expenses, setExpenses] = useState([]);
const [open, setOpen] = useState(false);
const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);
const [currentExpense, setCurrentExpense] = useState(null);

const navigate = useNavigate();

useEffect(() => {
  fetchExpenses();
}, []);

const fetchExpenses = async () => {
  try {
    const  data  = await getExpenses();
    setExpenses(data || []); // Fallback to empty array
  } catch (err) {
    setError('Failed to load expenses');
    setExpenses([]); // Ensure array remains valid
  } finally {
    setLoading(false);
  }
};

const handleDelete = async (id) => {
  try {
    await deleteExpense(id);
    fetchExpenses();
  } catch (error) {
    console.error('Error deleting expense', error);
  }
};

const handleEdit = (expense) => {
  setCurrentExpense(expense);
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
  setCurrentExpense(null);
};

const handleSubmitSuccess = () => {
  fetchExpenses();
  handleClose();
};

return (
  <Container>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      <Typography variant="h4">Expenses</Typography>
      {/* <Button variant="contained" onClick={() => setOpen(true)}>Add Expense</Button> */}
      <Button 
        variant="contained" 
        onClick={() => navigate('/expenses/new')}
        sx={{ textTransform: 'none' }}
      >
        Add Expense
      </Button>
    </Box>

    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
              <TableCell>{expense.description}</TableCell>
              <TableCell>{expense.category}</TableCell>
              <TableCell>${expense.amount}</TableCell>
              <TableCell>
                {/* <IconButton onClick={() => handleEdit(expense)}> */}
                <IconButton onClick={() => navigate('/expenses/new', {state: expense})}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(expense.id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{currentExpense ? 'Edit Expense' : 'Add Expense'}</DialogTitle>
      <DialogContent>
        <ExpenseForm 
          expense={currentExpense} 
          onSubmitSuccess={handleSubmitSuccess} 
          onCancel={handleClose}
        />
      </DialogContent>
    </Dialog>
  </Container>
  );
};

export default ExpensesPage;