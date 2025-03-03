import express, { Request, Response } from 'express';
import dealsRouter from './routes/deals';
import metricsRouter from './routes/metrics';
import { metricsMiddleware } from './middleware/metrics.middleware';

const app = express();

// Middleware
app.use(express.json());
app.use(metricsMiddleware);

// Routes
app.use('/deals', dealsRouter);
app.use('/metrics', metricsRouter);

// Error handling middleware
app.use((err: Error, req: Request, res: Response) => {
  console.error(`[ERROR] ${err.message}`);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;