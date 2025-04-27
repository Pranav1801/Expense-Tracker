import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ExpensesPage from './pages/ExpensesPage';
import AddExpensePage from './pages/AddExpensePage';
import Navbar from './components/Navbar';
import Box from '@mui/material/Box';  // If using Material-UI

function App() {
  const drawerWidth = 0;  // Define drawer width
  return (
    <Router>
      <AuthProvider>
        <Box sx={{ display: 'flex' }}>
        <Navbar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            marginLeft: `${drawerWidth}px`, // Match the drawer width
            width: `calc(100% - ${drawerWidth}px)`
          }}
        >
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/expenses"
            element={
              <PrivateRoute>
                <ExpensesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/expenses/new"
            element={
              <PrivateRoute>
                <AddExpensePage />
              </PrivateRoute>
            }
          />
        </Routes>
        </Box>
        </Box>
      </AuthProvider>
    </Router>
  );
}

export default App;