import { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  MenuItem, 
  Grid,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createExpense, updateExpense } from '../api/api';

const categories = [
  'Food',
  'Transportation',
  'Housing',
  'Entertainment',
  'Utilities',
  'Healthcare',
  'Education',
  'Other'
];

const validationSchema = Yup.object({
  amount: Yup.number().required('Required').positive('Must be positive'),
  category: Yup.string().required('Required'),
  description: Yup.string(),
  date: Yup.date().required('Required')
});

const ExpenseForm = ({ expense, onSubmitSuccess, onCancel }) => {
  const formik = useFormik({
    initialValues: {
      amount: expense?.amount || '',
      category: expense?.category || '',
      description: expense?.description || '',
      date: expense?.date || new Date().toISOString().split('T')[0]
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (expense) {
          await updateExpense(expense.id, values);
        } else {
          await createExpense(values);
        }
        onSubmitSuccess();
      } catch (error) {
        console.error('Error saving expense', error);
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Amount"
            name="amount"
            type="number"
            value={formik.values.amount}
            onChange={formik.handleChange}
            error={formik.touched.amount && Boolean(formik.errors.amount)}
            helperText={formik.touched.amount && formik.errors.amount}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              error={formik.touched.category && Boolean(formik.errors.category)}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>{category}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Date"
            name="date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formik.values.date}
            onChange={formik.handleChange}
            error={formik.touched.date && Boolean(formik.errors.date)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Save Expense
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ExpenseForm;