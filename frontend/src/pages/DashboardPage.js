import { useEffect, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { PieChart, BarChart } from '../components/Charts';
import { getExpenseStats } from '../api/api';

const DashboardPage = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await getExpenseStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats', error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box>
          <Typography variant="h6" gutterBottom>Expense by Category</Typography>
          <PieChart data={stats} />
        </Box>
        <Box>
          <Typography variant="h6" gutterBottom>Monthly Expenses</Typography>
          <BarChart data={stats} />
        </Box>
      </Box>
    </Container>
  );
};

export default DashboardPage;