import express, { Request, Response, NextFunction } from 'express';
import dealsRouter from './routes/deals';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/deals', dealsRouter);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`Error: ${err.message}`);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;