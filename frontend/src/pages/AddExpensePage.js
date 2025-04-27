import { 
    Container, 
    Typography, 
    Table,
    TableBody,
    TableCell,
    TableRow,
    TextField,
    Button,
    Box,
    FormControl,
    Select,
    MenuItem,
    Checkbox
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
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

const AddExpensePage = ({ expense, onSubmitSuccess, onCancel })  => {
    
    const location = useLocation();
    const data = location.state;
    console.log("bgaregbrebgiebi----------------------", data)
    const formik = useFormik({
        initialValues: {
            amount: data?.amount || '',
            category: data?.category || '',
            description: data?.description || '',
            date: data?.date || new Date().toISOString().split('T')[0]
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
            if (data) {
                await updateExpense(data.id, values);
            } else {
                await createExpense(values);
            }
            onSubmitSuccess();
            } catch (error) {
            console.error('Error saving expense', error);
            }
        }
        });

    const navigate = useNavigate();

    return (
        <form onSubmit={formik.handleSubmit}>
        <Container maxWidth="md" sx={{ mt: 4 }}>

        {/* Table-style Form */}
        <Typography variant="h5" sx={{ mb: 2 }}>New Expense</Typography>
        <Table sx={{ 
            border: '1px solid',
            borderColor: 'divider',
            mb: 4
        }}>
            <TableBody>
            {/* Header Row */}
            <TableRow>
                {['Total*', 'Category*', 'Date*', 'Description'].map((header) => (
                <TableCell key={header} sx={{ 
                    fontWeight: 600,
                    backgroundColor: 'grey.100'
                }}>
                    {header}
                </TableCell>
                ))}
            </TableRow>

            {/* Input Row */}
            <TableRow>
                <TableCell>
                <TextField 
                    variant="standard"
                    InputProps={{ startAdornment: '$' }}
                    sx={{ width: 100 }}
                    label="Amount"
                    name="amount"
                    type="number"
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                    error={formik.touched.amount && Boolean(formik.errors.amount)}
                    helperText={formik.touched.amount && formik.errors.amount}
                />
                </TableCell>
                <TableCell>
                <FormControl variant="standard" sx={{ minWidth: 120 }}>
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
                </TableCell>
                <TableCell>
                <TextField 
                    type="date"
                    label="Date"
                    name="date"
                    variant="standard"
                    sx={{ width: 150 }}
                    InputLabelProps={{ shrink: true }}
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    error={formik.touched.date && Boolean(formik.errors.date)}
                />
                </TableCell>
                <TableCell>
                <TextField 
                    variant="standard"
                    fullWidth
                    label="Description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                />
                </TableCell>
            </TableRow>
            </TableBody>
        </Table>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <Button variant="outlined" onClick={() => navigate('/expenses')}>
            Cancel
            </Button>
            <Button variant="contained" type="submit" onClick={() => navigate('/expenses')}>
            Save
            </Button>
        </Box>
        </Container>
        
        </form>
    );
};

export default AddExpensePage;