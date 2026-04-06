import express from 'express';
import authRoutes from './routes/auth.routes.js';
import transactionRoutes from './routes/transaction.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Finance Dashboard API is live 🚀",
  });
});


// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

export default app;