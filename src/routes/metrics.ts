import express, { Request, Response } from 'express';
import { metricsCollector } from '../utils/metrics';

const router = express.Router();

// GET /metrics - returns request metrics
router.get('/', (req: Request, res: Response) => {
  console.log('[METRICS] Retrieving metrics data');
  res.json(metricsCollector.getMetrics());
});

export default router;