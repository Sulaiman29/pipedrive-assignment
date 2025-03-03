import { Request, Response, NextFunction } from 'express';
import { metricsCollector } from '../utils/metrics';

export const metricsMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();
  const endpoint = `${req.method} ${req.baseUrl}${req.path}`;
  
  console.log(`[REQUEST] ${endpoint} received at ${new Date().toISOString()}`);
  
  // This function will run when the response is sent
  res.on('finish', () => {
    const duration = Date.now() - start;
    metricsCollector.recordRequest(endpoint, duration);
    console.log(`[RESPONSE] ${endpoint} completed with status ${res.statusCode} in ${duration}ms`);
  });
  
  next();
};