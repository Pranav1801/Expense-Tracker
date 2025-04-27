import { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Box } from '@mui/material';
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
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Main Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 4,
        p: 3,
        backgroundColor: 'background.paper',
        borderRadius: 2,
        boxShadow: 1
      }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Monthly Report
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </Typography>
      </Box>

      {/* Charts Grid */}
      <Grid container spacing={4}>
        {/* Pie Chart Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            height: '100%',
            borderRadius: 3,
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ 
                mb: 3,
                fontWeight: 600,
                color: 'primary.main'
              }}>
                Expense Distribution
              </Typography>
              <Box sx={{ 
                height: 400,
                position: 'relative',
                '& canvas': { margin: '0 auto' }
              }}>
                <PieChart data={stats} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Bar Chart Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            height: '100%',
            borderRadius: 3,
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ 
                mb: 3,
                fontWeight: 600,
                color: 'primary.main'
              }}>
                Spending Trend
              </Typography>
              <Box sx={{ 
                height: 400,
                position: 'relative',
                '& canvas': { margin: '0 auto' }
              }}>
                <BarChart data={stats} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;